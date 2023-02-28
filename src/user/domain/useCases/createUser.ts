import { IToken } from "../../../auth/domain/contracts/auth";
import { ExistingUserError, ServerError } from "../../../utils/errors";
import { ICreateUser, IFindUsers, IHashPassword } from "../contracts/user";
import { User } from "../entity/user";

// Define the UserCreate type
export type UserCreate = (input: Omit<User, "id">) => Promise<string>;

type Setup = (
  userRepository: ICreateUser & IFindUsers,
  hashPassword: IHashPassword,
  token: IToken
) => UserCreate;

export const setupUserCreate: Setup =
  (userRepository, hashPassword, token) => async (input) => {
    // Check if user with the same email already exists
    const existingUser = await userRepository.findByEmail(input.email);

    if (existingUser) throw new ExistingUserError();

    // Hash the user's password
    const hashedPassword = await hashPassword.hash(input.password);

    if (!hashedPassword) throw new ServerError();

    // Create a new user with the hashed password
    const createdUser = await userRepository.create({
      ...input,
      password: hashedPassword,
    });

    if (!createdUser) throw new ServerError();

    // Sign a token with the created user's id
    return token.sing({ id: createdUser.id, expiresIn: "1h" });
  };

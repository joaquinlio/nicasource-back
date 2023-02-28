import { IFindUsers, IHashPassword } from "../../../user/domain/contracts/user";
import { InvalidCredentialsError } from "../../../utils/errors";
import { IToken } from "../contracts/auth";
import { Auth } from "../entity/auth";

export type Login = (input: Auth) => Promise<string>;

type Setup = (
  userRepository: IFindUsers,
  hashPassword: IHashPassword,
  token: IToken
) => Login;

export const setupLogin: Setup =
  (userRepository, hashPassword, token) =>
  async ({ email, password }) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      const isMatch = await hashPassword.compare(
        password,
        existingUser.password
      );
      if (!isMatch) throw new InvalidCredentialsError();

      return token.sing({ id: existingUser.id, expiresIn: "1h" });
    }

    throw new InvalidCredentialsError();
  };

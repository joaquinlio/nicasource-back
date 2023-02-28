// Unit Test Code

import { IToken } from "../../../auth/domain/contracts/auth";
import { ExistingUserError, ServerError } from "../../../utils/errors";
import { ICreateUser, IFindUsers, IHashPassword } from "../contracts/user";
import { User } from "../entity/user";
import { setupUserCreate, UserCreate } from "./createUser";

describe("setupUserCreate", () => {
  let userCreate: UserCreate;
  const input = {
    email: "test@example.com",
    password: "password",
    name: "example",
    photo: "example",
    role: "Teacher",
  };
  let userRepository: ICreateUser & IFindUsers;
  let hashPassword: IHashPassword;

  beforeEach(() => {
    userRepository = {
      create: async (input: Omit<User, "id">) => ({ ...input, id: 1 }),
      findByEmail: async (email: string) => null,
      findById: async (input: number) => null,
    };
    hashPassword = {
      hash: async (password: string) => "hashed-password",
      compare: async (password: string, hashedPassword: string) => true,
    };

    const token: IToken = { sing: (payload) => "token" };

    userCreate = setupUserCreate(userRepository, hashPassword, token);
  });
  it("should return a token when creating a new user", async () => {
    const result = await userCreate(input);

    expect(result).toEqual("token");
  });

  test("should throw an ExistingUserError if user already exists", async () => {
    userRepository.findByEmail = async (email: string) => ({ ...input, id: 1 });

    expect(async () => {
      await userCreate(input);
    }).rejects.toThrow(ExistingUserError);
  });

  test("should throw a ServerError if hash creation fails", async () => {
    (hashPassword.hash = async (password: string) => null),
      expect(async () => {
        await userCreate(input);
      }).rejects.toThrow(ServerError);
  });

  test("should throw a ServerError if user creation fails", async () => {
    userRepository.create = async (input: Omit<User, "id">) => null;

    expect(async () => {
      await userCreate(input);
    }).rejects.toThrow(ServerError);
  });
});

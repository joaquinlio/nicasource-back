import { CreateUserController } from "../../../user/application/controller/createUser";
import {
  setupUserCreate,
  UserCreate,
} from "../../../user/domain/useCases/createUser";
import { UserRepository } from "../../../user/infrastructure/repository/user";
import { makeHashPassword } from "../hasher";
import { makeJwt } from "../jwt";

const makeUserCreate = (): UserCreate =>
  setupUserCreate(new UserRepository(), makeHashPassword(), makeJwt());

export const makeCreateUserController = (): CreateUserController =>
  new CreateUserController(makeUserCreate());

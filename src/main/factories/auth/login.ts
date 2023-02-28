import { LoginController } from "../../../auth/application/controller/login";
import { Login, setupLogin } from "../../../auth/domain/useCases/login";
import { UserRepository } from "../../../user/infrastructure/repository/user";
import { makeHashPassword } from "../hasher";
import { makeJwt } from "../jwt";

const makeLogin = (): Login =>
  setupLogin(new UserRepository(), makeHashPassword(), makeJwt());

export const makeLoginController = (): LoginController =>
  new LoginController(makeLogin());

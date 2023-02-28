import { Controller } from "../../../utils/controller";
import { InvalidCredentialsError } from "../../../utils/errors";
import { badRequest, HttpResponse, ok } from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { Auth } from "../../domain/entity/auth";
import { Login } from "../../domain/useCases/login";

type Model = Error | { accessToken: string };

export class LoginController extends Controller {
  constructor(private readonly login: Login) {
    super();
  }

  async perform(input: Auth): Promise<HttpResponse<Model>> {
    try {
      return ok({
        accessToken: await this.login(input),
      });
    } catch (error) {
      console.error(error);
      if (error instanceof InvalidCredentialsError) return badRequest(error);

      throw error;
    }
  }

  override buildValidators({ email, password }: Auth): Validator[] {
    return [
      ...ValidationBuilder.of({ value: email, fieldName: "email" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: password, fieldName: "password" })
        .required()
        .build(),
    ];
  }
}

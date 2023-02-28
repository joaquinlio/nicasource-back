import { Controller } from "../../../utils/controller";
import { ExistingUserError, ServerError } from "../../../utils/errors";
import {
  badRequest,
  HttpResponse,
  ok,
  serverError,
} from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { User } from "../../domain/entity/user";
import { UserCreate } from "../../domain/useCases/createUser";

type Model = Error | { accessToken: string };

export class CreateUserController extends Controller {
  constructor(private readonly userCreate: UserCreate) {
    super();
  }

  async perform(input: Omit<User, "id">): Promise<HttpResponse<Model>> {
    try {
      return ok({
        accessToken: await this.userCreate(input),
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ExistingUserError) return badRequest(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }

  override buildValidators({
    name,
    email,
    password,
    role,
  }: Omit<User, "id">): Validator[] {
    return [
      ...ValidationBuilder.of({ value: name, fieldName: "name" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: email, fieldName: "email" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: password, fieldName: "password" })
        .required()
        .password()
        .build(),
      ...ValidationBuilder.of({ value: role, fieldName: "role" })
        .required()
        .build(),
    ];
  }
}

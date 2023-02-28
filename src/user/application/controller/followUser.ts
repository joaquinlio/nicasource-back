import { Controller } from "../../../utils/controller";
import { NotFoundError, ServerError } from "../../../utils/errors";
import {
  badRequest,
  HttpResponse,
  noContent,
  serverError,
} from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { User } from "../../domain/entity/user";
import { FollowUser } from "../../domain/useCases/followUser";

type Model = Error | void;

export class FollowUserController extends Controller {
  constructor(private readonly followUser: FollowUser) {
    super();
  }

  async perform(input: {
    id: number;
    userId: number;
  }): Promise<HttpResponse<Model>> {
    try {
      await this.followUser(input);
      return noContent();
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundError) return badRequest(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }

  override buildValidators({ id }: Pick<User, "id">): Validator[] {
    return [
      ...ValidationBuilder.of({ value: id, fieldName: "id" })
        .required()
        .build(),
    ];
  }
}

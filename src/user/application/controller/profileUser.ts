import { Controller } from "../../../utils/controller";
import { NotFoundError, ServerError } from "../../../utils/errors";
import {
  badRequest,
  HttpResponse,
  ok,
  serverError,
} from "../../../utils/htttp";
import { ProfileUser } from "../../domain/useCases/profileUser";

type Model = Error | any;

export class ProfileUserController extends Controller {
  constructor(private readonly profileUser: ProfileUser) {
    super();
  }

  async perform(input: { userId: number }): Promise<HttpResponse<Model>> {
    try {
      return ok(await this.profileUser(input));
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundError) return badRequest(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }
}

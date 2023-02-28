import { Controller } from "../../../utils/controller";
import { ExistingUserError, ServerError } from "../../../utils/errors";
import {
  badRequest,
  HttpResponse,
  noContent,
  serverError,
} from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { Video } from "../../domain/entity/video";
import { VideoUpdate } from "../../domain/useCases/updateVideo";

type Model = Error | void;
type Input = Omit<Video, "creationDate" | "published">;

export class UpdateVideoController extends Controller {
  constructor(private readonly videoUpdate: VideoUpdate) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Model>> {
    try {
      await this.videoUpdate(input);
      return noContent();
    } catch (error) {
      console.error(error);
      if (error instanceof ExistingUserError) return badRequest(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }

  override buildValidators({
    id,
    title,
    url,
  }: Omit<Video, "creationDate" | "published">): Validator[] {
    return [
      ...ValidationBuilder.of({ value: id, fieldName: "id" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: title, fieldName: "title" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: url, fieldName: "url" })
        .required()
        .build(),
    ];
  }
}

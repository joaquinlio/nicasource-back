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
import { Video } from "../../domain/entity/video";
import { VideoUpload } from "../../domain/useCases/uploadVideo";

type Model = Error | Video;
type Input = Omit<Video, "id"> & number;

export class UploadVideoController extends Controller {
  constructor(private readonly videoUpload: VideoUpload) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Model>> {
    try {
      return ok(await this.videoUpload(input));
    } catch (error) {
      console.error(error);
      if (error instanceof ExistingUserError) return badRequest(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }

  override buildValidators({ title, url }: Omit<Video, "id">): Validator[] {
    return [
      ...ValidationBuilder.of({ value: title, fieldName: "title" })
        .required()
        .build(),
      ...ValidationBuilder.of({ value: url, fieldName: "url" })
        .required()
        .build(),
    ];
  }
}

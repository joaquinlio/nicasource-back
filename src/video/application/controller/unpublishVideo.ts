import { Controller } from "../../../utils/controller";
import { NotFoundError, ServerError } from "../../../utils/errors";
import {
  HttpResponse,
  noContent,
  notFound,
  serverError,
} from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { Video } from "../../domain/entity/video";
import { VideoUnpublish } from "../../domain/useCases/unpublishVideo";

type Model = Error | void;
type Input = { id: number };

export class UnpublishVideoController extends Controller {
  constructor(private readonly videoUnpublish: VideoUnpublish) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Model>> {
    try {
      await this.videoUnpublish(input);
      return noContent();
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundError) return notFound();
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }

  override buildValidators({ id }: Pick<Video, "id">): Validator[] {
    return [
      ...ValidationBuilder.of({ value: id, fieldName: "id" })
        .required()
        .build(),
    ];
  }
}

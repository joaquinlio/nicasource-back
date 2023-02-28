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
import { VideoLike } from "../../domain/useCases/likeVideo";

type Model = Error | void;
type Input = {
  id: number;
  userId: number;
};

export class LikeVideoController extends Controller {
  constructor(private readonly videoLike: VideoLike) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Model>> {
    try {
      await this.videoLike(input);
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

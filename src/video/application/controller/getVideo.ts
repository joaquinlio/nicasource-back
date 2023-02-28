import { Controller } from "../../../utils/controller";
import { NotFoundError, ServerError } from "../../../utils/errors";
import { HttpResponse, notFound, ok, serverError } from "../../../utils/htttp";
import { ValidationBuilder } from "../../../utils/validations/builder";
import { Validator } from "../../../utils/validations/validator";
import { Video } from "../../domain/entity/video";
import { VideoGet } from "../../domain/useCases/getVideo";

type Model = Error | Video;
type Input = { id: number };

export class GetVideoController extends Controller {
  constructor(private readonly videoGet: VideoGet) {
    super();
  }

  async perform(input: Input): Promise<HttpResponse<Model>> {
    try {
      return ok(await this.videoGet(input));
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

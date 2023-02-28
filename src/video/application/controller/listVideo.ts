import { Controller } from "../../../utils/controller";
import { ServerError } from "../../../utils/errors";
import { HttpResponse, ok, serverError } from "../../../utils/htttp";
import { Video } from "../../domain/entity/video";
import { VideoList } from "../../domain/useCases/listVideo";

type Model = Error | Video[];

export class ListVideoController extends Controller {
  constructor(private readonly videoList: VideoList) {
    super();
  }

  async perform(input: { userId: number }): Promise<HttpResponse<Model>> {
    try {
      return ok(await this.videoList(input));
    } catch (error) {
      console.error(error);
      if (error instanceof ServerError) return serverError(error);

      throw error;
    }
  }
}

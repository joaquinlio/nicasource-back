import { NotFoundError, ServerError } from "../../../utils/errors";
import { IFindUsers, IFollowerUser } from "../contracts/user";

export type UnfollowUser = (input: {
  id: number;
  userId: number;
}) => Promise<void>;

type Setup = (userRepository: IFindUsers & IFollowerUser) => UnfollowUser;

export const setupUnfollowUser: Setup = (userRepository) => async (input) => {
  // Check if user exists
  const existingUser = await userRepository.findById(input.id);

  if (!existingUser) throw new NotFoundError();

  // Unfollow the user specified by userId
  const result = await userRepository.unfollow(input.id, input.userId);

  if (!result) throw new ServerError();

  return this;
};

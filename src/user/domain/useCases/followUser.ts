import { NotFoundError, ServerError } from "../../../utils/errors";
import { IFindUsers, IFollowerUser } from "../contracts/user";

export type FollowUser = (input: {
  id: number;
  userId: number;
}) => Promise<void>;

type Setup = (userRepository: IFindUsers & IFollowerUser) => FollowUser;

export const setupFollowUser: Setup = (userRepository) => async (input) => {
  // Check if user exists
  const existingUser = await userRepository.findById(input.id);

  if (!existingUser) throw new NotFoundError();

  // Follow the user specified by userId
  const result = await userRepository.follow(input.id, input.userId);

  if (!result) throw new ServerError();

  return this;
};

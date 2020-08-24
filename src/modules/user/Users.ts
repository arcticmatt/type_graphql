import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(
    @Arg("firstName", { nullable: true }) firstName?: string
  ): Promise<User[]> {
    if (firstName) {
      return User.find({ firstName: firstName });
    } else {
      return User.find();
    }
  }
}

import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import {
  CreateUserResolver,
  CreateProductResolver,
} from "../modules/user/CreateUser";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";
import { UsersResolver } from "../modules/user/Users";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreateProductResolver,
      ProfilePictureResolver,
      UsersResolver,
    ],
    // Technically not necessary, we use the isAuth middleware
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

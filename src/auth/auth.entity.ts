import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;
}

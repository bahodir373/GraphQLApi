import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegisterInput {
  @Field()
  Username: string;

  @Field()
  Password: string;

  @Field()
  Email: string;
}

@InputType()
export class LoginInput {
  @Field()
  Username: string;

  @Field()
  Password: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  NewPassword: string;
}

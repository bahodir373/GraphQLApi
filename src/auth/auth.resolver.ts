import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { RegisterInput, LoginInput, ResetPasswordInput } from "./dto/auth.dto";
import { User } from "./user.entity";
import { AuthResponse, ForgotPasswordResponse } from "./auth.entity";
import { Int } from "@nestjs/graphql";

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return [];
  }

  @Mutation(() => User)
  async register(
    @Args("registerInput") registerInput: RegisterInput
  ): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args("loginInput") loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => User)
  async resetPassword(
    @Args("ID", { type: () => Int }) ID: number,
    @Args("newPassword") newPassword: ResetPasswordInput
  ): Promise<User> {
    return this.authService.resetPassword(ID, newPassword);
  }

  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Args("Email") Email: string
  ): Promise<ForgotPasswordResponse> {
    return this.authService.forgotPassword(Email);
  }

  @Mutation(() => User)
  async verifyEmail(
    @Args("ID", { type: () => Int }) ID: number,
    @Args("VerificationToken") VerificationToken: string
  ): Promise<User> {
    return this.authService.verifyEmail(ID, VerificationToken);
  }
}

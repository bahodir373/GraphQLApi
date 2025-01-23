import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { RegisterInput, LoginInput, ResetPasswordInput } from "./dto/auth.dto";
import { AuthResponse, ForgotPasswordResponse } from "./auth.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async register(registerInput: RegisterInput): Promise<User> {
    const { Username, Password, Email } = registerInput;
    const existingUser = await this.userRepository.findOne({
      where: [{ Username }, { Email }],
    });

    if (existingUser) {
      throw new Error("This user already exist");
    }

    const hashedPassword = await bcrypt.hash(Password, 12);

    const user = this.userRepository.create({
      Username,
      Password: hashedPassword,
      Email,
    });

    return this.userRepository.save(user);
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { Username, Password } = loginInput;
    const user = await this.userRepository.findOne({ where: { Username } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.ID, username: user.Username },
      "dfhghkbjngnjh h",
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async verifyEmail(ID: number, VerificationToken: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async forgotPassword(Email: string): Promise<ForgotPasswordResponse> {
    const user = await this.userRepository.findOne({ where: { Email } });
    if (!user) {
      return { message: "Email not found", success: false };
    }
    return { message: "Password reset email sent", success: true };
  }

  async resetPassword(
    ID: number,
    newPassword: ResetPasswordInput
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { ID } });
    if (!user) {
      throw new Error("User not found");
    }

    user.Password = await bcrypt.hash(newPassword.NewPassword, 10);
    return this.userRepository.save(user);
  }
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail({})
  email: string;

  @MinLength(4)
  password: string;

  @MinLength(4)
  @IsNotEmpty({ message: 'You have to confirm your password' })
  confirmPassword: string;
}

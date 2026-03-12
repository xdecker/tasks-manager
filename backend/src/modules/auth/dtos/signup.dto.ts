import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Debe ingresar un email que sea válido' })
  email: string;

  @MinLength(4, { message: 'La contraseña debe tener almenos 4 caracteres' })
  password: string;

  @MinLength(4, { message: 'La contraseña debe tener almenos 4 caracteres' })
  @IsNotEmpty({ message: 'Por favor, confirme su contraseña' })
  confirmPassword: string;
}

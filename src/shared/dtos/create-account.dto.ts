import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateAccountDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
          'Minimum 8 characters, at least 1 letter, 1 number and 1 special character',
      })
    password: string;
}
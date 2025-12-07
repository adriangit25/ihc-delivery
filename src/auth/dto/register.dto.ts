import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Juan Perez" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "juan@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "0991234567", required: false })
  @IsString()
  phone?: string;
}

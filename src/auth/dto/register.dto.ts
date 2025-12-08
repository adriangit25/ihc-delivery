import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usu_nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usu_apellido: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  usu_correo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  usu_telefono?: string;
}

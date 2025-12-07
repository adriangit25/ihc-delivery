import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: "Burger King" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Av. Principal 123" })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: "0991234567" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: "http://logo.com/bk.png" })
  @IsString()
  @IsOptional()
  logo?: string;
}

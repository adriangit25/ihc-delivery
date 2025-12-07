import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ example: "Hamburguesa Doble" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Deliciosa hamburguesa con doble carne." })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 5.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: "http://imagen.com/burger.jpg" })
  @IsString()
  @IsOptional()
  image?: string;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from "class-validator";

export class CreateProductoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prod_nombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  prod_descripcion?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  prod_precio: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  prod_stock?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  prod_imagen?: string;
}

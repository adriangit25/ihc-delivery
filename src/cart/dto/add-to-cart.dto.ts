import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddToCartDto {
  @ApiProperty({ example: 1, description: "ID del Producto" })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 1, description: "Cantidad a agregar", default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

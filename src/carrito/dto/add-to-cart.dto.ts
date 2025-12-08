import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, Min } from "class-validator";

export class AddToCartDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  usu_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  prod_id: number;

  @ApiProperty({ description: "Cantidad del producto a agregar" })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;
}

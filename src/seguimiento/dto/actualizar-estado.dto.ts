import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min, Max } from "class-validator";

export class ActualizarEstadoDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  ord_id: number;

  @ApiProperty({ description: "Nuevo estado del pedido (1 a 5)" })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  seg_estado: number;
}

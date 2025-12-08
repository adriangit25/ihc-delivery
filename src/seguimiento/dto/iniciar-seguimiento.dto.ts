import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class IniciarSeguimientoDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  ord_id: number;
}

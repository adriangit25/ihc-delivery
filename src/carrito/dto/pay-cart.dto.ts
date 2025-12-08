import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class PayCartDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  usu_id: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdateCartItemDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  item_id: number;

  @ApiProperty({ description: "Nueva cantidad del item" })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  cantidad: number;
}

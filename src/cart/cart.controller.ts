import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("cart")
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(":userId")
  @ApiOperation({ summary: "Get active cart for user" })
  getCart(@Param("userId") userId: string) {
    return this.cartService.getCart(+userId);
  }

  @Post(":userId/add")
  @ApiOperation({ summary: "Add product to cart" })
  addToCart(
    @Param("userId") userId: string,
    @Body() addToCartDto: AddToCartDto
  ) {
    return this.cartService.addToCart(+userId, addToCartDto);
  }

  @Delete(":userId/remove/:productId")
  @ApiOperation({ summary: "Remove product from cart" })
  removeFromCart(
    @Param("userId") userId: string,
    @Param("productId") productId: string
  ) {
    return this.cartService.removeFromCart(+userId, +productId);
  }
}

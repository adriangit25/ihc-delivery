import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from "@nestjs/common";
import { CarritoService } from "./carrito.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { PayCartDto } from "./dto/pay-cart.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Carrito")
@Controller("carrito")
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get("ordenes")
  getAllOrders() {
    return this.carritoService.findAllOrders();
  }

  @Get("ordenes/usuario/:usuId")
  getOrders(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.carritoService.getOrdersByUser(usuId);
  }

  @Post("add")
  addToCart(@Body() body: AddToCartDto) {
    return this.carritoService.addToCart(body);
  }

  @Patch("item")
  updateItem(@Body() body: UpdateCartItemDto) {
    return this.carritoService.updateCartItem(body);
  }

  @Delete("item/:itemId")
  removeItem(@Param("itemId", ParseIntPipe) itemId: number) {
    return this.carritoService.removeItem(itemId);
  }

  @Post("pagar")
  payCart(@Body() body: PayCartDto) {
    return this.carritoService.payCart(body);
  }

  // Mover al final para evitar conflicto con rutas estáticas como "ordenes"
  @Get(":usuId")
  getCart(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.carritoService.getCartByUser(usuId);
  }
}

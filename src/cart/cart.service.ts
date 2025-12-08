import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cart-item.entity";
import { Product } from "../entities/product.entity";
import { AddToCartDto } from "./dto/add-to-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async getCart(userId: number) {
    let cart = await this.cartRepository.findOne({
      where: { userId, status: 1 },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      cart = this.cartRepository.create({ userId, status: 1 });
      await this.cartRepository.save(cart);
      cart.items = [];
    }

    return cart;
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;
    const cart = await this.getCart(userId);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    let cartItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.subtotal = cartItem.quantity * product.price;
    } else {
      cartItem = this.cartItemRepository.create({
        cart: cart,
        product: product,
        quantity: quantity,
        subtotal: quantity * product.price,
      });
    }

    await this.cartItemRepository.save(cartItem);
    return this.getCart(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.getCart(userId);
    const cartItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem) {
      throw new NotFoundException("Item not found in cart");
    }

    await this.cartItemRepository.remove(cartItem);
    return this.getCart(userId);
  }

  async clearCart(userId: number) {
    const cart = await this.getCart(userId);
    await this.cartItemRepository.delete({ cartId: cart.id });
    return { message: "Cart cleared" };
  }
}

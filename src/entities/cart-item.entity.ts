import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity("carritos_productos")
@Unique(["cartId", "productId"])
export class CartItem {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "carrito_id" })
  cartId: number;

  @Column({ name: "producto_id" })
  productId: number;

  @Column({ name: "cantidad", default: 1 })
  quantity: number;

  @Column({ name: "subtotal", type: "decimal", precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: "carrito_id" })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: "producto_id" })
  product: Product;
}

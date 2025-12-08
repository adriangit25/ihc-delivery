import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Restaurant } from "./restaurant.entity";
import { Category } from "./category.entity";
import { CartItem } from "./cart-item.entity";

@Entity("productos")
export class Product {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "restaurante_id" })
  restaurantId: number;

  @Column({ name: "categoria_id", nullable: true })
  categoryId: number;

  @Column({ name: "nombre", length: 200 })
  name: string;

  @Column({ name: "descripcion", type: "text", nullable: true })
  description: string;

  @Column({ name: "precio", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ name: "imagen", type: "text", nullable: true })
  image: string;

  @Column({ name: "estado", default: 1 })
  status: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  @JoinColumn({ name: "restaurante_id" })
  restaurant: Restaurant;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoria_id" })
  category: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}

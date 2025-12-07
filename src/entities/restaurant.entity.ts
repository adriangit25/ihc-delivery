import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity("restaurantes")
export class Restaurant {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "usuario_id" })
  userId: number;

  @Column({ name: "nombre", length: 200 })
  name: string;

  @Column({ name: "direccion", type: "text", nullable: true })
  address: string;

  @Column({ name: "telefono", length: 20, nullable: true })
  phone: string;

  @Column({ name: "logo", type: "text", nullable: true })
  logo: string;

  @Column({ name: "banner", type: "text", nullable: true })
  banner: string;

  @Column({ name: "estado", default: 1 })
  status: number;

  @ManyToOne(() => User, (user) => user.restaurants)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { CartItem } from "./cart-item.entity";

@Entity("carritos")
export class Cart {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "usuario_id" })
  userId: number;

  @Column({ name: "estado", default: 1 })
  status: number; // 1 = active, 0 = finalizado

  @CreateDateColumn({ name: "creado_en" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}

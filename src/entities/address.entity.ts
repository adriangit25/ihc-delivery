import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity("direcciones")
export class Address {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "usuario_id" })
  userId: number;

  @Column({ name: "direccion", type: "text" })
  address: string;

  @Column({ name: "referencia", type: "text", nullable: true })
  reference: string;

  @Column({
    name: "latitud",
    type: "numeric",
    precision: 10,
    scale: 6,
    nullable: true,
  })
  latitude: number;

  @Column({
    name: "longitud",
    type: "numeric",
    precision: 10,
    scale: 6,
    nullable: true,
  })
  longitude: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}

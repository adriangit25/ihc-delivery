import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Restaurant } from "./restaurant.entity";
import { Address } from "./address.entity";

@Entity("pedidos")
export class Order {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "usuario_id" })
  userId: number;

  @Column({ name: "restaurante_id" })
  restaurantId: number;

  @Column({ name: "direccion_id" })
  addressId: number;

  @Column({ name: "repartidor_id", nullable: true })
  driverId: number;

  @Column({ name: "subtotal", type: "decimal", precision: 10, scale: 2 })
  subtotal: number;

  @Column({
    name: "costo_envio",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  deliveryFee: number;

  @Column({ name: "total", type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column({ name: "estado", default: "CREADO" })
  status: string;

  @Column({
    name: "creado_en",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: "restaurante_id" })
  restaurant: Restaurant;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: "direccion_id" })
  address: Address;
}

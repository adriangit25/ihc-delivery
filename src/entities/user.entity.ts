import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "./user-role.entity";
import { Restaurant } from "./restaurant.entity";
import { Address } from "./address.entity";
import { Order } from "./order.entity";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "nombre", length: 150 })
  name: string;

  @Column({ name: "correo", length: 150, unique: true })
  email: string;

  @Column({ name: "clave", type: "text" })
  password: string;

  @Column({ name: "telefono", length: 20, nullable: true })
  phone: string;

  @Column({ name: "estado", default: 1 })
  status: number;

  @CreateDateColumn({ name: "creado_en" })
  createdAt: Date;

  @UpdateDateColumn({ name: "actualizado_en" })
  updatedAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants: Restaurant[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

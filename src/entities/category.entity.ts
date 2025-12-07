import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity("categorias")
export class Category {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "nombre", length: 150, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

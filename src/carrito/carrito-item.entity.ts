import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Carrito } from './carrito.entity';
import { Producto } from 'src/productos/productos.entity';

@Entity('tbl_carrito_items')
export class CarritoItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column()
  cart_id: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  carrito: Carrito;

  @Column()
  prod_id: number;

  @ManyToOne(() => Producto, { eager: true })
  @JoinColumn({ name: 'prod_id' })
  producto: Producto;

  @Column()
  item_cantidad: number;

  @Column('numeric', { precision: 10, scale: 2 })
  item_precio: number; // precio del producto al momento de agregarlo

  @Column('numeric', { precision: 10, scale: 2 })
  item_subtotal: number; // item_cantidad * item_precio
}

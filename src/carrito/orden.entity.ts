import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Carrito } from './carrito.entity';
import { Usuario } from 'src/usuarios/usuarios.entity';

@Entity('tbl_ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  ord_id: number;

  @Column()
  cart_id: number;

  @ManyToOne(() => Carrito, { eager: true })
  @JoinColumn({ name: 'cart_id' })
  carrito: Carrito;

  @Column()
  usu_id: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'usu_id' })
  usuario: Usuario;

  @Column('numeric', { precision: 10, scale: 2 })
  ord_total: number;

  @Column({ type: 'smallint', default: 1 }) // 1=pagado, 2=entregado, 3=cancelado
  ord_estado: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  ord_fecha: Date;
}

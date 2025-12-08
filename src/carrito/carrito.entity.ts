import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/usuarios.entity';
import { CarritoItem } from './carrito-item.entity';

@Entity('tbl_carrito')
export class Carrito {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column()
  usu_id: number;

  @ManyToOne(() => Usuario, { eager: false })
  @JoinColumn({ name: 'usu_id' })
  usuario: Usuario;

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  cart_total: number;

  @Column({ type: 'smallint', default: 1 }) // 1=activo, 2=pagado, 3=cancelado
  cart_estado: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  cart_fecha: Date;

  @OneToMany(() => CarritoItem, (item) => item.carrito, { cascade: true })
  items: CarritoItem[];
}

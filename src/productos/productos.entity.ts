import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_productos')
export class Producto {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column()
  prod_nombre: string;

  @Column({ nullable: true })
  prod_descripcion: string;

  @Column('numeric', { precision: 10, scale: 2 })
  prod_precio: number;

  @Column({ default: 0 })
  prod_stock: number;

  @Column({ nullable: true })
  prod_imagen: string;

  @Column({ default: 1 })
  prod_estado: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  prod_fecha_registro: Date;
}

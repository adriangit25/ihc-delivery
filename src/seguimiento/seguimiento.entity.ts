import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_pedidos_seguimiento')
export class Seguimiento {
  @PrimaryGeneratedColumn()
  seg_id: number;

  @Column()
  ord_id: number;

  @Column({ type: 'smallint', default: 1 })
  seg_estado: number;

  @Column({ nullable: true })
  seg_detalle: string;

  @Column({ type: 'int', nullable: true })
  seg_eta: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  seg_fecha: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  usu_id: number;

  @Column()
  usu_nombre: string;

  @Column()
  usu_apellido: string;

  @Column({ unique: true })
  usu_correo: string;

  @Column({ nullable: true })
  usu_telefono: string;

  @Column({ default: 1 })
  usu_estado: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  usu_fecha_registro: Date;

  @Column()
  usu_password: string; // <-- agregado para guardar la contraseña
}

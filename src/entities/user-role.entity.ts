import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";

@Entity("usuarios_roles")
export class UserRole {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "usuario_id" })
  userId: number;

  @Column({ name: "rol_id" })
  roleId: number;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: "usuario_id" })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: "rol_id" })
  role: Role;
}

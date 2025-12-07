import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "nombre", length: 50, unique: true })
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}

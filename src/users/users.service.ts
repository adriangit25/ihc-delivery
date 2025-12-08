import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { UserRole } from "../entities/user-role.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ["userRoles", "userRoles.role"],
    });
  }

  async create(
    userData: Partial<User>,
    roleName: string = "cliente"
  ): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);

    // Assign Role
    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
    });
    if (role) {
      const userRole = this.userRolesRepository.create({
        user: savedUser,
        role: role,
      });
      await this.userRolesRepository.save(userRole);
    }

    return savedUser;
  }
  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ["userRoles", "userRoles.role"],
    });
  }
}

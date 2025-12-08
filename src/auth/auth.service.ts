import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
// import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException({ error: "Correo ya registrado" });
    }

    // const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      phone: registerDto.phone,
    });

    return {
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: user.id,
        nombre: user.name,
        correo: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({ error: "Usuario no existe" });
    }

    // const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (loginDto.password !== user.password) {
      throw new UnauthorizedException({ error: "Credenciales inválidas" });
    }

    const roles = user.userRoles
      ? user.userRoles.map((ur) => ur.role.name)
      : [];

    const payload = {
      sub: user.id,
      correo: user.email,
      roles: roles,
      nombre: user.name,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: "7d" }
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      usuario: {
        id: user.id,
        nombre: user.name,
        correo: user.email,
        roles: roles,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException({ error: "Usuario no encontrado" });
      }

      const roles = user.userRoles
        ? user.userRoles.map((ur) => ur.role.name)
        : [];

      const newPayload = {
        sub: user.id,
        correo: user.email,
        roles: roles,
        nombre: user.name,
      };

      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: "15m" }),
      };
    } catch (e) {
      throw new UnauthorizedException({ error: "Token no válido" });
    }
  }

  async validateUser(userId: number): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ error: "Usuario no encontrado" });
    }
    return user;
  }
}

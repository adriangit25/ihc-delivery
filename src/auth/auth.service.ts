import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: any) {
    const userExists = await this.usuariosService.findByCorreo(data.usu_correo);

    if (userExists) {
      throw new ConflictException("El correo ya está registrado");
    }

    // const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.usuariosService.createUser({
      usu_nombre: data.usu_nombre,
      usu_apellido: data.usu_apellido,
      usu_correo: data.usu_correo,
      usu_telefono: data.usu_telefono,
      usu_password: data.password, // hashedPassword,
    });

    return { message: "Usuario registrado correctamente", usuario: newUser };
  }

  async login(data: any) {
    const user = await this.usuariosService.findByCorreo(data.correo);

    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // const passwordValid = await bcrypt.compare(data.password, user.usu_password);

    if (data.password !== user.usu_password) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const payload = {
      sub: user.usu_id,
      correo: user.usu_correo,
      nombre: user.usu_nombre,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}

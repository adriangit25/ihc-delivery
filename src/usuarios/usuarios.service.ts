import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepo: Repository<Usuario>,
  ) {}

  findByCorreo(correo: string) {
    return this.userRepo.findOne({ where: { usu_correo: correo } });
  }

  createUser(data: Partial<Usuario>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }
}

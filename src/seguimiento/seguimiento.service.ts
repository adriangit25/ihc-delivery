import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguimiento } from './seguimiento.entity';
import { IniciarSeguimientoDto } from './dto/iniciar-seguimiento.dto';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly seguimientoRepo: Repository<Seguimiento>,
  ) {}

  // ETA simple basada en el estado
  private calcularETA(estado: number): number {
    switch (estado) {
      case 1: return 30; // recibido
      case 2: return 20; // preparando
      case 3: return 15; // listo
      case 4: return 8;  // en camino
      case 5: return 0;  // entregado
      default: return 10;
    }
  }

  // Crear seguimiento inicial
  async iniciarSeguimiento(dto: IniciarSeguimientoDto) {
    const seguimiento = this.seguimientoRepo.create({
      ord_id: dto.ord_id,
      seg_estado: 1,
      seg_detalle: 'Pedido recibido por la tienda',
      seg_eta: this.calcularETA(1),
    });

    return this.seguimientoRepo.save(seguimiento);
  }

  // Actualizar el estado del pedido
  async actualizarEstado(dto: ActualizarEstadoDto) {
    const segu = await this.seguimientoRepo.findOne({
      where: { ord_id: dto.ord_id },
    });

    if (!segu) {
      throw new NotFoundException('Seguimiento no encontrado');
    }

    segu.seg_estado = dto.seg_estado;

    // Cambiar detalle automático
    const mensajes = {
      1: 'Pedido recibido por la tienda',
      2: 'Pedido en preparación',
      3: 'Pedido listo para recoger',
      4: 'Pedido en camino',
      5: 'Pedido entregado',
    };

    segu.seg_detalle = mensajes[dto.seg_estado] || 'Actualización del pedido';
    segu.seg_eta = this.calcularETA(dto.seg_estado);
    segu.seg_fecha = new Date();

    return this.seguimientoRepo.save(segu);
  }

  // Obtener estado actual del pedido
  async obtenerSeguimiento(ord_id: number) {
    const segu = await this.seguimientoRepo.findOne({
      where: { ord_id },
    });

    if (!segu) {
      throw new NotFoundException('Seguimiento no encontrado');
    }

    return segu;
  }
}

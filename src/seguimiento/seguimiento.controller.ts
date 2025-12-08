import { Controller, Post, Patch, Get, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguimientoService } from './seguimiento.service';
import { IniciarSeguimientoDto } from './dto/iniciar-seguimiento.dto';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';

@ApiTags('Seguimiento')
@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Post('iniciar')
  iniciar(@Body() body: IniciarSeguimientoDto) {
    return this.seguimientoService.iniciarSeguimiento(body);
  }

  @Patch('estado')
  cambiarEstado(@Body() body: ActualizarEstadoDto) {
    return this.seguimientoService.actualizarEstado(body);
  }

  @Get(':ord_id')
  obtener(@Param('ord_id') ord_id: number) {
    return this.seguimientoService.obtenerSeguimiento(Number(ord_id));
  }
}

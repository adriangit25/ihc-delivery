import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './carrito.entity';
import { CarritoItem } from './carrito-item.entity';
import { Orden } from './orden.entity';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Producto } from 'src/productos/productos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrito, CarritoItem, Orden, Producto]),
  ],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}

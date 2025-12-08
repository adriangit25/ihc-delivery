import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './productos.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productosRepo.find();
  }

  async findOne(id: number) {
    const producto = await this.productosRepo.findOne({ where: { prod_id: id } });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  create(data: CreateProductoDto) {
    const nuevo = this.productosRepo.create(data);
    return this.productosRepo.save(nuevo);
  }

  async update(id: number, data: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.productosRepo.save(producto);
  }

  async delete(id: number) {
    const producto = await this.findOne(id);
    return this.productosRepo.remove(producto);
  }
}

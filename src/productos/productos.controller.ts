import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateProductoDto) {
    return this.productosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductoDto) {
    return this.productosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productosService.delete(id);
  }
}

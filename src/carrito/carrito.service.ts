import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './carrito.entity';
import { CarritoItem } from './carrito-item.entity';
import { Orden } from './orden.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PayCartDto } from './dto/pay-cart.dto';
import { Producto } from 'src/productos/productos.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepo: Repository<Carrito>,

    @InjectRepository(CarritoItem)
    private readonly itemRepo: Repository<CarritoItem>,

    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,

    @InjectRepository(Producto)
    private readonly productosRepo: Repository<Producto>,
  ) {}

  // Obtener o crear carrito activo de un usuario
  private async getOrCreateActiveCart(usu_id: number): Promise<Carrito> {
    let carrito = await this.carritoRepo.findOne({
      where: { usu_id, cart_estado: 1 },
      relations: ['items', 'items.producto'],
    });

    if (!carrito) {
      carrito = this.carritoRepo.create({ usu_id });
      carrito = await this.carritoRepo.save(carrito);
    }

    return carrito;
  }

  // Recalcular total del carrito
  private async recalculateCartTotal(cart_id: number): Promise<void> {
    const items = await this.itemRepo.find({ where: { cart_id } });

    const total = items.reduce(
      (acc, item) => acc + Number(item.item_subtotal),
      0,
    );

    await this.carritoRepo.update(cart_id, { cart_total: total });
  }

  // Obtener carrito con items por usuario
  async getCartByUser(usu_id: number) {
    const carrito = await this.carritoRepo.findOne({
      where: { usu_id, cart_estado: 1 },
      relations: ['items', 'items.producto'],
    });

    if (!carrito) {
      return { message: 'Carrito vacío', items: [], cart_total: 0 };
    }

    return carrito;
  }

  // Agregar producto al carrito
  async addToCart(dto: AddToCartDto) {
    const { usu_id, prod_id, cantidad } = dto;

    if (cantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a cero');
    }

    const producto = await this.productosRepo.findOne({ where: { prod_id } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (producto.prod_estado !== 1) {
      throw new BadRequestException('Producto no disponible');
    }

    const carrito = await this.getOrCreateActiveCart(usu_id);

    // Buscar si ya existe un item del mismo producto
    let item = await this.itemRepo.findOne({
      where: { cart_id: carrito.cart_id, prod_id },
    });

    const precio = Number(producto.prod_precio);

    if (item) {
      item.item_cantidad += cantidad;
      item.item_subtotal = item.item_cantidad * precio;
    } else {
      item = this.itemRepo.create({
        cart_id: carrito.cart_id,
        prod_id,
        item_cantidad: cantidad,
        item_precio: precio,
        item_subtotal: cantidad * precio,
      });
    }

    await this.itemRepo.save(item);
    await this.recalculateCartTotal(carrito.cart_id);

    return this.getCartByUser(usu_id);
  }

  // Actualizar cantidad de un item
  async updateCartItem(dto: UpdateCartItemDto) {
    const { item_id, cantidad } = dto;

    const item = await this.itemRepo.findOne({ where: { item_id } });

    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }

    if (cantidad <= 0) {
      // si la cantidad es <= 0, eliminamos el item
      await this.itemRepo.remove(item);
    } else {
      item.item_cantidad = cantidad;
      item.item_subtotal = cantidad * Number(item.item_precio);
      await this.itemRepo.save(item);
    }

    await this.recalculateCartTotal(item.cart_id);

    // obtener carrito actualizado
    const carrito = await this.carritoRepo.findOne({
      where: { cart_id: item.cart_id },
    });

    return carrito;
  }

  // Eliminar item del carrito
  async removeItem(item_id: number) {
    const item = await this.itemRepo.findOne({ where: { item_id } });

    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }

    const cart_id = item.cart_id;

    await this.itemRepo.remove(item);
    await this.recalculateCartTotal(cart_id);

    return { message: 'Item eliminado del carrito' };
  }

  // Pagar carrito
  async payCart(dto: PayCartDto) {
    const { usu_id } = dto;

    const carrito = await this.carritoRepo.findOne({
      where: { usu_id, cart_estado: 1 },
      relations: ['items'],
    });

    if (!carrito) {
      throw new NotFoundException('No se encontró carrito activo');
    }

    if (!carrito.items || carrito.items.length === 0) {
      throw new BadRequestException('El carrito está vacío');
    }

    // (Opcional) Actualizar stock de productos
    for (const item of carrito.items) {
      const prod = await this.productosRepo.findOne({
        where: { prod_id: item.prod_id },
      });

      if (!prod) continue;

      if (prod.prod_stock !== null && prod.prod_stock !== undefined) {
        prod.prod_stock = Number(prod.prod_stock) - item.item_cantidad;
        await this.productosRepo.save(prod);
      }
    }

    // Marcar carrito como pagado
    carrito.cart_estado = 2;
    await this.carritoRepo.save(carrito);

    // Crear orden
    const orden = this.ordenRepo.create({
      cart_id: carrito.cart_id,
      usu_id,
      ord_total: carrito.cart_total,
    });

    const nuevaOrden = await this.ordenRepo.save(orden);

    return {
      message: 'Carrito pagado correctamente',
      orden: nuevaOrden,
    };
  }

  // Historial de órdenes por usuario
  async getOrdersByUser(usu_id: number) {
    const ordenes = await this.ordenRepo.find({
      where: { usu_id },
      order: { ord_fecha: 'DESC' },
    });

    return ordenes;
  }
}

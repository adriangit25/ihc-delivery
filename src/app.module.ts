import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/usuarios.entity';
import { ProductosModule } from './productos/productos.module';
import { CarritoModule } from './carrito/carrito.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Usuario],
      synchronize: true, // Solo para desarrollo
      autoLoadEntities: true,
    }),

    UsuariosModule,
    AuthModule,
    ProductosModule,
    CarritoModule,
    SeguimientoModule,
  ],
})
export class AppModule {}

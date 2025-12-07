-- ============================================
--     BASE DE DATOS DELIVERY (ESPAÑOL)
--     Versión optimizada y moderna
-- ============================================

-- ============================================
-- 1. ROLES Y USUARIOS
-- ============================================

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (nombre) VALUES 
('cliente'),
('restaurante'),
('repartidor'),
('administrador');


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    clave TEXT NOT NULL,
    telefono VARCHAR(20),
    estado SMALLINT DEFAULT 1,
    creado_en TIMESTAMP DEFAULT NOW(),
    actualizado_en TIMESTAMP DEFAULT NOW()
);


CREATE TABLE usuarios_roles (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE INDEX idx_usuarios_roles_usuario ON usuarios_roles(usuario_id);



-- ============================================
-- 2. DIRECCIONES DE USUARIOS
-- ============================================

CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    direccion TEXT NOT NULL,
    referencia TEXT,
    latitud NUMERIC(10,6),
    longitud NUMERIC(10,6),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE INDEX idx_direcciones_usuario ON direcciones(usuario_id);



-- ============================================
-- 3. RESTAURANTES
-- ============================================

CREATE TABLE restaurantes (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL, -- dueño del restaurante
    nombre VARCHAR(200) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    logo TEXT,
    banner TEXT,
    estado SMALLINT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE INDEX idx_restaurantes_usuario ON restaurantes(usuario_id);



-- ============================================
-- 4. CATEGORÍAS DE PRODUCTOS
-- ============================================

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL UNIQUE
);



-- ============================================
-- 5. PRODUCTOS
-- ============================================

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    restaurante_id INT NOT NULL,
    categoria_id INT,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen TEXT,
    estado SMALLINT DEFAULT 1,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE INDEX idx_productos_restaurante ON productos(restaurante_id);
CREATE INDEX idx_productos_categoria ON productos(categoria_id);



-- ============================================
-- 6. CARRITO DE COMPRAS
-- ============================================

CREATE TABLE carritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    estado SMALLINT DEFAULT 1, -- 1 = activo, 0 = finalizado
    creado_en TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE INDEX idx_carritos_usuario ON carritos(usuario_id);


CREATE TABLE carritos_productos (
    id SERIAL PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (carrito_id) REFERENCES carritos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    UNIQUE (carrito_id, producto_id)  -- evita duplicados
);

CREATE INDEX idx_carritos_productos_carrito ON carritos_productos(carrito_id);



-- ============================================
-- 7. PEDIDOS
-- ============================================

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    restaurante_id INT NOT NULL,
    repartidor_id INT,
    direccion_id INT NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,
    costo_envio DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,

    estado VARCHAR(30) DEFAULT 'CREADO',
    creado_en TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
    FOREIGN KEY (repartidor_id) REFERENCES usuarios(id), -- repartidor también es usuario
    FOREIGN KEY (direccion_id) REFERENCES direcciones(id)
);

CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_restaurante ON pedidos(restaurante_id);



CREATE TABLE pedidos_productos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE INDEX idx_pedidos_productos_pedido ON pedidos_productos(pedido_id);



-- ============================================
-- 8. HISTORIAL DE ESTADOS DEL PEDIDO
-- ============================================

CREATE TABLE pedidos_estados (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL,
    estado VARCHAR(30) NOT NULL,
    fecha TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);



-- ============================================
-- 9. PAGOS
-- ============================================

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    pedido_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo VARCHAR(50), -- efectivo, tarjeta, transferencia
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE INDEX idx_pagos_pedido ON pagos(pedido_id);

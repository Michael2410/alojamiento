const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const u = await prisma.usuario.upsert({ where: { email: 'admin@example.com' }, update: {}, create: { nombre: 'Admin', email: 'admin@example.com', tipo: 'anfitrion' } })
  await prisma.listing.createMany({ data: [
    // Cuartos
    { titulo: 'Cuarto amoblado San Francisco', descripcion: 'Cuarto con escritorio y closet', precio: 220.0, universidad: 'USMA', tipo: 'habitacion', verificado: true, imagen: '/assets/cuartos/foto-escritorio-1524999265.avif', usuarioId: u.id },
    { titulo: 'Cuarto económico', descripcion: 'Pequeño pero cómodo, ideal para estudiantes', precio: 150.0, universidad: 'UM', tipo: 'habitacion', verificado: false, imagen: '/assets/cuartos/decoracion-de-un-cuarto.jpg', usuarioId: u.id },
    { titulo: 'Cuarto moderno con luz natural', descripcion: 'Habitación con ventana grande y escritorio', precio: 270.0, universidad: 'UP', tipo: 'habitacion', verificado: true, imagen: '/assets/cuartos/Depto_DL_kababie_arquitectos_20.webp', usuarioId: u.id },
    { titulo: 'Cuarto con ambiente tranquilo', descripcion: 'Ideal para estudiar, incluye internet', precio: 200.0, universidad: 'USMA', tipo: 'habitacion', verificado: false, imagen: '/assets/cuartos/cuarto-organizado-1-1024x558.jpeg', usuarioId: u.id },
    // Departamentos
    { titulo: 'Departamento luminoso', descripcion: 'Departamento con balcón y buen transporte', precio: 480.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/b-162007270460905900f40d7.jpg', usuarioId: u.id },
    { titulo: 'Loft cerca de la uni', descripcion: 'Loft moderno, una habitación, cocina equipada', precio: 520.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/cuartos/Depto_DL_kababie_arquitectos_20.webp', usuarioId: u.id },
    { titulo: 'Departamento dúplex', descripcion: 'Amplio dúplex en zona tranquila', precio: 650.0, universidad: 'USMA', tipo: 'apartamento', verificado: false, imagen: '/assets/departamentos/cuanto_mide_departamento_ideal.jpg', usuarioId: u.id },
    { titulo: 'Departamento con vista', descripcion: 'Vista panorámica, cerca de la UM', precio: 550.0, universidad: 'UM', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/b-162007270460905900f40d7.jpg', usuarioId: u.id },
    { titulo: 'Departamento tipo estudio', descripcion: 'Estudio compacto, todo incluido', precio: 350.0, universidad: 'USMA', tipo: 'apartamento', verificado: false, imagen: '/assets/departamentos/departamento-tipo-duplex.jpg', usuarioId: u.id },
    { titulo: 'Departamento familiar', descripcion: 'Ideal para compartir entre amigos', precio: 700.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/cuanto_mide_departamento_ideal.jpg', usuarioId: u.id }
  ] })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())


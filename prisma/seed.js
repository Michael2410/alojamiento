const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const u = await prisma.usuario.upsert({ where: { email: 'admin@example.com' }, update: {}, create: { nombre: 'Admin', email: 'admin@example.com', tipo: 'anfitrion' } })
  await prisma.listing.createMany({ data: [
    // Cuartos
    { titulo: 'Cuarto amoblado San Francisco', descripcion: 'Cuarto con escritorio y closet', detalles: 'Compartirás el espacio con una estudiante de USMA. Áreas comunes: cocina y lavandería. Ambiente silencioso y respetuoso de horarios académicos.', precio: 220.0, universidad: 'USMA', tipo: 'habitacion', verificado: true, imagen: '/assets/cuartos/foto-escritorio-1524999265.avif', usuarioId: u.id },
    { titulo: 'Cuarto económico', descripcion: 'Pequeño pero cómodo, ideal para estudiantes', detalles: 'Piso compartido con dos estudiantes de la UM. Cocina equipada y sala de estudio. Normas básicas de convivencia para un ambiente ordenado.', precio: 150.0, universidad: 'UM', tipo: 'habitacion', verificado: false, imagen: '/assets/cuartos/decoracion-de-un-cuarto.jpg', usuarioId: u.id },
    { titulo: 'Cuarto moderno con luz natural', descripcion: 'Habitación con ventana grande y escritorio', detalles: 'Espacio compartido con una profesional joven. Uso compartido de sala y balcón. Ideal para quienes buscan tranquilidad y luz natural.', precio: 270.0, universidad: 'UP', tipo: 'habitacion', verificado: true, imagen: '/assets/cuartos/Depto_DL_kababie_arquitectos_20.webp', usuarioId: u.id },
    { titulo: 'Cuarto con ambiente tranquilo', descripcion: 'Ideal para estudiar, incluye internet', detalles: 'Convivencia con otra estudiante de USMA. Se respetan horarios de descanso. Áreas comunes: cocina, sala y lavandería.', precio: 200.0, universidad: 'USMA', tipo: 'habitacion', verificado: false, imagen: '/assets/cuartos/cuarto-organizado-1-1024x558.jpeg', usuarioId: u.id },
    // Departamentos
    { titulo: 'Departamento luminoso', descripcion: 'Departamento con balcón y buen transporte', detalles: 'Ideal para dos estudiantes de UP. Áreas amplias y bien iluminadas. Se comparten sala y cocina; reglas claras para limpieza.', precio: 480.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/b-162007270460905900f40d7.jpg', usuarioId: u.id },
    { titulo: 'Loft cerca de la uni', descripcion: 'Loft moderno, una habitación, cocina equipada', detalles: 'Espacio privado tipo estudio. No se comparte con otros estudiantes. Ambiente tranquilo y perfecto para concentración.', precio: 520.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/cuartos/Depto_DL_kababie_arquitectos_20.webp', usuarioId: u.id },
    { titulo: 'Departamento dúplex', descripcion: 'Amplio dúplex en zona tranquila', detalles: 'Compartirás con una estudiante de USMA. Dos plantas con áreas definidas. Respeto por horarios de estudio y descanso.', precio: 650.0, universidad: 'USMA', tipo: 'apartamento', verificado: false, imagen: '/assets/departamentos/cuanto_mide_departamento_ideal.jpg', usuarioId: u.id },
    { titulo: 'Departamento con vista', descripcion: 'Vista panorámica, cerca de la UM', detalles: 'Se comparte ocasionalmente la sala para estudio grupal. Cocina equipada y lavandería en el edificio.', precio: 550.0, universidad: 'UM', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/b-162007270460905900f40d7.jpg', usuarioId: u.id },
    { titulo: 'Departamento tipo estudio', descripcion: 'Estudio compacto, todo incluido', detalles: 'Espacio ideal para una persona. Todo en un solo ambiente, sin convivencia con terceros.', precio: 350.0, universidad: 'USMA', tipo: 'apartamento', verificado: false, imagen: '/assets/departamentos/departamento-tipo-duplex.jpg', usuarioId: u.id },
    { titulo: 'Departamento familiar', descripcion: 'Ideal para compartir entre amigos', detalles: 'Pensado para 3 estudiantes organizados. Reglas de limpieza semanales y áreas comunes cómodas.', precio: 700.0, universidad: 'UP', tipo: 'apartamento', verificado: true, imagen: '/assets/departamentos/cuanto_mide_departamento_ideal.jpg', usuarioId: u.id }
  ] })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())

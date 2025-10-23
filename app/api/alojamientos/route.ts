import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

// Crear una nueva instancia de PrismaClient para cada request
const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams

    // fetch single listing by id
    const id = search.get('id')
    if (id) {
      const listing = await prisma.listing.findUnique({
        where: { id: Number(id) },
        include: { usuario: true }
      })
      await prisma.$disconnect()
      return NextResponse.json({ data: listing ?? null })
    }

    const where: any = {}
    if (search.get('universidad')) where.universidad = search.get('universidad')!
    if (search.get('tipo')) where.tipo = search.get('tipo')!
    if (search.get('verificado')) where.verificado = search.get('verificado') === 'true'

    // price range
    const min = search.get('min') ? Number(search.get('min')) : undefined
    const max = search.get('max') ? Number(search.get('max')) : undefined

    const listings = await prisma.listing.findMany({
      where,
      include: { usuario: true },
      orderBy: { createdAt: 'desc' }
    })

  // Excluir elementos específicos por título
  const excludeTitles = new Set([
    'habitación cerca de usma',
    'apartamento centrico'
  ])

      const filtered = listings.filter((l) => {
        const titulo = (l.titulo || '').toString().toLowerCase()
        if (excludeTitles.has(titulo)) return false
        if (min !== undefined && l.precio < min) return false
        if (max !== undefined && l.precio > max) return false
        return true
      })

      return NextResponse.json({ data: filtered })
    } catch (error) {
      console.error('Error in GET /api/alojamientos:', error)
      return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // expected fields: titulo, descripcion, precio, universidad, tipo, imagen?, usuarioId
    if (!body.titulo || !body.descripcion || !body.precio || !body.universidad || !body.tipo || !body.usuarioId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await prisma.listing.create({ 
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: Number(body.precio),
        universidad: body.universidad,
        tipo: body.tipo,
        imagen: body.imagen || null,
        usuarioId: Number(body.usuarioId),
        verificado: Boolean(body.verificado)
      },
      include: {
        usuario: true
      }
    })

    return NextResponse.json({ data: created })
  } catch (error) {
    console.error('Error in POST /api/alojamientos:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const updated = await prisma.listing.update({ 
      where: { id: Number(body.id) }, 
      data: body,
      include: {
        usuario: true
      }
    })
    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error in PUT /api/alojamientos:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    
    const deleted = await prisma.listing.delete({ where: { id: Number(id) } })
    return NextResponse.json({ data: deleted })
  } catch (error) {
    console.error('Error in DELETE /api/alojamientos:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const users = await prisma.usuario.findMany({ include: { alojamientos: true } })
  return NextResponse.json({ data: users })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.email || !body.nombre) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const created = await prisma.usuario.create({ data: { nombre: body.nombre, email: body.email, tipo: body.tipo || 'estudiante' } })
  return NextResponse.json({ data: created })
}

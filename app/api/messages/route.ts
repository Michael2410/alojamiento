import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const created = await prisma.message.create({ data: {
    reservationId: Number(body.reservationId),
    senderId: Number(body.senderId),
    content: String(body.content)
  } })
  return NextResponse.json({ data: created })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const reservationId = url.searchParams.get('reservationId')
  if (!reservationId) return NextResponse.json({ data: [] })
  const msgs = await prisma.message.findMany({ where: { reservationId: Number(reservationId) }, include: { sender: true }, orderBy: { createdAt: 'asc' } })
  return NextResponse.json({ data: msgs })
}

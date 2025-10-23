import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.listingId || !body.studentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await prisma.reservation.create({
      data: {
        listingId: Number(body.listingId),
        studentId: Number(body.studentId),
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        status: 'pending'
      },
      include: {
        listing: true,
        student: true
      }
    })

    return NextResponse.json({ data: created })
  } catch (error) {
    console.error('Error in POST /api/reservations:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const listingId = url.searchParams.get('listingId')
    const studentId = url.searchParams.get('studentId')
    const where: any = {}
    if (listingId) where.listingId = Number(listingId)
    if (studentId) where.studentId = Number(studentId)
    const reservations = await prisma.reservation.findMany({ 
      where, 
      include: { 
        listing: true,
        student: true 
      }
    })
    return NextResponse.json({ data: reservations })
  } catch (error) {
    console.error('Error in GET /api/reservations:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body || {}
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    const updated = await prisma.reservation.update({
      where: { id: Number(id) },
      data: { status: String(status) },
      include: { listing: true, student: true }
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error('Error in PATCH /api/reservations:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

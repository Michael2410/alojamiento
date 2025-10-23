'use client'

import { useState } from 'react'
import Chat from './Chat'

export default function ReservationForm({ listingId, currentUserId }: { listingId: number, currentUserId: number }) {
  const [reserved, setReserved] = useState<any>(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [showChat, setShowChat] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    try {
      setError('')
      setLoading(true)
      const payload: any = { listingId, studentId: currentUserId }
      if (start) payload.startDate = start
      if (end) payload.endDate = end
      const res = await fetch('/api/reservations', { 
        method: 'POST', 
        body: JSON.stringify(payload), 
        headers: { 'Content-Type': 'application/json' } 
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Error al crear la reserva')
      }
      setReserved(json.data)
    } catch (err: any) {
      setError(err.message || 'Error al procesar la reserva')
    } finally {
      setLoading(false)
    }
  }

  if (reserved) {
    return (
      <div className="bg-white p-4 rounded shadow mt-4">
        <h4 className="font-semibold mb-2">Mi reservación</h4>
        <div className="mb-2">
          <div><b>Desde:</b> {reserved.startDate ? new Date(reserved.startDate).toLocaleDateString() : '-'}</div>
          <div><b>Hasta:</b> {reserved.endDate ? new Date(reserved.endDate).toLocaleDateString() : '-'}</div>
          <div><b>Estado:</b> {reserved.status}</div>
        </div>
        {!showChat && (
          <button onClick={() => setShowChat(true)} className="bg-primary text-white px-3 py-1 rounded">Enviar mensaje al anfitrión</button>
        )}
        {showChat && <Chat reservationId={reserved.id} currentUserId={currentUserId} />}
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <div className="flex gap-2">
        <input 
          type="date" 
          value={start} 
          onChange={e => setStart(e.target.value)} 
          className="border px-2 py-1 rounded" 
          min={new Date().toISOString().split('T')[0]} 
        />
        <input 
          type="date" 
          value={end} 
          onChange={e => setEnd(e.target.value)} 
          className="border px-2 py-1 rounded" 
          min={start || new Date().toISOString().split('T')[0]} 
        />
        <button 
          onClick={submit} 
          disabled={loading}
          className={`px-3 py-1 rounded ${loading ? 'bg-gray-400' : 'bg-success text-white'}`}
        >
          {loading ? 'Reservando...' : 'Reservar'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  )
}


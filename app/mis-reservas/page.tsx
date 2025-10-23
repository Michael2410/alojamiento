"use client"
import { useEffect, useState } from 'react'
import Chat from '../../components/Chat'
import Modal from '../../components/Modal'

export default function MisReservasPage() {
  const [reservas, setReservas] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [showChat, setShowChat] = useState<{[id:number]:boolean}>({})
  const [payOpen, setPayOpen] = useState(false)
  const [payingRes, setPayingRes] = useState<any | null>(null)
  const [busyId, setBusyId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('usuario')
      if (u) {
        const usuario = JSON.parse(u)
        setUser(usuario)
        fetch(`/api/reservations?studentId=${usuario.id}`)
          .then(r => r.json())
          .then(json => setReservas(json.data ?? []))
      }
    }
  }, [])

  if (!user) return <p className="text-center mt-8">Inicia sesión para ver tus reservas.</p>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mis Reservas</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {reservas.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        <div className="grid gap-4">
          {reservas.map(r => (
            <div key={r.id} className="bg-white p-4 rounded shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="font-semibold">{r.listing?.titulo}</div>
                  <div className="text-sm text-gray-600">{r.listing?.universidad} · ${r.listing?.precio}</div>
                  <div className="text-sm">Desde: {r.startDate ? new Date(r.startDate).toLocaleDateString() : '-'}</div>
                  <div className="text-sm">Hasta: {r.endDate ? new Date(r.endDate).toLocaleDateString() : '-'}</div>
                  <div className="text-sm">Estado: {r.status}</div>
                </div>
                <div>
                  {!showChat[r.id] && (
                    <button onClick={() => setShowChat(s => ({...s, [r.id]:true}))} className="bg-primary text-white px-3 py-1 rounded">Chatear con anfitrión</button>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    disabled={busyId === r.id || r.status === 'cancelled'}
                    onClick={async () => {
                      try {
                        setError(null)
                        setBusyId(r.id)
                        const res = await fetch('/api/reservations', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: r.id, status: 'cancelled' })
                        })
                        const json = await res.json()
                        if (!res.ok) throw new Error(json.error || 'No se pudo anular la reserva')
                        setReservas(curr => curr.map(x => x.id === r.id ? json.data : x))
                      } catch (e:any) {
                        setError(e.message || 'Error al anular')
                      } finally {
                        setBusyId(null)
                      }
                    }}
                    className={`px-3 py-1 rounded border ${r.status==='cancelled' ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-red-600 border-red-300 hover:bg-red-50'}`}
                  >
                    {busyId === r.id ? 'Anulando...' : (r.status === 'cancelled' ? 'Anulada' : 'Anular reserva')}
                  </button>
                  <button
                    disabled={busyId === r.id || r.status === 'paid' || r.status === 'cancelled'}
                    onClick={() => { setPayingRes(r); setPayOpen(true); setError(null) }}
                    className={`px-3 py-1 rounded ${r.status==='paid' ? 'bg-green-200 text-green-800 cursor-not-allowed' : (r.status==='cancelled' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700')}`}
                  >
                    {r.status === 'paid' ? 'Pagado' : 'Realizar pago'}
                  </button>
                </div>
              </div>
              {showChat[r.id] && <Chat reservationId={r.id} currentUserId={user.id} />}
            </div>
          ))}
        </div>
      )}

      <Modal open={payOpen} onClose={() => setPayOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Simular pago</h3>
          {payingRes && (
            <div className="text-sm text-gray-700">
              <div><b>Alojamiento:</b> {payingRes.listing?.titulo}</div>
              <div><b>Monto:</b> ${payingRes.listing?.precio}</div>
            </div>
          )}
          <div className="grid gap-2">
            <input className="border rounded px-3 py-2" placeholder="Titular de la tarjeta" />
            <input className="border rounded px-3 py-2" placeholder="N�mero de tarjeta" />
            <div className="flex gap-2">
              <input className="border rounded px-3 py-2 w-1/2" placeholder="MM/AA" />
              <input className="border rounded px-3 py-2 w-1/2" placeholder="CVV" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-3 py-2 rounded border" onClick={() => setPayOpen(false)}>Cancelar</button>
            <button
              className="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={async () => {
                if (!payingRes) return
                try {
                  setError(null)
                  setBusyId(payingRes.id)
                  const res = await fetch('/api/reservations', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: payingRes.id, status: 'paid' })
                  })
                  const json = await res.json()
                  if (!res.ok) throw new Error(json.error || 'No se pudo procesar el pago')
                  setReservas(curr => curr.map(x => x.id === payingRes.id ? json.data : x))
                  setPayOpen(false)
                  setPayingRes(null)
                } catch (e:any) {
                  setError(e.message || 'Error en el pago')
                } finally {
                  setBusyId(null)
                }
              }}
            >
              Confirmar pago
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

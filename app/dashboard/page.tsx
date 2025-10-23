"use client"
import React, { useEffect, useState } from 'react'
import ListingForm from '../../components/ListingForm'
import Modal from '../../components/Modal'

export default function DashboardPage() {
  const [listings, setListings] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  async function load() {
    const res = await fetch('/api/alojamientos')
    const json = await res.json()
    setListings(json.data ?? [])
  }

  useEffect(() => { load() }, [])

  async function remove(id: number) {
    await fetch('/api/alojamientos?id=' + id, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Mi Dashboard</h2>
        <button onClick={() => setOpen(true)} className="bg-primary text-white px-3 py-2 rounded">Nuevo</button>
      </div>

      <div className="grid gap-4">
        {listings.map(l => (
          <div key={l.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{l.titulo} {l.verificado && <span className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded">Verificado</span>}</div>
              <div className="text-sm text-gray-600">{l.universidad} · ${l.precio}</div>
            </div>
            <div className="flex gap-2">
              <a href={`/alojamientos/${l.id}`} className="text-primary underline">Ver</a>
              <button onClick={() => remove(l.id)} className="text-red-600">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Nuevo Alojamiento</h3>
        <ListingForm onSaved={() => { setOpen(false); load() }} />
      </Modal>
    </div>
  )
}


'use client'
import React from 'react'

export default function ListingForm({ onSaved }: { onSaved?: () => void }) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd as any)
    await fetch('/api/alojamientos', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="titulo" placeholder="Título" className="w-full border px-3 py-2 rounded" required />
      <textarea name="descripcion" placeholder="Descripción" className="w-full border px-3 py-2 rounded" />
      <input name="precio" type="number" step="0.01" placeholder="Precio" className="w-full border px-3 py-2 rounded" />
      <input name="universidad" placeholder="Universidad" className="w-full border px-3 py-2 rounded" />
      <input name="tipo" placeholder="Tipo" className="w-full border px-3 py-2 rounded" />
      <input name="usuarioId" type="number" placeholder="Usuario ID" className="w-full border px-3 py-2 rounded" />
      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded">Guardar</button>
      </div>
    </form>
  )
}


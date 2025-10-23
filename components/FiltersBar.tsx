'use client'
import { useState, ChangeEvent, KeyboardEvent } from 'react'

type Filters = {
  universidad?: string
  tipo?: string
  min?: number
  max?: number
}

export default function FiltersBar({ onFilter }: { onFilter?: (params: Filters) => void }) {
  const [universidad, setUniversidad] = useState('')
  const [tipo, setTipo] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  function apply() {
    const params: Filters = {}
    if (universidad.trim()) params.universidad = universidad.trim()
    if (tipo) params.tipo = tipo
    if (min !== '') {
      const n = Number(min)
      if (!Number.isNaN(n)) params.min = n
    }
    if (max !== '') {
      const n = Number(max)
      if (!Number.isNaN(n)) params.max = n
    }
    onFilter?.(params)
  }

  function reset() {
    setUniversidad('')
    setTipo('')
    setMin('')
    setMax('')
    onFilter?.({})
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') apply()
  }

  return (
    <div className="card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      <label className="sr-only" htmlFor="universidad">Universidad</label>
      <input id="universidad" value={universidad} onChange={(e: ChangeEvent<HTMLInputElement>) => setUniversidad(e.target.value)} onKeyDown={handleKey} placeholder="Universidad" className="input md:flex-1" />

      <label className="sr-only" htmlFor="tipo">Tipo</label>
      <select id="tipo" value={tipo} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTipo(e.target.value)} className="select">
        <option value="">Tipo</option>
        <option value="habitacion">Habitación</option>
        <option value="apartamento">Apartamento</option>
      </select>

      <div className="flex gap-3">
        <div>
          <label className="sr-only" htmlFor="min">Min</label>
          <input id="min" value={min} onChange={(e: ChangeEvent<HTMLInputElement>) => setMin(e.target.value)} onKeyDown={handleKey} placeholder="Min" inputMode="numeric" className="input w-24" />
        </div>
        <div>
          <label className="sr-only" htmlFor="max">Max</label>
          <input id="max" value={max} onChange={(e: ChangeEvent<HTMLInputElement>) => setMax(e.target.value)} onKeyDown={handleKey} placeholder="Max" inputMode="numeric" className="input w-24" />
        </div>
      </div>

      <div className="flex gap-2 md:ml-auto">
        <button onClick={apply} className="btn-primary">Filtrar</button>
        <button onClick={reset} type="button" className="btn-outline">Reset</button>
      </div>
    </div>
  )
}


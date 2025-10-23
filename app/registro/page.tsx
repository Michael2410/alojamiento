'use client'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

export default function RegistroPage() {
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const payload = {
      nombre: fd.get('nombre'),
      email: fd.get('email'),
      tipo: fd.get('tipo')
    }

    const res = await fetch('/api/usuarios', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
    const json = await res.json()
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuario', JSON.stringify(json.data))
    }
    router.push('/alojamientos')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Nombre</label>
          <input name="nombre" required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Tipo</label>
          <select name="tipo" className="w-full border px-3 py-2 rounded">
            <option value="estudiante">Estudiante</option>
            <option value="anfitrion">Anfitrión</option>
          </select>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded">Registrar</button>
      </form>
    </div>
  )
}


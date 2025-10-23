'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error || 'No se pudo iniciar sesión')
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('usuario', JSON.stringify(json.data))
        // Forzar recarga completa para que el Navbar refleje sesión
        window.location.href = '/alojamientos'
        return
      }
      router.replace('/alojamientos')
    } catch (err: any) {
      setError(err.message || 'Error iniciando sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold mb-4">Ingresar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="tu@email.com"
          />
        </div>
        <button disabled={loading} className="btn-primary">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
      <p className="text-sm text-gray-500 mt-3">¿No tienes cuenta? Regístrate desde el menú.</p>
    </div>
  )
}

"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const readUser = () => {
      try {
        const raw = localStorage.getItem('usuario')
        setUser(raw ? JSON.parse(raw) : null)
      } catch (e) {
        console.warn('Usuario inválido en localStorage, limpiando')
        localStorage.removeItem('usuario')
        setUser(null)
      }
    }

    readUser()
    const onStorage = (e: StorageEvent) => { if (e.key === 'usuario') readUser() }
    const onVisibility = () => { if (document.visibilityState === 'visible') readUser() }
    window.addEventListener('storage', onStorage)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('storage', onStorage)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [pathname])

  function logout() {
    localStorage.removeItem('usuario')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-primary font-bold tracking-tight">AlojamientoPT</Link>
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/alojamientos" className="text-slate-700 hover:text-primary transition-colors">Alojamientos</Link>
          {user ? (
            <>
              <Link href="/mis-reservas" className="text-slate-700 hover:text-primary transition-colors">Mis Reservas</Link>
              {user?.tipo === 'anfitrion' && (
                <Link href="/dashboard" className="text-slate-700 hover:text-primary transition-colors">Dashboard</Link>
              )}
              <span className="text-primary font-semibold hidden sm:inline">Bienvenido, {user.nombre}</span>
              <button onClick={logout} className="btn-outline">Salir</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline">Ingresar</Link>
              <Link href="/registro" className="btn-primary">Regístrate</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


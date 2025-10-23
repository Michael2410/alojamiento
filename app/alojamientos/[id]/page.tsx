'use client'
import ReservationForm from '../../../components/ReservationForm'
import { useEffect, useState } from 'react'

type Props = { params: { id: string } }

export default function ListingDetail({ params }: Props) {
  const id = Number(params.id)
  const [listing, setListing] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/alojamientos?id=${id}`).then(r => r.json()).then(json => setListing(json.data))
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('usuario')
      if (u) setUser(JSON.parse(u))
    }
  }, [id])

  if (!listing) return <p>Listado no encontrado.</p>

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img src={listing.imagen ?? '/placeholder.png'} alt={listing.titulo} className="w-full h-64 object-cover rounded" />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold">{listing.titulo} {listing.verificado && <span className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-1 rounded">Verificado</span>}</h3>
          <p className="text-gray-700 mt-2">{listing.descripcion}</p>
          <p className="mt-4 font-semibold">Precio: ${listing.precio}</p>
          <p className="mt-1">Universidad: {listing.universidad}</p>
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold">Anfitrión</h4>
            <p>{listing.usuario?.nombre} · {listing.usuario?.email}</p>
          </div>
          {/* Reservation form solo si hay usuario logueado */}
          <div className="mt-4">
            {user ? (
              <ReservationForm listingId={listing.id} currentUserId={user.id} />
            ) : (
              <p className="text-sm text-gray-500">Inicia sesión o regístrate para reservar y contactar al anfitrión.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


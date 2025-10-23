"use client"
import React, { useEffect, useState } from 'react'
import ListingCard from '../../components/ListingCard'
import FiltersBar from '../../components/FiltersBar'
import Carousel from '../../components/Carousel'

export default function AlojamientosPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function load(params: Record<string, string | number | boolean> = {}) {
    setLoading(true)
    const url = new URL('/api/alojamientos', location.origin)
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== '') url.searchParams.set(k, String(v)) })
    try {
      const res = await fetch(url.toString())
      const json = await res.json()
      setListings(json.data ?? [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="mb-6">
        <Carousel
          images={[
            '/assets/carrucel/EJAN4QFSF5DPLJCK4U2T4YXWLQ.avif',
            '/assets/carrucel/10-cosas-que-aprenderás-al-estudiar-en-la-universidad.jpg',
            '/assets/carrucel/cosas-saber-antes-de-entrar-universidad-1200x628.jpg',
            '/assets/carrucel/1725374435708_etica-y-valores-para-bachillerato.jpg.jpg'
          ]}
          heightClass="h-80 md:h-96 lg:h-[28rem]"
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-900">Alojamientos</h2>
      </div>
      <FiltersBar onFilter={(params) => load(params)} />
      {loading ? <p>Cargando...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {listings.map((l: any) => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}

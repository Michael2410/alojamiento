import Link from 'next/link'

export default function ListingCard(props: any) {
  const listing = props.listing
  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow">
      <img src={listing.imagen ?? '/placeholder.png'} alt={listing.titulo} className="w-full h-44 object-cover" />
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">{listing.titulo}</h3>
          {listing.verificado && <span className="badge-success">Verificado</span>}
        </div>
        <p className="text-sm text-slate-600 mt-2">{listing.universidad} · ${listing.precio}</p>
        <div className="mt-4 flex justify-end">
          <Link href={`/alojamientos/${listing.id}`} className="btn-outline">Ver detalle</Link>
        </div>
      </div>
    </div>
  )
}


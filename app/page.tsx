import Link from 'next/link'
import Carousel from '../components/Carousel'

export default function Home() {
  return (
    <section>
      <div className="mb-8">
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
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Alojamiento Estudiantil en Panamá</h1>
        <p className="text-gray-700 mb-6">Encuentra hospedaje seguro y verificado cerca de tu universidad.</p>
        <div className="flex justify-center gap-4">
          <Link href="/alojamientos" className="btn-primary">Buscar alojamiento</Link>
          <Link href="/registro" className="btn-outline">Regístrate</Link>
        </div>
      </div>
    </section>
  )
}


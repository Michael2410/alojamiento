'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

type CarouselProps = {
  images: string[]
  intervalMs?: number
  autoPlay?: boolean
  className?: string
  heightClass?: string
}

export default function Carousel({
  images,
  intervalMs = 3500,
  autoPlay = true,
  className = '',
  heightClass = 'h-80 md:h-96 lg:h-[28rem]'
}: CarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1) return
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoPlay, intervalMs, safeImages.length])

  const goTo = (i: number) => setIndex(((i % safeImages.length) + safeImages.length) % safeImages.length)
  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  if (safeImages.length === 0) return null

  return (
    <div className={`relative w-full overflow-hidden rounded-lg bg-gray-100 shadow-md ${heightClass} ${className}`}>
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {safeImages.map((src, i) => (
          <div key={i} className="relative min-w-full h-full">
            <Image
              src={encodeURI(src)}
              alt={`slide-${i + 1}`}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2 hover:bg-black/60"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
            {safeImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

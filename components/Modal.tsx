'use client'
import React from 'react'

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded p-4 max-w-lg w-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600">Cerrar</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

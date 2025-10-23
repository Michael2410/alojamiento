'use client'
import { useEffect, useState } from 'react'

export default function Chat({ reservationId, currentUserId }: { reservationId: number, currentUserId: number }) {
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')

  async function load() {
    const res = await fetch(`/api/messages?reservationId=${reservationId}`)
    const json = await res.json()
    setMessages(json.data ?? [])
  }

  useEffect(() => { load(); const t = setInterval(load, 3000); return () => clearInterval(t) }, [])

  async function send() {
    if (!text.trim()) return
    await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ reservationId, senderId: currentUserId, content: text }), headers: { 'Content-Type': 'application/json' } })
    setText('')
    load()
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <div className="max-h-60 overflow-y-auto space-y-2">
        {messages.map(m => (
          <div key={m.id} className={`p-2 rounded ${m.senderId===currentUserId? 'bg-blue-50 self-end':'bg-gray-100'}`}> 
            <div className="text-sm text-gray-700">{m.content}</div>
            <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 border px-2 py-1 rounded" />
        <button onClick={send} className="bg-primary text-white px-3 py-1 rounded">Enviar</button>
      </div>
    </div>
  )
}

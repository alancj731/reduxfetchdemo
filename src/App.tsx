import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen w-screen flex items-start justify-center bg-gray-100 p-8">
      <div className="p-8 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Hello Tailwind + Vite + TS!</h1>
        <p className="text-gray-700">You're now using Tailwind in a Vite + React project.</p>
      </div>
    </main>
  )
}

export default App

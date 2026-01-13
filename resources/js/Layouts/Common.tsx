import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import { CartProvider } from '@/context/CartContext'
import React from 'react'

export default function Common({children}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

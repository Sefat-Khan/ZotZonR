import ProductCart from '@/Components/ProductCart'
import Common from '@/Layouts/Common'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Cart({product}) {
  return (
    <Common header="Shopping Cart">
      <Head title="Shopping Cart" />
        <ProductCart product={product} />
        </Common>
  )
}

import OrderContent from '@/Components/OrderContent'
import Common from '@/Layouts/Common'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Order() {
  return (
    <Common header="Order Details">
      <Head title="Order Details" />
            <OrderContent />
            </Common>
  )
}

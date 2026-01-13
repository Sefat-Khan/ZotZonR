import CheckoutContent from '@/Components/CheckoutContent'
import Common from '@/Layouts/Common'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function CheckOut() {
  return (
    <Common header="Check Out">
      <Head title="Check Out" />
        <CheckoutContent />
    </Common>
  )
}

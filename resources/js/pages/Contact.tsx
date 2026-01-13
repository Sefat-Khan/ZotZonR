import ContactContent from '@/Components/ContactContent'
import Common from '@/Layouts/Common'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Contact() {
  return (
    <Common header="Contact Us">
      <Head title="Contact Us" />
        <ContactContent />
    </Common>
  )
}

import AboutContent from '@/Components/AboutContent'
import Common from '@/Layouts/Common'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function About() {
  return (
    <Common header="About Us">
      <Head title="About Us" />
        <AboutContent />
    </Common>
  )
}

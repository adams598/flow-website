import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { Stack } from '@/components/Stack'
import { About } from '@/components/About'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Stack />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}

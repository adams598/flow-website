import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { CaseStudies } from '@/components/CaseStudies'
import { Testimonials } from '@/components/Testimonials'
import { Process } from '@/components/Process'
import { Solutions } from '@/components/Solutions'
import { FAQ } from '@/components/FAQ'
import { Stack } from '@/components/Stack'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Projects />
      <CaseStudies />
      <Testimonials />
      <Process />
      <Solutions />
      <FAQ />
      <Stack />
      <CTA />
      <Footer />
    </main>
  )
}

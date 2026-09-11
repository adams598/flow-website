import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Problems } from '@/components/Problems'
import { Offers } from '@/components/Offers'
import { Realisations } from '@/components/Realisations'
import { Difference } from '@/components/Difference'
import { Method } from '@/components/Method'
import { WhyUs } from '@/components/WhyUs'
import { About } from '@/components/About'
import { Stack } from '@/components/Stack'
import { ProjectForm } from '@/components/ProjectForm'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Problems />
      <Offers />
      <Realisations />
      <Difference />
      <Method />
      <WhyUs />
      <About />
      {/* <Stack /> */}
      <ProjectForm />
      <Footer />
    </main>
  )
}

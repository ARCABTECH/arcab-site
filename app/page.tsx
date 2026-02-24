import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import PurposeSection from '@/components/PurposeSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TechMarquee from '@/components/TechMarquee'
import CustomCursorMount from '@/components/ui/CustomCursorMount'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursorMount />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TechMarquee />
        <Services />
        <About />
        <PurposeSection />
        <Contact />
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  )
}

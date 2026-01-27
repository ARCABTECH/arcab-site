import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import SystemLog from '@/components/SystemLog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TechMarquee from '@/components/TechMarquee'
import CustomCursor from '@/components/ui/CustomCursor'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TechMarquee />
        <Services />
        <About />
        <SystemLog />
        <Contact />
      </main>
      <WhatsAppFloat />
      <Footer />
    </div>
  )
}

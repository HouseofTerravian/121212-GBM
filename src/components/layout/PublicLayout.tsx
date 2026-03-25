import { Outlet } from 'react-router-dom'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PublicLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

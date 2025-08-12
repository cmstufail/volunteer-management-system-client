import { Outlet } from 'react-router-dom'

// components
import Navbar from '../pages/shared/Navbar'
import Footer from '../pages/shared/Footer'
import ScrollToTop from '../pages/utility/ScrollToTop'


const MainLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <main className="pt-13 min-h-[calc(100vh-100px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout

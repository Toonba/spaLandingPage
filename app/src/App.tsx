import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { AnimalsPage } from '@/pages/AnimalsPage'
import { AnimalDetailPage } from '@/pages/AnimalDetailPage'
import { AdoptionPage } from '@/pages/AdoptionPage'
import { HelpPage } from '@/pages/HelpPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/animaux" element={<AnimalsPage />} />
                <Route path="/animaux/:id" element={<AnimalDetailPage />} />
                <Route path="/adoption" element={<AdoptionPage />} />
                <Route path="/aider" element={<HelpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

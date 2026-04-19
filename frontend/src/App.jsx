import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ItemDetails from './pages/ItemDetails'
import AddItem from './pages/AddItem'
import Favorites from './pages/Favorites'
import Auth from './pages/Auth'
import MyItems from './pages/MyItems'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import Inbox from './pages/Inbox'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen transition-colors duration-200 flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          success: {
            style: {
              background: '#10B981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
        }}
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/myitems" element={<MyItems />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { getFavorites, getUser, isLoggedIn } from '../utils/api'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { Heart, ArrowLeft } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([])
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    if (!user || !isLoggedIn()) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const data = await getFavorites()
      setFavoriteItems(data || [])
    } catch (err) {
      console.error('Failed to load favorites:', err)
    }
    setLoading(false)
  }

  if (!user || !isLoggedIn()) {
    return (
      <div className="text-center py-20">
        <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('pleaseLogin')}</h2>
        <p className="text-gray-500 mt-2">Log in to save your favorite items.</p>
      </div>
    )
  }

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto py-8"
    >
      <div className="mb-8 border-b dark:border-gray-700 pb-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('favorites') || 'Favorites'}</h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
            className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading favorites...</p>
        </div>
      ) : favoriteItems.length > 0 ? (
        <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map(item => (
            <motion.div key={item.id} variants={itemVars}>
              <ItemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">{t('noFavorites') || 'No favorites yet'}</h2>
          <p className="text-gray-500 mt-2">Tap the heart icon on items to save them here.</p>
        </div>
      )}
    </motion.div>
  )
}

export default Favorites

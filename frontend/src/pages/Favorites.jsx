import { useState, useEffect } from 'react'
import { getItems, getFavorites } from '../utils/storage'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { Heart, ArrowLeft } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
    const allItems = getItems()
    const favIds = getFavorites()
    const filtered = allItems.filter(item => favIds.includes(item.id))
    setFavoriteItems(filtered)
  }, [])

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
    >
      <div className="mb-8 border-b dark:border-gray-700 pb-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400" size={32} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('favorites')}</h1>
        </div>
      </div>

      {favoriteItems.length > 0 ? (
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
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">{t('noFavorites')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('favHint')}</p>
        </div>
      )}
    </motion.div>
  )
}

export default Favorites

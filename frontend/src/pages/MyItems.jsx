import { useState, useEffect } from 'react'
import { getItems, removeItem, getUser, isLoggedIn } from '../utils/api'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { Trash2, Box, ArrowLeft } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const MyItems = () => {
  const [myItems, setMyItems] = useState([])
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    loadMyItems()
  }, [])

  const loadMyItems = async () => {
    if (!user) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const data = await getItems({ user_id: user.id, per_page: 100 })
      setMyItems(data.data || [])
    } catch (err) {
      console.error('Failed to load items:', err)
    }
    setLoading(false)
  }

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(t('confirmDelete'))
    if (confirmDelete) {
      try {
        await removeItem(itemId)
        toast.success('Item deleted!')
        loadMyItems()
      } catch (err) {
        toast.error(err.message || 'Failed to delete item.')
      }
    }
  }

  if (!user || !isLoggedIn()) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('pleaseLogin')}</h2>
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
          <Box className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('myItemsDash')}</h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
            className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading your items...</p>
        </div>
      ) : myItems.length > 0 ? (
        <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myItems.map(item => (
            <motion.div key={item.id} variants={itemVars} className="relative group">
              <ItemCard item={item} />
              
              <button 
                onClick={(e) => { e.preventDefault(); handleDelete(item.id); }}
                className="absolute top-2 left-2 p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg shadow-sm cursor-pointer z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title={t('deleteItem')}
              >
                <Trash2 size={16} /> <span className="text-xs font-bold">{t('deleteItem')}</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <Box size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">{t('noMyItems')}</h2>
          <p className="text-gray-500 mt-2">{t('myItemsHint')}</p>
        </div>
      )}
    </motion.div>
  )
}

export default MyItems

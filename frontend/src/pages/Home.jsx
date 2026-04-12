import { useState, useEffect } from 'react'
import { getItems } from '../utils/storage'
import ItemCard from '../components/ItemCard'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'

const Home = () => {
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    setItems(getItems())
  }, [])

  const cities = ["", "Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", "Fes", "Meknes"]
  const categories = ["", "Electronics", "Clothing", "Home", "Books", "Sports", "Toys", "Vehicles"]

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = filterCity === '' || item.city === filterCity
    const matchesCategory = filterCategory === '' || item.category === filterCategory
    return matchesSearch && matchesCity && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'low_to_high') return a.price - b.price
    if (sortOrder === 'high_to_low') return b.price - a.price
    return 0
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)

  const handleFilterChange = () => setCurrentPage(1)

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
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 mb-8 text-center border border-blue-100 dark:border-blue-800 transition-colors duration-200">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-400 mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg">
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-wrap gap-4 transition-colors duration-200">
        <div className="flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')} 
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
          />
        </div>
        <div className="w-full sm:w-auto min-w-[150px]">
          <select 
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 cursor-pointer"
            value={filterCity}
            onChange={(e) => { setFilterCity(e.target.value); handleFilterChange(); }}
          >
            <option value="">{t('allCities')}</option>
            {cities.filter(c => c !== "").map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto min-w-[150px]">
          <select 
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 cursor-pointer"
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); handleFilterChange(); }}
          >
            <option value="">{t('allCategories')}</option>
            {categories.filter(c => c !== "").map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
         <div className="w-full sm:w-auto min-w-[150px]">
          <select 
            className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 cursor-pointer"
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value); handleFilterChange(); }}
          >
            <option value="">{t('sortValue')}</option>
            <option value="low_to_high">{t('lowToHigh')}</option>
            <option value="high_to_low">{t('highToLow')}</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center text-gray-600 dark:text-gray-400 font-medium">
        <span>{t('found')} {sortedItems.length} {t('itemsToExchange')}</span>
      </div>

      {currentItems.length > 0 ? (
        <>
          <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map(item => (
              <motion.div key={item.id} variants={itemVars}>
                 <ItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 w-fit mx-auto shadow-sm">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-blue-700 dark:text-blue-400 font-semibold rounded-md disabled:opacity-50 hover:bg-blue-50 cursor-pointer"
              >
                <ArrowLeft size={18} /> {t('prev') || "Prev"}
              </button>
              <span className="text-gray-600 dark:text-gray-300 font-medium mx-4">
                {t('page')||"Page"} {currentPage} {t('of')||"of"} {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-blue-700 dark:text-blue-400 font-semibold rounded-md disabled:opacity-50 hover:bg-blue-50 cursor-pointer"
              >
                {t('next') || "Next"} <ArrowRight size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h2 className="text-xl text-gray-500 dark:text-gray-400">{t('noItems')}</h2>
          <button 
            onClick={() => { setSearchTerm(''); setFilterCity(''); setFilterCategory(''); setSortOrder(''); handleFilterChange(); }}
            className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 cursor-pointer font-medium"
          >
            {t('clearFilters')}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default Home

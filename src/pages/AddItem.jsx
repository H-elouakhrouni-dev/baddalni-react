import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { addItem, getUser } from '../utils/storage'
import { AlertCircle, ArrowRightLeft, ArrowLeft } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'

const AddItem = () => {
  const navigate = useNavigate()
  const user = getUser()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    city: 'Casablanca',
    category: 'Electronics',
    lookingForImage: '',
    lookingForDesc: ''
  })

  const cities = ["Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", "Fes", "Meknes"]
  const categories = ["Electronics", "Clothing", "Home", "Books", "Sports", "Toys", "Vehicles"]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.price || !formData.image) {
      alert(t('fillAllFields'))
      return
    }

    const newItem = {
      ...formData,
      price: parseInt(formData.price)
    }

    addItem(newItem)
    navigate('/')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
          <ArrowLeft size={20} /> {t('goBack')}
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('addItemTitle')}</h1>
      
      {!user && (
        <div className="bg-amber-100 dark:bg-amber-900 border-l-4 border-amber-500 text-amber-700 dark:text-amber-200 p-4 rounded mb-6 flex items-start gap-3 mt-4">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
          <p className="font-medium text-sm md:text-base">{t('anonymousWarning')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* OFFERING SIDE */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">1</span> {t('offeringTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('itemTitle')} *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder="e.g. iPhone 12 Pro" />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('imageUrl')} *</label>
                <input required type="url" name="image" value={formData.image} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder="https://example.com/image.jpg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('estValue')} *</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder="200" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('city')} *</label>
                  <select name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white cursor-pointer">
                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('category')} *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white cursor-pointer">
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('description')} *</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white resize-none" placeholder="Describe your item..."></textarea>
              </div>
            </div>
          </div>

          {/* LOOKING FOR SIDE */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200 relative">
            <div className="hidden md:flex absolute -left-7 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded-full z-10 shadow-sm">
              <ArrowRightLeft className="text-gray-400" size={24} />
            </div>

            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">2</span> {t('lookingForTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('lookingForImage')} (Optional)</label>
                <input type="url" name="lookingForImage" value={formData.lookingForImage} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder="https://example.com/target-image.jpg" />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('lookingForDesc')} (Optional)</label>
                <textarea name="lookingForDesc" value={formData.lookingForDesc} onChange={handleChange} rows="6" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white resize-none" placeholder="I am willing to trade this for a Samsung Galaxy S21 or a PS4..."></textarea>
              </div>

              {formData.lookingForImage && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-32 opacity-70">
                  <img src={formData.lookingForImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full md:w-1/2 mx-auto block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-xl transition-colors cursor-pointer text-xl shadow-md"
        >
          {t('publishItem')}
        </button>
      </form>
    </motion.div>
  )
}

export default AddItem

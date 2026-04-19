import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { addItem, getUser, isLoggedIn } from '../utils/api'
import { AlertCircle, ArrowRightLeft, ArrowLeft, Upload } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'

const AddItem = () => {
  const navigate = useNavigate()
  const user = getUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: 'Casablanca',
    category: 'Electronics',
    lookingForDesc: ''
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [lookingForFile, setLookingForFile] = useState(null)
  const [lookingForPreview, setLookingForPreview] = useState(null)

  const cities = ["Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir", "Fes", "Meknes"]
  const categories = ["Electronics", "Clothing", "Home", "Books", "Sports", "Toys", "Vehicles"]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleLookingForImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLookingForFile(file)
      setLookingForPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.description || !formData.price || !imageFile) {
      setError(t('fillAllFields') || 'Please fill all required fields and upload an image.')
      return
    }

    if (!isLoggedIn()) {
      setError('You must be logged in to post an item.')
      return
    }

    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('price', parseInt(formData.price))
      data.append('city', formData.city)
      data.append('category', formData.category)
      data.append('image', imageFile)
      
      if (lookingForFile) {
        data.append('looking_for_image', lookingForFile)
      }
      if (formData.lookingForDesc) {
        data.append('looking_for_desc', formData.lookingForDesc)
      }

      await addItem(data)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to create item. Please try again.')
    }

    setIsSubmitting(false)
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
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('addItemTitle')}</h1>
      
      {!user && (
        <div className="bg-amber-100 dark:bg-amber-900 border-l-4 border-amber-500 text-amber-700 dark:text-amber-200 p-4 rounded mb-6 flex items-start gap-3 mt-4">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
          <p className="font-medium text-sm md:text-base">You must <Link to="/login" className="underline font-bold">log in</Link> to post items.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded mb-6 flex items-start gap-3 mt-4">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
          <p className="font-medium text-sm md:text-base">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">1</span> {t('offeringTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('itemTitle')} *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" placeholder="e.g. Traditional Moroccan Teapot" />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  <Upload size={16} className="inline mr-1" /> Upload Image *
                </label>
                <input 
                  required 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300" 
                />
                {imagePreview && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-40">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200 relative">
            <div className="hidden md:flex absolute -left-7 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded-full z-10 shadow-sm">
              <ArrowRightLeft className="text-gray-400" size={24} />
            </div>

            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">2</span> {t('lookingForTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('lookingForImage')} (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLookingForImageChange} 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('lookingForDesc')} (Optional)</label>
                <textarea name="lookingForDesc" value={formData.lookingForDesc} onChange={handleChange} rows="6" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white resize-none" placeholder="I am willing to trade this for a Samsung Galaxy S21 or a PS4..."></textarea>
              </div>

              {lookingForPreview && (
                <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-32 opacity-70">
                  <img src={lookingForPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !isLoggedIn()}
          className="w-full md:w-1/2 mx-auto flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-xl transition-colors cursor-pointer text-xl shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full" />
              <span>Publishing...</span>
            </>
          ) : (
            t('publishItem')
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default AddItem

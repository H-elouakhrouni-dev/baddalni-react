import { useState } from 'react'
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto py-8"
    >
      <div className="mb-6 border-b dark:border-gray-700 pb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
          <ArrowLeft size={20} /> {t('goBack')}
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">{t('contact')}</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{t('getInTouch')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex-shrink-0">
                  <Mail className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span>{t('supportEmail')}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex-shrink-0">
                  <Phone className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span dir="ltr" className="font-bold tracking-wide">+212 608 65 11 03</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span>{t('address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          {submitted ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Mail className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t('messageSent')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('messageSentDesc')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('nameLabel')}</label>
                <input required type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('emailLabel')}</label>
                <input required type="email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('messageLabel')}</label>
                <textarea required rows="4" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer">
                {t('sendBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ContactUs

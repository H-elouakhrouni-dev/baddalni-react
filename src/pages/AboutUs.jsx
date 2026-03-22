import { Users, Leaf, RefreshCw, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const AboutUs = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  }
  const itemVars = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="mb-6 border-b dark:border-gray-700 pb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
          <ArrowLeft size={20} /> {t('goBack')}
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('about')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('aboutMission')}
        </p>
      </motion.div>

      <motion.div 
        variants={containerVars} 
        initial="hidden" 
        animate="show" 
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        <motion.div variants={itemVars} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-4"
          >
            <RefreshCw className="text-blue-600 dark:text-blue-400" size={32} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t('tradeFreely')}</h3>
          <p className="text-gray-600 dark:text-gray-400">{t('tradeFreelyDesc')}</p>
        </motion.div>
        
        <motion.div variants={itemVars} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-4"
          >
            <Users className="text-blue-600 dark:text-blue-400" size={32} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t('communityLabel')}</h3>
          <p className="text-gray-600 dark:text-gray-400">{t('communityDesc')}</p>
        </motion.div>

        <motion.div variants={itemVars} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-4"
          >
            <Leaf className="text-blue-600 dark:text-blue-400" size={32} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t('ecoFriendly')}</h3>
          <p className="text-gray-600 dark:text-gray-400">{t('ecoFriendlyDesc')}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AboutUs

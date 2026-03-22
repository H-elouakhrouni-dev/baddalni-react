import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../utils/storage'
import { LogIn, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [contactInfo, setContactInfo] = useState('') // New field for Registration
  const navigate = useNavigate()

  const handleAuth = (e) => {
    e.preventDefault()
    
    if (username.trim()) {
      loginUser(username)
      navigate('/')
      window.location.reload()
    }
  }

  const simulateGoogleLogin = () => {
    loginUser("Google User")
    navigate('/')
    window.location.reload()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 w-full max-w-md transition-colors duration-200">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        {/* Toggle Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button 
            type="button"
            className={`flex-1 py-3 text-center font-semibold text-lg cursor-pointer transition-colors ${isLogin ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setIsLogin(true)}
          >
            {t('signInTab')}
          </button>
          <button 
            type="button"
            className={`flex-1 py-3 text-center font-semibold text-lg cursor-pointer transition-colors ${!isLogin ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setIsLogin(false)}
          >
            {t('createAccountTab')}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
            <img src="/baddalni_logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover bg-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isLogin ? t('welcomeBack') : t('joinBaddalni')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 min-h-[3rem]">
            {isLogin ? t('enterUsername') : t('pickUsername')}
          </p>
        </div>

        {/* Third Party OAuth Simulation */}
        {!isLogin && (
          <div className="mb-6">
            <button 
              type="button" 
              onClick={simulateGoogleLogin}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              {t('continueWithGoogle')}
            </button>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('username')}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. amine_maroc"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 mt-2">{t('emailOrPhone')}</label>
              <input 
                type="text" 
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="06 XX XX XX XX / email@baddalni.ma"
                required={!isLogin}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
              />
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer text-lg flex justify-center items-center gap-2 mt-4"
          >
            <LogIn size={20} /> {isLogin ? t('signInBtn') : t('createAccountBtn')}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default Auth

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser, loginUser } from '../utils/api'
import { LogIn, ArrowLeft, Mail, Lock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await loginUser(email, password)
      } else {
        if (password !== passwordConfirmation) {
          setError('Passwords do not match.')
          setLoading(false)
          return
        }
        await registerUser(name, email, password, passwordConfirmation)
      }
      navigate('/')
      window.location.reload()
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 w-full max-w-md transition-colors duration-200">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button 
            type="button"
            className={`flex-1 py-3 text-center font-semibold text-lg cursor-pointer transition-colors ${isLogin ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            {t('signInTab')}
          </button>
          <button 
            type="button"
            className={`flex-1 py-3 text-center font-semibold text-lg cursor-pointer transition-colors ${!isLogin ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            {t('createAccountTab')}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
            <img src="/baddalni_logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover bg-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isLogin ? t('welcomeBack') : t('joinBaddalni')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 min-h-[3rem]">
            {isLogin ? 'Sign in with your email and password' : 'Create your account to start trading'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
                <User size={16} /> Full Name
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amine El Kadi"
                required={!isLogin}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
              />
            </motion.div>
          )}

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
                <Lock size={16} /> Confirm Password
              </label>
              <input 
                type="password" 
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                required={!isLogin}
                minLength={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
              />
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer text-lg flex justify-center items-center gap-2 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full" />
            ) : (
              <>
                <LogIn size={20} /> {isLogin ? t('signInBtn') : t('createAccountBtn')}
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default Auth

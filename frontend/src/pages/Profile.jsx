import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUser, updateUser, deleteAccount, logoutUser, isLoggedIn } from '../utils/api'
import { ArrowLeft, User, Save, Trash2, Camera, LogOut, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'
import toast from 'react-hot-toast'

const Profile = () => {
  const navigate = useNavigate()
  const user = getUser()
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  })

  useEffect(() => {
    if (!user || !isLoggedIn()) {
      navigate('/login')
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
      })
    }
  }, [navigate])

  if (!user) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateUser({ name: formData.name, email: formData.email })
      toast.success(t('profileSaved') || 'Profile successfully saved!')
    } catch (err) {
      toast.error(err.message || 'Failed to save profile.')
    }
    setSaving(false)
  }

  const handleLogout = async () => {
    await logoutUser()
    window.location.href = '/'
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(t('confirmDeleteAccount') || 'Are you absolutely sure you want to delete your account? All your items on the market will be removed permanently.')
    if (confirmed) {
      try {
        await deleteAccount()
        window.location.href = '/'
      } catch (err) {
        toast.error(err.message || 'Failed to delete account.')
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="mb-8 border-b dark:border-gray-700 pb-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <User className="text-blue-600" size={32} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{t('myProfile') || 'My Profile'}</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-10">
        
        <div className="flex flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-8 md:pb-0 md:pr-10">
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-blue-100 dark:border-blue-900 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-inner">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={80} className="text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
            <Camera size={16} /> {t('previewAvatar') || 'Profile Avatar'}
          </div>
        </div>

        <form onSubmit={handleSave} className="flex-1 space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-colors"
            />
          </div>

          <div className="pt-6 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-gray-200 dark:border-gray-700 mt-2">
            <button 
              type="submit"
              disabled={saving}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 disabled:bg-gray-400"
            >
              <Save size={20} /> {saving ? 'Saving...' : (t('saveChanges') || 'Save Profile')}
            </button>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut size={20} /> {t('logout') || 'Log Out'}
              </button>
              
              <button 
                type="button"
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Trash2 size={20} /> {t('deleteAccount') || 'Delete Account'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default Profile

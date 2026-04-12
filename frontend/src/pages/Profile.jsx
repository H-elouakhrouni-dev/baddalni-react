import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUser, updateUser, deleteAccount, logoutUser } from '../utils/storage'
import { ArrowLeft, User, Save, Trash2, Camera, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const Profile = () => {
  const navigate = useNavigate()
  const user = getUser()

  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
    phone: '',
    bio: ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      setFormData({
        username: user.username,
        avatar: user.avatar || '',
        phone: user.phone || '',
        bio: user.bio || ''
      })
    }
  }, [navigate, user])

  if (!user) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateUser(formData)
    alert(t('profileSaved') || 'Profile successfully saved!')
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(t('confirmDeleteAccount') || 'Are you absolutely sure you want to delete your account? All your items on the market will be removed permanently.')
    if (confirmed) {
      deleteAccount(user.username)
      navigate('/')
      window.location.reload()
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('myProfile') || 'My Profile'}</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 flex flex-col md:flex-row gap-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-8 md:pb-0 md:pr-10">
          <div className="relative w-48 h-48 rounded-full border-4 border-blue-100 dark:border-blue-900 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow-inner">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={80} className="text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
            <Camera size={16} /> {t('previewAvatar') || 'Live Avatar Preview'}
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="flex-1 space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('username')} (Read Only)</label>
            <input 
              type="text" 
              value={formData.username}
              disabled
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-gray-500 cursor-not-allowed font-medium"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('profileAvatarUrl') || 'Profile Image URL'}</label>
            <input 
              type="url" 
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/my-picture.jpg"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('contactPhone') || 'Contact Phone / Email'}</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 XX XX XX XX"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">{t('bio') || 'About Me (Bio)'}</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Hi! I live in Casablanca and love exchanging traditional items."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white resize-none transition-colors"
            ></textarea>
          </div>

          <div className="pt-6 flex flex-col md:flex-row gap-4 justify-between items-center border-t border-gray-200 dark:border-gray-700 mt-2">
            <button 
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
            >
              <Save size={20} /> {t('saveChanges') || 'Save Profile'}
            </button>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                type="button"
                onClick={() => { logoutUser(); window.location.href = '/'; }}
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

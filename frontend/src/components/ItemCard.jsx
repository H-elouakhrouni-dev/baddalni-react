import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { getUser, isFavorite, sendMessage, toggleFavorite } from '../utils/storage'
import { t } from '../utils/i18n'
import toast from 'react-hot-toast'

const ItemCard = ({ item }) => {
  const navigate = useNavigate()
  const user = getUser()
  const [favorite, setFavorite] = useState(() => isFavorite(item.id))
  const [showModal, setShowModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const canMessageOwner = favorite && item.owner && user?.username !== item.owner

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const updatedFavorites = toggleFavorite(item.id)
    const nextFavorite = updatedFavorites.includes(item.id)

    setFavorite(nextFavorite)

    if (!nextFavorite) {
      setShowModal(false)
      setMessageText('')
    }
  }

  const handleMessageClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate('/login')
      return
    }

    setShowModal(true)
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault()

    if (!messageText.trim() || !user) {
      return
    }

    sendMessage(item.owner, user.username, messageText.trim(), item.title)
    setMessageText('')
    setShowModal(false)
    toast.success(t('messageSentModal') || 'Message Sent to Owner successfully!')
  }

  return (
    <>
      <Link to={`/item/${item.id}`} className="block h-full cursor-pointer">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1 h-full flex flex-col relative group">
          
          {/* Image Container with Badge */}
          <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-sm font-bold text-blue-700 dark:text-blue-400">
              {item.price} {t('madValue')}
            </div>
            
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700 cursor-pointer"
              type="button"
            >
              <Heart 
                size={18} 
                className={favorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-300"} 
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1">{t(item.title)}</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
              {t(item.description)}
            </p>
            
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto mb-3">
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {t(item.city)}
              </span>
              <span className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">
                {t(item.category)}
              </span>
            </div>

            <div className="mt-auto space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2.5 rounded-lg font-bold text-sm transition-colors cursor-pointer group-hover:-translate-y-1 relative shadow-sm">
                {t('viewDetails')}
              </button>

              {canMessageOwner && (
                <button
                  type="button"
                  onClick={handleMessageClick}
                  className="w-full border border-blue-200 dark:border-blue-800 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-900/70 text-blue-700 dark:text-blue-300 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  {t('messageOwner') || 'Message Owner'}
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl">
            <div className="bg-blue-600 dark:bg-blue-800 p-4 flex items-center justify-between text-white">
              <h3 className="font-bold flex items-center gap-2">
                <MessageCircle size={18} />
                {t('messageOwner') || 'Message Owner'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleMessageSubmit} className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('to') || 'To:'} <b className="text-blue-600 dark:text-blue-400">{item.owner}</b>
              </p>

              <textarea
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none"
                placeholder={t('writeMessage') || 'Write your private message here...'}
                rows="4"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
                autoFocus
              ></textarea>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {t('cancel') || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-[2] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send size={18} />
                  {t('sendMessage') || 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ItemCard

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getItem, addComment, getUser, sendMessage, isLoggedIn } from '../utils/api'
import { MapPin, Tag, ArrowLeft, RefreshCw, User, ArrowRightLeft, MessageCircle, Send, X } from 'lucide-react'
import { t } from '../utils/i18n'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const IMG_BASE = 'http://localhost:8000'

const ItemDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const user = getUser()

  useEffect(() => {
    fetchItem()
  }, [id])

  const fetchItem = async () => {
    setLoading(true)
    try {
      const data = await getItem(id)
      setItem(data)
    } catch (err) {
      console.error('Failed to fetch item:', err)
      setItem(null)
    }
    setLoading(false)
  }

  const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    if (path.startsWith('/images/')) return path
    return `${IMG_BASE}${path}`
  }

  const ownerName = item?.user?.name || 'Unknown'
  const canMessageOwner = item?.user && user && item.user.id !== user.id

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || !isLoggedIn()) return
    setSubmitting(true)

    try {
      await addComment(item.id, commentText)
      setCommentText('')
      await fetchItem() // Refresh item to get new comment
      toast.success('Comment posted!')
    } catch (err) {
      toast.error(err.message || 'Failed to post comment.')
    }
    setSubmitting(false)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim()) return
    setSubmitting(true)

    try {
      await sendMessage(item.user.id, messageText, item.id, item.title)
      setShowModal(false)
      setMessageText('')
      toast.success(t('messageSentModal') || 'Message Sent to Owner successfully!')
    } catch (err) {
      toast.error(err.message || 'Failed to send message.')
    }
    setSubmitting(false)
  }

  const handleProposeTradeClick = () => {
    if (!canMessageOwner) return
    if (!user) {
      navigate('/login')
    } else {
      setShowModal(true)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
          className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading item...</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('itemNotFound')}</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">{t('goBack')}</Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-6 transition-colors">
        <ArrowLeft size={20} /> {t('goBack')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800 overflow-hidden relative">
          <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 uppercase tracking-wider">
            {t('offeringTitle')}
          </div>
          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            className="w-full h-52 sm:h-80 object-cover border-b border-gray-100 dark:border-gray-700"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x320/e0e7ff/3730a3?text=${encodeURIComponent(item.title)}`; }}
          />
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{item.title}</h1>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold px-3 py-1 rounded-full whitespace-nowrap text-sm">
                {item.price} {t('madValue')}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[4rem]">
              {item.description}
            </p>
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="text-blue-500" size={16} /> <span className="font-medium">{t('locationLabel')}:</span> {item.city}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Tag className="text-blue-500" size={16} /> <span className="font-medium">{t('categoryLabel')}:</span> {item.category}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <User className="text-blue-500" size={16} /> <span className="font-medium">Owner:</span> {ownerName}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative flex flex-col">
          <div className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded-full z-10 shadow-sm">
            <ArrowRightLeft className="text-gray-400" size={20} />
          </div>

          <div className="absolute top-0 left-0 bg-gray-500 dark:bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 uppercase tracking-wider">
            {t('lookingForTitle')}
          </div>

          <img
            src={getImageUrl(item.looking_for_image) || `https://placehold.co/600x320/f1f5f9/64748b?text=Looking+For`}
            alt="Target item"
            className="w-full h-52 sm:h-80 object-cover opacity-80 border-b border-gray-100 dark:border-gray-700 grayscale-[20%]"
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x320/f1f5f9/64748b?text=Looking+For`; }}
          />
          <div className="p-6 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('lookingForTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-300 italic flex-grow">
              "{item.looking_for_desc || `Looking to exchange this for another item of equivalent value. Open to offers!`}"
            </p>
          </div>
        </div>
      </div>

      {canMessageOwner && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center relative">
          <button
            onClick={handleProposeTradeClick}
            className="max-w-md w-full mx-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all cursor-pointer text-lg shadow-md hover:-translate-y-0.5"
          >
            <RefreshCw size={24} />
            {t('messageOwner') || 'Message Owner'}
          </button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
            {t('noMoney')}
          </p>
        </div>
      )}

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
          <MessageCircle className="text-blue-500" /> {t('comments') || 'Comments & Offers'} ({item.comments?.length || 0})
        </h2>

        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8 flex flex-col items-end gap-3">
            <textarea
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white resize-none transition-colors"
              placeholder={t('writeComment') || 'Write a public message or offer...'}
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:bg-gray-400"
            >
              <Send size={18} /> {t('postComment') || 'Post'}
            </button>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center border border-gray-100 dark:border-gray-600 transition-colors">
            <p className="text-gray-600 dark:text-gray-300">
              <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors">{t('loginDetails') || 'Log in'}</Link> {t('toLeaveComment') || 'to leave a comment.'}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {(item.comments || []).map((c) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm shadow-inner">
                  {(c.user?.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{c.user?.name || 'User'}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 ml-11">{c.text}</p>
            </motion.div>
          ))}
          {(!item.comments || item.comments.length === 0) && (
            <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">{t('noCommentsYet') || 'No comments yet. Be the first!'}</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="bg-blue-600 dark:bg-blue-800 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <MessageCircle size={20} /> {t('messageOwner') || 'Direct Message'}
              </h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('from') || 'From:'} <b>{user.name}</b> <br />
                {t('to') || 'To:'} <b className="text-blue-600 dark:text-blue-400">{ownerName}</b>
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
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-lg transition-colors cursor-pointer">
                  {t('cancel') || 'Cancel'}
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-[2] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-md disabled:bg-gray-400"
                >
                  <Send size={18} /> {t('sendMessage') || 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default ItemDetails

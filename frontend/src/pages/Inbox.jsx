import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMessages, getUser } from '../utils/storage'
import { Inbox as InboxIcon, ArrowLeft, MessageSquare, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { t } from '../utils/i18n'

const Inbox = () => {
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      setMessages(getMessages(user.username))
    }
  }, [navigate, user])

  if (!user) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="mb-8 border-b dark:border-gray-700 pb-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
            <ArrowLeft size={20} /> {t('goBack')}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <InboxIcon className="text-blue-600 dark:text-blue-400" size={32} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('inbox') || 'Inbox'}</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">{t('noMessages') || 'No messages in your inbox.'}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">When users send you private messages about your items, they will appear here securely.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-lg">
                      {msg.from.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">
                        {t('from') || 'From:'} <span className="text-blue-600 dark:text-blue-400">{msg.from}</span>
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{msg.date}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                    <Package size={14} /> {msg.itemTitle}
                  </div>
                </div>
                
                <div className="sm:hidden mb-3 inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                  <Package size={14} /> {msg.itemTitle}
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.text}</p>
                </div>
                
                <button 
                  onClick={() => alert(`Reply logic for ${msg.from} coming soon!`)}
                  className="mt-4 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reply to {msg.from}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Inbox

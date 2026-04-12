import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser, logoutUser } from '../utils/storage'
import { t, getLang, setLang } from '../utils/i18n'
import { LogIn, LogOut, PlusCircle, Heart, Home, Sun, Moon, Briefcase, Info, Mail, User, MessageSquare } from 'lucide-react'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [lang, setLangState] = useState(getLang())

  useEffect(() => {
    setUser(getUser())
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    
    if (lang === 'ar') document.documentElement.dir = 'rtl'
    else document.documentElement.dir = 'ltr'
  }, [theme, lang])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    window.location.href = '/' 
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLangChange = (e) => {
    setLang(e.target.value)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-950 via-blue-700 to-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all duration-300 fixed w-full top-0 left-0 z-[9999] border-b-[3px] border-cyan-400">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo and App Name */}
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <img src="/baddalni_logo.png" alt="Baddalni Logo" className="w-8 h-8 rounded-full shadow-sm bg-white p-0.5 object-cover" />
          <span className="font-sans hidden sm:inline font-bold tracking-wide">{t('appName')}</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex gap-2 md:gap-4 items-center">
          {/* Main Links */}
          <Link to="/" className="flex items-center gap-1 hover:text-blue-200 px-1 md:px-0" title={t('home')}>
            <Home size={18} /> <span className="hidden xl:inline">{t('home')}</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-1 hover:text-blue-200 px-1 md:px-0" title={t('favorites')}>
            <Heart size={18} /> <span className="hidden xl:inline">{t('favorites')}</span>
          </Link>
          
          {user && (
            <Link to="/myitems" className="flex items-center gap-1 hover:text-blue-200 px-1 md:px-0" title={t('myItems')}>
              <Briefcase size={18} /> <span className="hidden xl:inline">{t('myItems')}</span>
            </Link>
          )}

          {/* Explicit Informational Links */}
          <Link to="/about" className="flex items-center gap-1 hover:text-blue-200 px-1 md:px-0" title={t('about')}>
            <Info size={18} /> <span className="hidden xl:inline">{t('about')}</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-1 hover:text-blue-200 px-1 md:px-0" title={t('contact')}>
            <Mail size={18} /> <span className="hidden xl:inline">{t('contact')}</span>
          </Link>

          <Link to="/add" className="flex flex-shrink-0 items-center gap-1 bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 px-3 py-1.5 rounded-md font-medium transition-colors ml-1" title={t('add')}>
            <PlusCircle size={18} /> <span className="hidden xl:inline">{t('add')}</span>
          </Link>
          
          {/* Language Toggle */}
          <select 
            value={lang} 
            onChange={handleLangChange}
            className="bg-blue-700 dark:bg-blue-800 text-white text-sm py-1 px-1 md:px-2 rounded-md outline-none cursor-pointer border-none shadow-inner ml-2"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="ar">عربي</option>
          </select>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-1.5 rounded-full hover:bg-blue-500 dark:hover:bg-blue-800 transition-colors cursor-pointer ml-1"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* User Section */}
          <div className="border-l border-blue-400 dark:border-blue-700 ml-1 pl-2 md:pl-4 flex items-center gap-1 md:gap-3">
            {user ? (
              <>
                <Link to="/inbox" className="flex items-center justify-center p-2 rounded-full hover:bg-blue-800/70 transition-colors text-blue-100 hover:text-white" title="Inbox Messages">
                  <MessageSquare size={18} />
                </Link>
                <Link to="/profile" className="flex items-center gap-1.5 text-sm font-bold bg-blue-800/40 hover:bg-blue-800/70 p-1.5 px-3 rounded-full transition-colors cursor-pointer whitespace-nowrap" title="My Profile">
                  <User size={14} /> {user.username}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 p-1.5 rounded-md text-sm cursor-pointer transition-colors"
                  title={t('logout')}
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-200 dark:hover:text-blue-300 text-sm whitespace-nowrap">
                <LogIn size={16} /> <span className="hidden xl:inline">{t('login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser, logoutUser, isLoggedIn } from '../utils/api'
import { t, getLang, setLang } from '../utils/i18n'
import { LogIn, LogOut, PlusCircle, Heart, Home, Sun, Moon, Briefcase, Info, Mail, User, MessageSquare, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [lang, setLangState] = useState(getLang())
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    setUser(getUser())
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')

    if (lang === 'ar') document.documentElement.dir = 'rtl'
    else document.documentElement.dir = 'ltr'
  }, [theme, lang])

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    setMenuOpen(false)
    window.location.href = '/'
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLangChange = (e) => {
    setLang(e.target.value)
    setLangState(e.target.value)
  }

  const navLinks = [
    { to: '/', icon: <Home size={18} />, label: t('home') },
    { to: '/favorites', icon: <Heart size={18} />, label: t('favorites') },
    ...(user ? [{ to: '/myitems', icon: <Briefcase size={18} />, label: t('myItems') }] : []),
    { to: '/about', icon: <Info size={18} />, label: t('about') },
    { to: '/contact', icon: <Mail size={18} />, label: t('contact') },
  ]

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-950 via-blue-700 to-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all duration-300 fixed w-full top-0 left-0 z-[9999] border-b-[3px] border-cyan-400">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          <Link to="/" className="text-xl md:text-2xl font-bold flex items-center gap-2 flex-shrink-0">
            <img src="/baddalni_logo.png" alt="Baddalni Logo" className="w-8 h-8 rounded-full shadow-sm bg-white p-0.5 object-cover" />
            <span className="font-sans hidden sm:inline font-bold tracking-wide">{t('appName')}</span>
          </Link>

          <div className="hidden md:flex gap-2 lg:gap-4 items-center">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 hover:text-blue-200 px-1"
                title={link.label}
              >
                {link.icon}
                <span className="hidden xl:inline">{link.label}</span>
              </Link>
            ))}

            <Link
              to="/add"
              className="flex flex-shrink-0 items-center gap-1 bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 px-3 py-1.5 rounded-md font-medium transition-colors ml-1"
              title={t('add')}
            >
              <PlusCircle size={18} />
              <span className="hidden xl:inline">{t('add')}</span>
            </Link>

            <select
              value={lang}
              onChange={handleLangChange}
              className="bg-blue-700 dark:bg-blue-800 text-white text-sm py-1 px-1 md:px-2 rounded-md outline-none cursor-pointer border-none shadow-inner ml-2"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">عربي</option>
            </select>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-blue-500 dark:hover:bg-blue-800 transition-colors cursor-pointer ml-1"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="border-l border-blue-400 dark:border-blue-700 ml-1 pl-2 md:pl-4 flex items-center gap-1 md:gap-3">
              {user ? (
                <>
                  <Link to="/inbox" className="flex items-center justify-center p-2 rounded-full hover:bg-blue-800/70 transition-colors text-blue-100 hover:text-white" title="Inbox">
                    <MessageSquare size={18} />
                  </Link>
                  <Link to="/profile" className="flex items-center gap-1.5 text-sm font-bold bg-blue-800/40 hover:bg-blue-800/70 p-1.5 px-3 rounded-full transition-colors whitespace-nowrap">
                    <User size={14} /> {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-blue-700 hover:bg-blue-800 p-1.5 rounded-md text-sm cursor-pointer transition-colors"
                    title={t('logout')}
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-1 hover:text-blue-200 text-sm whitespace-nowrap">
                  <LogIn size={16} /> <span className="hidden xl:inline">{t('login')}</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className={`fixed top-16 left-0 right-0 z-[9999] md:hidden bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-2xl border-b-2 border-cyan-400 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">

          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800/60 transition-colors font-medium"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          <Link
            to="/add"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition-colors font-bold mt-1"
          >
            <PlusCircle size={18} />
            <span>{t('add')}</span>
          </Link>

          <div className="border-t border-blue-700 my-2" />

          {user ? (
            <>
              <Link to="/inbox" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800/60 transition-colors">
                <MessageSquare size={18} />
                <span>Inbox</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800/60 transition-colors font-bold">
                <User size={18} />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/50 transition-colors text-red-300 font-medium w-full text-left cursor-pointer"
              >
                <LogOut size={18} />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800/60 transition-colors font-medium">
              <LogIn size={18} />
              <span>{t('login')}</span>
            </Link>
          )}

          <div className="border-t border-blue-700 my-2" />

          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-sm text-blue-300">Language:</span>
            <select
              value={lang}
              onChange={handleLangChange}
              className="bg-blue-800 text-white text-sm py-1.5 px-3 rounded-md outline-none cursor-pointer border border-blue-600"
            >
              <option value="en">EN - English</option>
              <option value="fr">FR - Français</option>
              <option value="ar">عربي - Arabic</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

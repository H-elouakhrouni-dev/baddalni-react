import { Link } from 'react-router-dom'
import { t } from '../utils/i18n'
import { Facebook, Instagram, Mail, MessageCircle, Music2 } from 'lucide-react'

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.88-6.39L6.5 22H3.39l7.24-8.28L1 2h6.4l4.42 5.84L18.9 2Zm-1.1 18h1.72L6.48 3.9H4.72L17.8 20Z" />
  </svg>
)

const socialLinks = [
  { name: 'Facebook', href: '#', hoverClass: 'hover:bg-blue-600', icon: Facebook },
  { name: 'Instagram', href: '#', hoverClass: 'hover:bg-pink-600', icon: Instagram },
  { name: 'X', href: '#', hoverClass: 'hover:bg-black', icon: XIcon },
  { name: 'TikTok', href: '#', hoverClass: 'hover:bg-slate-900', icon: Music2 },
  { name: 'WhatsApp', href: '#', hoverClass: 'hover:bg-green-500', icon: MessageCircle },
]

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-950 to-blue-700 text-gray-300 py-12 mt-16 transition-colors duration-200 border-t-[6px] border-blue-400">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/baddalni_logo.png" alt="Baddalni Logo" className="w-8 h-8 rounded-full bg-white p-0.5 object-cover" />
            <h2 className="text-2xl font-bold text-white">Baddalni</h2>
          </div>
          <p className="text-gray-400 italic mb-4 max-w-sm">
            {t('footerMission')}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">{t('quickLinks')}</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">{t('home')}</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">{t('about')}</Link></li>
            <li><Link to="/add" className="hover:text-blue-400 transition-colors">{t('add')}</Link></li>
            <li><Link to="/favorites" className="hover:text-blue-400 transition-colors">{t('favorites')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">{t('community')}</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2 font-medium">
                <Mail size={16} /> {t('contact')}
              </Link>
            </li>
            <li className="pt-2">
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ name, href, hoverClass, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    className={`bg-blue-900 border border-blue-800 p-2.5 rounded-full text-white hover:-translate-y-1 transition-all shadow-sm ${hoverClass}`}
                    title={name}
                    aria-label={name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center text-sm text-gray-500 mt-12 border-t border-gray-800 pt-8">
        (c) {new Date().getFullYear()} Baddalni Morocco. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

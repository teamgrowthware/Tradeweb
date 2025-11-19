import { motion } from 'framer-motion'
import { Twitter, Send, MessageCircle } from 'lucide-react'
import Logo from '../assets/Aitrade.png'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  }

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Curved top border effect */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <svg
          className="w-full"
          viewBox="0 0 1440 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 1C480 1 480 0 720 0C960 0 960 1 1440 1"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Background gradient effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute -bottom-24 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-3 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
          
           <motion.div
               className="flex items-center space-x-3"></motion.div>
          <img 
    src={Logo} 
    alt="Tradorr Logo"
    className="w-16 h-16 object-contain"
  />
              
            </div>
            {/* <span className="text-3xl font-bold text-white">Tradorr</span> */}
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            className="flex flex-wrap justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {['Home', 'Features', 'Why Choose Tradorr?', 'How it works', 'FAQ'].map((link, idx) => (
              <motion.a
                key={idx}
                href={`#${link.toLowerCase().replace(/\s+/g, '-').replace('?', '')}`}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Send, href: 'https://telegram.org', label: 'Telegram' },
              { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:border-white/30 transition-all group"
                variants={socialIconVariants}
                whileHover="hover"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          className="text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} Tradorr.com | hello@tradorr.com
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
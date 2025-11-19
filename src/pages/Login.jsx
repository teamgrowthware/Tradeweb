import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, loginWithGoogle } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert('Login successful!')
      setLoading(false)
    }, 1500)
  }

  const handleGoogleLogin = async () => {
      setLoading(true)
      try {
        await loginWithGoogle()
        toast.success('Login successful!')
        navigate('/dashboard')
      } catch (error) {
        console.error('Google login error:', error)
        toast.error(error.message || 'Failed to login with Google.')
      } finally {
        setLoading(false)
      }
    }
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm"
            >
              Sign in to your Tradorr account
            </motion.p>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            {/* Sign In Button - Updated Design */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group shadow-lg shadow-white/20 mt-8"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900/50 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={loading}
              className="mt-6 w-full py-4 bg-black/50 border border-white/10 rounded-xl font-semibold hover:bg-black/80 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-white"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.56 11.25c0-.77-.07-1.51-.2-2.22H11v4.21h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.07z" fill="#4285F4"/>
                <path d="M11 22c2.97 0 5.46-.99 7.28-2.68l-3.57-2.77c-.98.66-2.23 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H1.16v2.84A10.99 10.99 0 0011 22z" fill="#34A853"/>
                <path d="M4.84 13.07c-.22-.66-.35-1.36-.35-2.07s.13-1.41.35-2.07V6.09H1.16A10.99 10.99 0 000 11c0 1.78.43 3.47 1.16 4.91l3.68-2.84z" fill="#FBBC05"/>
                <path d="M11 4.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C16.45 1.09 13.97 0 11 0 6.7 0 2.98 2.24 1.16 5.51l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-gray-300 font-semibold transition-colors">
              Sign up
            </Link>

          </motion.p>
        </div>

        {/* Additional decorative element */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-gray-600 text-xs"
        >
          <p>Protected by industry-standard encryption</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
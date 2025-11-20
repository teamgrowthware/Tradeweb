import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../context/SubscriptionContext'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiCalendar, FiZap, FiArrowRight } from 'react-icons/fi'
import { format } from 'date-fns'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { subscription, loading } = useSubscription()
  const fullAnalyzerUrl = import.meta.env.VITE_FULL_ANALYZER_URL || 'https://your-analyzer-app.com'

  const handleOpenAnalyzer = () => {
    if (subscription?.isActive) {
      window.open(fullAnalyzerUrl, '_blank')
    } else {
      window.location.href = '/pricing'
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {currentUser?.email?.split('@')[0]}! 
          </h1>
          <p className="text-gray-400">Manage your trading account and access your tools</p>
        </motion.div>

        {/* Subscription Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Subscription Status</h2>
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : (
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      subscription?.isActive ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-lg font-semibold">
                    {subscription?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              )}
            </div>
            {subscription?.isActive && (
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Plan</p>
                <p className="text-lg font-semibold">{subscription?.plan || 'Pro'}</p>
              </div>
            )}
          </div>

          {subscription?.isActive && subscription?.endDate && (
            <div className="flex items-center space-x-2 text-gray-400">
              <FiCalendar />
              <span>
                Expires: {format(new Date(subscription.endDate), 'MMM dd, yyyy')}
              </span>
            </div>
          )}

          {!subscription?.isActive && (
            <div className="mt-4">
              <Link
                to="/pricing"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <span>Subscribe Now</span>
                <FiArrowRight />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FiZap className="text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Full AI Analyzer</h3>
            <p className="text-gray-400 mb-4">
              Access advanced SMC, ITC, and pattern analysis with entry, stop loss, and target predictions.
            </p>
            <button
              onClick={handleOpenAnalyzer}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
            >
              <span>Open Full Analyzer</span>
              <FiArrowRight />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <FiTrendingUp className="text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Trading Dashboard</h3>
            <p className="text-gray-400 mb-4">
              View your trading statistics, performance metrics, and account details.
            </p>
            <Link
              to="/"
              className="block w-full py-3 glass-effect rounded-lg font-semibold text-center hover:bg-white/10 transition-all"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="font-semibold">{currentUser?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">User ID:</span>
              <span className="font-mono text-sm">{currentUser?.uid?.substring(0, 20)}...</span>
            </div>
            {subscription?.plan && (
              <div className="flex justify-between">
                <span className="text-gray-400">Current Plan:</span>
                <span className="font-semibold">{subscription.plan}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


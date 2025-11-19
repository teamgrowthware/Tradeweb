import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../context/SubscriptionContext'
import { FiCheck, FiZap, FiStar } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import StripePayment from '../components/payments/StripePayment'
import RazorpayPayment from '../components/payments/RazorpayPayment'
import CryptoPayment from '../components/payments/CryptoPayment'

const plans = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 1299,
    currency: '₹',
    tokens: 30,
    bonus: 0,
    total: 30,
    features: [
      'New minimum entry point',
      'Feels premium, filters serious users',
      'Best for quick testing'
    ],
    popular: false
  },
  {
    id: 'trader',
    name: 'Trader Pack',
    price: 1999,
    currency: '₹',
    tokens: 70,
    bonus: 10,
    total: 80,
    features: [
      'Most users upgrade here',
      'Better value than starter',
      'Perfect for intraday traders'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 3499,
    currency: '₹',
    tokens: 150,
    bonus: 30,
    total: 180,
    features: [
      'Extremely attractive',
      'High revenue',
      'Recommended pack for all traders'
    ],
    popular: true,
    badge: 'Best Seller'
  },
  {
    id: 'elite',
    name: 'Elite Pack',
    price: 5999,
    currency: '₹',
    tokens: 300,
    bonus: 70,
    total: 370,
    features: [
      'Designed for prop traders & heavy users',
      'Very profitable for you',
      'High-value high-commitment pack'
    ],
    popular: false
  },
  {
    id: 'ultimate',
    name: 'Ultimate Mega Pack',
    price: 9999,
    currency: '₹',
    tokens: 600,
    bonus: 150,
    total: 750,
    features: [
      'One-time large revenue',
      'For serious professional traders',
      'Perfect upsell on checkout'
    ],
    popular: false,
    badge: 'Lifetime'
  }
]

const tokenCosts = [
  { type: 'Basic Candlestick', tokens: 2 },
  { type: 'SMC / ICT / Pattern / Indicator', tokens: 5 }
]

export default function Pricing() {
  const { currentUser } = useAuth()
  const { subscription } = useSubscription()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [showTrial, setShowTrial] = useState(true)
  const navigate = useNavigate()

  const handleSelectPlan = (plan) => {
    if (!currentUser) {
      toast.error('Please login to subscribe')
      navigate('/login')
      return
    }
    setSelectedPlan(plan)
    setPaymentMethod(null)
  }

  const handlePaymentSuccess = () => {
    toast.success('Subscription activated successfully!')
    setSelectedPlan(null)
    setPaymentMethod(null)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Trading Pack</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your trading needs. All plans include monthly subscription with 7-day free trial.
          </p>
        </motion.div>

        {/* Trial Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-effect rounded-lg p-1 inline-flex">
            <button
              onClick={() => setShowTrial(true)}
              className={`px-6 py-2 rounded-lg transition-all ${
                showTrial
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              With 7-Day Trial
            </button>
            <button
              onClick={() => setShowTrial(false)}
              className={`px-6 py-2 rounded-lg transition-all ${
                !showTrial
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              No Trial
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-effect rounded-2xl p-6 relative ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </span>
                </div>
              )}
              {plan.badge && !plan.popular && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.currency}{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <div className="glass-effect rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-400 mb-1">Tokens</div>
                  <div className="text-2xl font-bold">{plan.tokens}</div>
                  {plan.bonus > 0 && (
                    <div className="text-green-400 text-sm mt-1">
                      +{plan.bonus} Bonus
                    </div>
                  )}
                  <div className="text-lg font-semibold mt-2 text-blue-400">
                    Total: {plan.total} Tokens
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2">
                    <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    : 'glass-effect hover:bg-white/10'
                }`}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Token Costs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Token Cost Per Analysis</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {tokenCosts.map((cost, idx) => (
              <div key={idx} className="glass-effect rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">{cost.type}</div>
                <div className="text-2xl font-bold text-blue-400">{cost.tokens} Tokens</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Modal */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedPlan(null)
              setPaymentMethod(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-bold mb-2">{selectedPlan.name}</h2>
              <p className="text-gray-400 mb-6">
                {selectedPlan.currency}{selectedPlan.price}/month • {selectedPlan.total} Tokens
              </p>

              {!paymentMethod ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setPaymentMethod('stripe')}
                      className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all text-left"
                    >
                      <div className="text-2xl mb-2">💳</div>
                      <div className="font-semibold">Card Payment</div>
                      <div className="text-sm text-gray-400">Stripe</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('razorpay')}
                      className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all text-left"
                    >
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-semibold">UPI Payment</div>
                      <div className="text-sm text-gray-400">Razorpay (India)</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('crypto')}
                      className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all text-left"
                    >
                      <div className="text-2xl mb-2">₿</div>
                      <div className="font-semibold">Crypto Payment</div>
                      <div className="text-sm text-gray-400">Coinbase/NOWPayments</div>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setPaymentMethod(null)}
                    className="text-gray-400 hover:text-white mb-4 flex items-center space-x-2"
                  >
                    <span>←</span>
                    <span>Back to payment methods</span>
                  </button>
                  {paymentMethod === 'stripe' && (
                    <StripePayment
                      plan={selectedPlan}
                      trial={showTrial}
                      onSuccess={handlePaymentSuccess}
                      onCancel={() => setPaymentMethod(null)}
                    />
                  )}
                  {paymentMethod === 'razorpay' && (
                    <RazorpayPayment
                      plan={selectedPlan}
                      trial={showTrial}
                      onSuccess={handlePaymentSuccess}
                      onCancel={() => setPaymentMethod(null)}
                    />
                  )}
                  {paymentMethod === 'crypto' && (
                    <CryptoPayment
                      plan={selectedPlan}
                      trial={showTrial}
                      onSuccess={handlePaymentSuccess}
                      onCancel={() => setPaymentMethod(null)}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


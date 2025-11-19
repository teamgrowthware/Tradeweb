// Create Stripe payment intent endpoint
// This should be deployed as a serverless function

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, planId, userId, trial } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency || 'inr',
      metadata: {
        planId: planId,
        userId: userId,
        trial: trial ? 'true' : 'false'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: error.message })
  }
}


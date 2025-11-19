import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { SubscriptionProvider } from './context/SubscriptionContext'
import { useAuth } from './context/AuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TermsAndConditions from './pages/TermsandCondition'
import PrivacyPolicy from './pages/privacyandpolicy'

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const { currentUser, userData } = useAuth()
  if (!currentUser) return <Navigate to="/login" />
  if (!userData?.isAdmin) return <Navigate to="/dashboard" />
  return children
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Router>
          <div className="min-h-screen bg-dark-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/termandcondition" element={<TermsAndConditions/>}/>
              <Route path = "/privacyandpolicy" element={<PrivacyPolicy/>}/>
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                } 
              />
            </Routes>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          </div>
        </Router>
      </SubscriptionProvider>
    </AuthProvider>
  )
}

export default App


import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/login'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from './auth/private-route'
import { OnlyLoggedOut } from './auth/OnlyLoggedOut'
import { HomePage } from './pages/home'
import { SignupPage } from './pages/signup'
import { GoogleAuth } from './auth/google-auth'
import { FacebookAuth } from './auth/facebook-auth'
function App() {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={
              <OnlyLoggedOut>
                <LoginPage />
              </OnlyLoggedOut>
          } />
          
          <Route path="/signup" element={
            <OnlyLoggedOut>
              <SignupPage />
            </OnlyLoggedOut>
            } />
            
          <Route path='/googleauth' element={<GoogleAuth />}>
          </Route>
          <Route path='/facebookauth' element={<FacebookAuth />}>
          </Route>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }>
          </Route>
        </Routes>
      </Router>
  )
}

export default App

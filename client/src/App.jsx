import { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/login'
import { AuthProvider } from './context/AuthProvider'
import UserPage from './pages/user';
import { ProtectedRoute } from './auth/private-route'
import { OnlyLoggedOut } from './auth/OnlyLoggedOut'
import { HomePage } from './pages/home'
function App() {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={
              <OnlyLoggedOut>
                <LoginPage />
              </OnlyLoggedOut>
          } />
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

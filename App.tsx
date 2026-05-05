import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AdminLogin } from './pages/AdminLogin'
import { AdminPrivate } from './pages/AdminPrivate'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPrivate />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App

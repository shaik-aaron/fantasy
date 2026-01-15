import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import { RequireAuth } from "./pages/auth-components/RequireAuth"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" replace />} />
      <Route index path="/auth/:mode" element={<Auth />} />
      <Route element={<RequireAuth />}>
        <Route index path="/home" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App

import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/dashboard/Dashboard"
import Auth from "./pages/auth/Auth"
import { RequireAuth } from "./pages/auth/auth-components/RequireAuth"
import { LockIn } from "./pages/dashboard/pages/LockIn"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" replace />} />
      <Route index path="/auth/:mode" element={<Auth />} />
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Dashboard />}>
          <Route index path="/home/lock-in" element={<LockIn />} />
          <Route path="lock-in" element={<LockIn />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

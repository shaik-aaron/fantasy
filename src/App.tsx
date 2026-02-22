import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./pages/dashboard/Dashboard"
import Auth from "./pages/auth/Auth"
import { RequireAuth } from "./pages/auth/auth-components/RequireAuth"
import { LockIn } from "./pages/dashboard/pages/LockIn"
import Reports from "./pages/dashboard/pages/Reports"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" replace />} />
      <Route index path="/auth/:mode" element={<Auth />} />
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Dashboard />}>
          <Route path="lock-in" element={<LockIn />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

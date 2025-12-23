import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route index path="/login" element={<Login />} />
      <Route index path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App

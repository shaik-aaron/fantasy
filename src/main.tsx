import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx';
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from './context/SessionProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <SessionProvider>
        <App />
        <Toaster />
      </SessionProvider>
    </AuthProvider>
  </BrowserRouter>,
)
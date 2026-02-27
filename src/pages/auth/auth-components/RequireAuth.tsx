import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import api from "../../../api/posts";
import { Loader2 } from "lucide-react";

export const RequireAuth = () => {
    const { setAuth } = useContext(AuthContext)
    const [response, setResponse] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [unauthorized, setUnauthorized] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/validate')
                setResponse(response)
                setAuth({ userId: response.data.message.userId, firstName: response.data.message.firstName, email: response.data.message.email })
                console.log(response.data.message)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error)
                console.log(error)
                setResponse(error)
                setUnauthorized(true)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    if (loading) return <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    if (unauthorized) return <Navigate to="/auth/login" replace />
    return (
        response?.status === 401 ? <Navigate to="/auth/login" replace /> : <Outlet />
    )
};
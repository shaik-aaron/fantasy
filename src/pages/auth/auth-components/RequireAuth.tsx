import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

export const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    return (
        auth?.userId ? <Outlet /> : <Navigate to="/auth/login" replace />
    )
};
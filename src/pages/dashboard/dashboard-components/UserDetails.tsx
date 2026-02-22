import { AuthContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function UserDetails() {

    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAuth(null);
        navigate("/auth/login");
    };

    return (
        <div>
            <div className="flex items-center gap-2 p-2">
                <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center">
                    {auth?.firstName.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-geist-bold">{auth?.firstName}</p>
                    <p className="text-xs text-muted-foreground">{auth?.email}</p>
                </div>
            </div>
            <div className="p-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild><Button className="flex items-center gap-2 w-full justify-start cursor-pointer">
                        <LogOut height={16} width={16} />
                        <p className="text-sm">Logout</p>
                    </Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will be logged out of your account and you will need to login again to continue.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={handleLogout}>Logout</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
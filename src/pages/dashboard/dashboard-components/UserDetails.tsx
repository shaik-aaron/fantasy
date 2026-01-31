import { AuthContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useContext } from "react";

export default function UserDetails() {

    const { auth } = useContext(AuthContext);

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
                <Button className="flex items-center gap-2 w-full justify-start cursor-pointer">
                    <LogOut height={16} width={16} />
                    <p className="text-sm">Logout</p>
                </Button>
            </div>
        </div>
    )
}
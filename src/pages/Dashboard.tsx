import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

function Dashboard() {

    const { auth } = useContext(AuthContext);
    console.log(auth);
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1>You're here! {auth?.firstName}</h1>
        </div>
    )
}

export default Dashboard
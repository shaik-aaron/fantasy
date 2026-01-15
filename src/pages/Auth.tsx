import { useParams } from "react-router"
import Login from "./auth-components/Login"
import Signup from "./auth-components/Signup"

function Auth() {

    const { mode } = useParams<{ mode: 'login' | 'signup' }>()


    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex gap-10">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 border"></div>
                        <h1 className="font-lust text-4xl font-bold">HEARTH</h1>
                        <div className="w-10 border"></div>
                    </div>
                    <p className="font-geist-semibold mt-2 text-[#6b7280]">Focus better. Acheive more.</p>
                    {mode === 'login' ? <Login /> : <Signup />}
                </div>
                <div className="self-stretch border outline-border">
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col gap-2 items-start">
                        <h1 className="font-geist-bold text-xl">Build focus. One session at a time.</h1>
                        <ul className="text-[20px] list-none pl-0 italic">
                            <li>Track focused work.</li>
                            <li>Understand your best hours.</li>
                            <li>Build better habits.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth
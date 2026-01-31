import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MainSidebar from "./dashboard-components/MainSidebar";
import { Outlet } from "react-router";

export default function Dashboard() {


    return (
        <SidebarProvider>
            <MainSidebar />
            <div className="w-screen h-screen flex flex-col">
                <SidebarInset>
                    <header className="border-b w-full flex items-center h-16 p-2">
                        <SidebarTrigger />
                    </header>
                    <main className="w-full h-full flex flex-1 items-center justify-center">
                        <Outlet />
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>

    )
}
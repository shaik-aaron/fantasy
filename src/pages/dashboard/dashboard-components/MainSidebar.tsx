
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, Info, Timer } from "lucide-react";
import UserDetails from "./UserDetails";
import { Link, useLocation } from "react-router";

export default function MainSidebar() {
    const location = useLocation();
    const items = [
        {
            title: "Lock In",
            url: "/home/lock-in",
            icon: <Timer height={18} width={18} />
        },
        {
            title: "Reports",
            url: "/home/reports",
            icon: <BarChart3 height={18} width={18} />
        },
        {
            title: "About",
            url: "#",
            icon: <Info height={18} width={18} />
        }
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-col items-start justify-center p-2">
                    <h1 className="font-lust text-xl font-bold">HEART</h1>
                    <p className="text-sm ">Focus OS</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link className={`${location.pathname === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`} to={item.url}>
                                            {item.icon}
                                            <p className="text-base">{item.title}</p>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className="border-t">
                <UserDetails />
            </SidebarFooter>
        </Sidebar>
    )
}
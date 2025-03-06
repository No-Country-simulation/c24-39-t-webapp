"use client"

import { Sidebar, SidebarItem, SidebarLogo, SidebarItemGroup, SidebarItems  } from "flowbite-react"
import LogoutButton from "@/components/logout-button"
import {HiChartPie, HiInbox, HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi"

export default function SidebarDashboard() {
    return (
        <Sidebar aria-label="Ejemplo de sidebar">
            <SidebarLogo href="/" img="/foodylogo.svg" imgAlt="Flowbite logo">
                Foody
            </SidebarLogo>
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="/dasboard" icon={HiChartPie}>
                            Dashboard
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiViewBoards}>
                            Ajustes
                        </SidebarItem>
                           <SidebarItem href="#" icon={HiInbox}>
                           Inbox
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiUser}>
                            Users
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarItem>
                        <SidebarItem>
                            <LogoutButton />
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
        </Sidebar>
    )
}
"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Snowflake, Settings, LogOut,FolderOpenIcon,HistoryIcon,StarIcon,CreditCardIcon,Key, LogOutIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname,useRouter } from "next/navigation"
import {authClient} from "@/lib/auth-client"


const menuItems = [
    {
        title: "Main",
        items: [
            {
            title: "Workflows",
            icon: FolderOpenIcon,
            url: "/workflows",
            },
            {
                title: "Credentials",
                icon: Key,
                url: "/credentials",
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            }
        ],


    }
]

export const AppSidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/" prefetch>
                        <Image src="/weavon.svg" alt="Weavy" width={32} height={32} />
                        <span className="font-semibold text-sm">
                            Weavy
                        </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>

            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                    tooltip={item.title}
                                    isActive={
                                        item.url === "/" ? 
                                        pathname === item.url :
                                        pathname.startsWith(item.url)
                                    }
                                    asChild
                                    className="gap-x-4 h-10 px-4"
                                    >
                                        <Link href={item.url} prefetch>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton
                    className="gap-x-4 h-10 px-4"
                    onClick={() => {}}
                >
                    <StarIcon className="h-4 w-4" />
                    <span>Upgrade to Pro</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton
                    className="gap-x-4 h-10 px-4"
                    onClick={() =>
                    authClient.signOut({
                        fetchOptions: {
                        onSuccess: () => router.push("/login"),
                        },
                    })
                    }
                >
                    <LogOutIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}

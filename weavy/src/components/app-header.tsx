import {SidebarTrigger} from "@/components/ui/sidebar"

export const AppHeader = () => {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b bg-background z-10">
            <SidebarTrigger />
        </header>
    )
}
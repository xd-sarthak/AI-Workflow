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
import { Plus, Snowflake, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border">
        {/* User Profile Section */}
        <div className="px-3 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={cn(
                  "flex items-center gap-3 w-full hover:opacity-80 transition-opacity rounded-md p-1",
                  "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full"
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src="https://lh3.googleusercontent.com/a/ACg8ocLMDHKaTMa_inJniacDQ1xEixg57jFtI__Csa0HwTX5H09J5w=s96-c" 
                    alt="Sarthak Srivastav"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    S
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium text-sidebar-foreground truncate flex-1 text-left">
                      Sarthak Srivastav
                    </span>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <title>caret</title>
                      <path 
                        d="M9.75 4.5L6 8.25L2.25 4.5" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-sidebar-foreground/70"
                      />
                    </svg>
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-0">
              {/* Workspace Header */}
              <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src="https://lh3.googleusercontent.com/a/ACg8ocLMDHKaTMa_inJniacDQ1xEixg57jFtI__Csa0HwTX5H09J5w=s96-c" 
                      alt="Sarthak Srivastav"
                    />
                    <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-popover-foreground truncate">
                    Sarthak Srivastav's Workspace
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Credits */}
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Snowflake className="h-4 w-4 text-popover-foreground" />
                    <span className="text-sm text-popover-foreground">Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-popover-foreground">143</span>
                    <a
                      href="#"
                      className="text-sm text-popover-foreground underline hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle upgrade for more credits
                      }}
                    >
                      Upgrade for more
                    </a>
                  </div>
                </div>
              </div>

              {/* Plan */}
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-popover-foreground">Plan</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-popover-foreground">Free</span>
                    <a
                      href="#"
                      className="text-sm text-popover-foreground underline hover:no-underline"
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle upgrade plan
                      }}
                    >
                      Upgrade
                    </a>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Settings */}
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              {/* Sign out */}
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Create New File Button */}
        <div className="px-3 pb-3">
          {!isCollapsed ? (
            <Button
              size="sm"
              className="h-9 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-3 text-sm font-medium shadow-sm"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path 
                  d="M3.75 12H20.25" 
                  stroke="currentColor" 
                  strokeWidth="1.13" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 3.75V20.25" 
                  stroke="currentColor" 
                  strokeWidth="1.13" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Create New File
            </Button>
          ) : (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Create New File"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M3.75 12H20.25" 
                      stroke="currentColor" 
                      strokeWidth="1.13" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 3.75V20.25" 
                      stroke="currentColor" 
                      strokeWidth="1.13" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto">
        {/* Navigation Sections */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* My Files */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={true}
                  tooltip="My Files"
                  className="w-full"
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0">
                    <img
                      src="/icons/files.svg"
                      alt="files"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  {!isCollapsed && <span className="flex-1 text-left">My Files</span>}
                </SidebarMenuButton>
                <SidebarMenuAction
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle add file
                  }}
                  className="[&>svg]:size-3"
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M3.75 12H20.25" 
                      stroke="currentColor" 
                      strokeWidth="1.13" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 3.75V20.25" 
                      stroke="currentColor" 
                      strokeWidth="1.13" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </SidebarMenuAction>
              </SidebarMenuItem>

              {/* Shared with me */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Shared with me"
                  disabled
                  className="w-full opacity-50 cursor-not-allowed"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                  >
                    <path 
                      d="M0.958984 18.75C1.70813 17.5982 2.73311 16.6517 3.94086 15.9965C5.14861 15.3412 6.50089 14.998 7.87492 14.998C9.24896 14.998 10.6012 15.3412 11.809 15.9965C13.0167 16.6517 14.0417 17.5982 14.7909 18.75" 
                      stroke="currentColor" 
                      strokeWidth="1.125" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M16.125 15C17.499 14.9992 18.8513 15.3418 20.0592 15.9967C21.267 16.6517 22.292 17.5981 23.0409 18.75" 
                      stroke="currentColor" 
                      strokeWidth="1.125" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M7.875 15C10.5674 15 12.75 12.8174 12.75 10.125C12.75 7.43261 10.5674 5.25 7.875 5.25C5.18261 5.25 3 7.43261 3 10.125C3 12.8174 5.18261 15 7.875 15Z" 
                      stroke="currentColor" 
                      strokeWidth="1.125" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M14.3147 5.59687C14.9816 5.3309 15.6989 5.2155 16.4156 5.25893C17.1322 5.30235 17.8304 5.50352 18.4602 5.84806C19.0901 6.19261 19.6361 6.67202 20.0592 7.25204C20.4823 7.83206 20.7721 8.49838 20.9078 9.20338C21.0435 9.90837 21.0219 10.6346 20.8444 11.3303C20.6669 12.026 20.3379 12.6738 19.881 13.2276C19.4241 13.7814 18.8505 14.2274 18.2012 14.5338C17.5519 14.8402 16.843 14.9994 16.125 15" 
                      stroke="currentColor" 
                      strokeWidth="1.125" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  {!isCollapsed && <span>Shared with me</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Apps */}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Apps">
                  <div className="flex items-center justify-center w-5 h-5 shrink-0">
                    <img
                      src="/icons/apps.svg"
                      alt="shared-apps"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  {!isCollapsed && <span>Apps</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Discord"
                  className="w-full justify-start"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 shrink-0"
                  >
                    <title>discord</title>
                    <path 
                      d="M20.3303 4.22781C18.7767 3.50093 17.1156 2.97267 15.3789 2.67188C15.1656 3.05749 14.9164 3.57614 14.7446 3.98873C12.8985 3.71109 11.0693 3.71109 9.25716 3.98873C9.08539 3.57614 8.83055 3.05749 8.61536 2.67188C6.87681 2.97267 5.21376 3.50287 3.66019 4.23166C0.526643 8.96686 -0.322811 13.5845 0.101917 18.1365C2.18025 19.6885 4.19441 20.6313 6.17457 21.2483C6.66349 20.5754 7.09953 19.8601 7.47518 19.1063C6.75975 18.8344 6.07453 18.499 5.42707 18.1095C5.59884 17.9822 5.76686 17.8492 5.92918 17.7123C9.87819 19.5594 14.1689 19.5594 18.0707 17.7123C18.235 17.8492 18.403 17.9822 18.5728 18.1095C17.9235 18.5009 17.2364 18.8363 16.521 19.1082C16.8966 19.8601 17.3308 20.5774 17.8216 21.2502C19.8036 20.6333 21.8197 19.6905 23.898 18.1365C24.3964 12.8595 23.0467 8.28434 20.3303 4.22781ZM8.01318 15.337C6.82772 15.337 5.85555 14.2303 5.85555 12.8826C5.85555 11.535 6.80696 10.4264 8.01318 10.4264C9.21942 10.4264 10.1916 11.533 10.1708 12.8826C10.1727 14.2303 9.21942 15.337 8.01318 15.337ZM15.9867 15.337C14.8013 15.337 13.8291 14.2303 13.8291 12.8826C13.8291 11.535 14.7805 10.4264 15.9867 10.4264C17.193 10.4264 18.1651 11.533 18.1444 12.8826C18.1444 14.2303 17.193 15.337 15.9867 15.337Z" 
                      fill="currentColor"
                    />
                  </svg>
                  {!isCollapsed && <span>Discord</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

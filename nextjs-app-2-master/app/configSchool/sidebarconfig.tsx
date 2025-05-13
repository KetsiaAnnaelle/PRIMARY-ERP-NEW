"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Sidebarconfig() {
  const [activeLink, setActiveLink] = useState(""); // Utilisé pour suivre le lien actif
  const router = useRouter();

  const handleLinkClick = (href) => {
    setActiveLink(href); // Définir le lien cliqué comme actif
    router.push(href); // Naviguer vers la page correspondante
  };

  return (
    <>
      <button
        type="button"
        data-drawer-target="sidebar"
        data-drawer-toggle="sidebar"
        aria-controls="sidebar"
        className="p-2 text-gray-500 rounded-lg mt-2 ml-3 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 w-64 h-screen transition-transform transform -translate-x-full sm:translate-x-0 bg-purple-100 dark:bg-gray-800"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 relative top-20 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => handleLinkClick("/configSchool")}
                className={`flex items-center p-2 rounded-lg group ${
                  activeLink === "/configSchool"
                    ? "bg-blue-300 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Informations sur l'école</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/configSchool/schoolyear")}
                className={`flex items-center p-2 rounded-lg group ${
                  activeLink === "/configSchool/schoolyear"
                    ? "bg-blue-300 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="ml-3">Configuration</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/configSchool/class")}
                className={`flex items-center p-2 rounded-lg group ${
                  activeLink === "/confiSchool/class"
                    ? "bg-blue-300 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="ml-3">Gestion des Classes</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/")}
                className={`flex items-center p-2 rounded-lg group ${
                  activeLink === "/"
                    ? "bg-blue-300 text-white"
                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.7 0 6 2.7 6 6S8.7 12 12 12s6-2.7 6-6-2.7-6-6-6zm0 10C9.2 10 7 7.8 7 5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0 3c-5.3 0-16 2.7-16 8v2h24v-2c0-5.3-10.7-8-16-8zm-9.6 9c.9-3 8.2-4.5 9.6-4.5s8.7 1.5 9.6 4.5h-19.2z" />
                </svg>
                <span className="ml-3">Gestion du personnel</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebarconfig();





// "use client"

// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { VariantProps, cva } from "class-variance-authority"
// import { PanelLeft } from "lucide-react"

// import { useIsMobile } from "@/hooks/use-mobile"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button" 
// import { Input } from "@/components/ui/input"
// import { Separator } from "@/components/ui/separator"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet"
// import { Skeleton } from "@/components/ui/skeleton"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// const SIDEBAR_COOKIE_NAME = "sidebar_state"
// const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
// const SIDEBAR_WIDTH = "16rem"
// const SIDEBAR_WIDTH_MOBILE = "18rem"
// const SIDEBAR_WIDTH_ICON = "3rem"
// const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// type SidebarContextProps = {
//   state: "expanded" | "collapsed"
//   open: boolean
//   setOpen: (open: boolean) => void
//   openMobile: boolean
//   setOpenMobile: (open: boolean) => void
//   isMobile: boolean
//   toggleSidebar: () => void
// }

// const SidebarContext = React.createContext<SidebarContextProps | null>(null)

// function useSidebar() {
//   const context = React.useContext(SidebarContext)
//   if (!context) {
//     throw new Error("useSidebar must be used within a SidebarProvider.")
//   }

//   return context
// }

// const SidebarProvider = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> & {
//     defaultOpen?: boolean
//     open?: boolean
//     onOpenChange?: (open: boolean) => void
//   }
// >(
//   (
//     {
//       defaultOpen = true,
//       open: openProp,
//       onOpenChange: setOpenProp,
//       className,
//       style,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const isMobile = useIsMobile()
//     const [openMobile, setOpenMobile] = React.useState(false)

//     // This is the internal state of the sidebar.
//     // We use openProp and setOpenProp for control from outside the component.
//     const [_open, _setOpen] = React.useState(defaultOpen)
//     const open = openProp ?? _open
//     const setOpen = React.useCallback(
//       (value: boolean | ((value: boolean) => boolean)) => {
//         const openState = typeof value === "function" ? value(open) : value
//         if (setOpenProp) {
//           setOpenProp(openState)
//         } else {
//           _setOpen(openState)
//         }

//         // This sets the cookie to keep the sidebar state.
//         document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
//       },
//       [setOpenProp, open]
//     )

//     // Helper to toggle the sidebar.
//     const toggleSidebar = React.useCallback(() => {
//       return isMobile
//         ? setOpenMobile((open) => !open)
//         : setOpen((open) => !open)
//     }, [isMobile, setOpen, setOpenMobile])

//     // Adds a keyboard shortcut to toggle the sidebar.
//     React.useEffect(() => {
//       const handleKeyDown = (event: KeyboardEvent) => {
//         if (
//           event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
//           (event.metaKey || event.ctrlKey)
//         ) {
//           event.preventDefault()
//           toggleSidebar()
//         }
//       }

//       window.addEventListener("keydown", handleKeyDown)
//       return () => window.removeEventListener("keydown", handleKeyDown)
//     }, [toggleSidebar])

//     // We add a state so that we can do data-state="expanded" or "collapsed".
//     // This makes it easier to style the sidebar with Tailwind classes.
//     const state = open ? "expanded" : "collapsed"

//     const contextValue = React.useMemo<SidebarContextProps>(
//       () => ({
//         state,
//         open,
//         setOpen,
//         isMobile,
//         openMobile,
//         setOpenMobile,
//         toggleSidebar,
//       }),
//       [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
//     )

//     return (
//       <SidebarContext.Provider value={contextValue}>
//         <TooltipProvider delayDuration={0}>
//           <div
//             style={
//               {
//                 "--sidebar-width": SIDEBAR_WIDTH,
//                 "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
//                 ...style,
//               } as React.CSSProperties
//             }
//             className={cn(
//               "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
//               className
//             )}
//             ref={ref}
//             {...props}
//           >
//             {children}
//           </div>
//         </TooltipProvider>
//       </SidebarContext.Provider>
//     )
//   }
// )
// SidebarProvider.displayName = "SidebarProvider"

// const Sidebar = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> & {
//     side?: "left" | "right"
//     variant?: "sidebar" | "floating" | "inset"
//     collapsible?: "offcanvas" | "icon" | "none"
//   }
// >(
//   (
//     {
//       side = "left",
//       variant = "sidebar",
//       collapsible = "offcanvas",
//       className,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

//     if (collapsible === "none") {
//       return (
//         <div
//           className={cn(
//             "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
//             className
//           )}
//           ref={ref}
//           {...props}
//         >
//           {children}
//         </div>
//       )
//     }

//     if (isMobile) {
//       return (
//         <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
//           <SheetContent
//             data-sidebar="sidebar"
//             data-mobile="true"
//             className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
//             style={
//               {
//                 "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
//               } as React.CSSProperties
//             }
//             side={side}
//           >
//             <SheetHeader className="sr-only">
//               <SheetTitle>Sidebar</SheetTitle>
//               <SheetDescription>Displays the mobile sidebar.</SheetDescription>
//             </SheetHeader>
//             <div className="flex h-full w-full flex-col">{children}</div>
//           </SheetContent>
//         </Sheet>
//       )
//     }

//     return (
//       <div
//         ref={ref}
//         className="group peer hidden text-sidebar-foreground md:block"
//         data-state={state}
//         data-collapsible={state === "collapsed" ? collapsible : ""}
//         data-variant={variant}
//         data-side={side}
//       >
//         {/* This is what handles the sidebar gap on desktop */}
//         <div
//           className={cn(
//             "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
//             "group-data-[collapsible=offcanvas]:w-0",
//             "group-data-[side=right]:rotate-180",
//             variant === "floating" || variant === "inset"
//               ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
//               : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
//           )}
//         />
//         <div
//           className={cn(
//             "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
//             side === "left"
//               ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
//               : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
//             // Adjust the padding for floating and inset variants.
//             variant === "floating" || variant === "inset"
//               ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
//               : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
//             className
//           )}
//           {...props}
//         >
//           <div
//             data-sidebar="sidebar"
//             className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
//           >
//             {children}
//           </div>
//         </div>
//       </div>
//     )
//   }
// )
// Sidebar.displayName = "Sidebar"

// const SidebarTrigger = React.forwardRef<
//   React.ElementRef<typeof Button>,
//   React.ComponentProps<typeof Button>
// >(({ className, onClick, ...props }, ref) => {
//   const { toggleSidebar } = useSidebar()

//   return (
//     <Button
//       ref={ref}
//       data-sidebar="trigger"
//       variant="ghost"
//       size="icon"
//       className={cn("h-7 w-7", className)}
//       onClick={(event) => {
//         onClick?.(event)
//         toggleSidebar()
//       }}
//       {...props}
//     >
//       <PanelLeft />
//       <span className="sr-only">Toggle Sidebar</span>
//     </Button>
//   )
// })
// SidebarTrigger.displayName = "SidebarTrigger"

// const SidebarRail = React.forwardRef<
//   HTMLButtonElement,
//   React.ComponentProps<"button">
// >(({ className, ...props }, ref) => {
//   const { toggleSidebar } = useSidebar()

//   return (
//     <button
//       ref={ref}
//       data-sidebar="rail"
//       aria-label="Toggle Sidebar"
//       tabIndex={-1}
//       onClick={toggleSidebar}
//       title="Toggle Sidebar"
//       className={cn(
//         "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
//         "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
//         "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
//         "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
//         "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
//         "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarRail.displayName = "SidebarRail"

// const SidebarInset = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"main">
// >(({ className, ...props }, ref) => {
//   return (
//     <main
//       ref={ref}
//       className={cn(
//         "relative flex w-full flex-1 flex-col bg-background",
//         "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarInset.displayName = "SidebarInset"

// const SidebarInput = React.forwardRef<
//   React.ElementRef<typeof Input>,
//   React.ComponentProps<typeof Input>
// >(({ className, ...props }, ref) => {
//   return (
//     <Input
//       ref={ref}
//       data-sidebar="input"
//       className={cn(
//         "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarInput.displayName = "SidebarInput"

// const SidebarHeader = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => {
//   return (
//     <div
//       ref={ref}
//       data-sidebar="header"
//       className={cn("flex flex-col gap-2 p-2", className)}
//       {...props}
//     />
//   )
// })
// SidebarHeader.displayName = "SidebarHeader"

// const SidebarFooter = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => {
//   return (
//     <div
//       ref={ref}
//       data-sidebar="footer"
//       className={cn("flex flex-col gap-2 p-2", className)}
//       {...props}
//     />
//   )
// })
// SidebarFooter.displayName = "SidebarFooter"

// const SidebarSeparator = React.forwardRef<
//   React.ElementRef<typeof Separator>,
//   React.ComponentProps<typeof Separator>
// >(({ className, ...props }, ref) => {
//   return (
//     <Separator
//       ref={ref}
//       data-sidebar="separator"
//       className={cn("mx-2 w-auto bg-sidebar-border", className)}
//       {...props}
//     />
//   )
// })
// SidebarSeparator.displayName = "SidebarSeparator"

// const SidebarContent = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => {
//   return (
//     <div
//       ref={ref}
//       data-sidebar="content"
//       className={cn(
//         "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarContent.displayName = "SidebarContent"

// const SidebarGroup = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => {
//   return (
//     <div
//       ref={ref}
//       data-sidebar="group"
//       className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
//       {...props}
//     />
//   )
// })
// SidebarGroup.displayName = "SidebarGroup"

// const SidebarGroupLabel = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> & { asChild?: boolean }
// >(({ className, asChild = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "div"

//   return (
//     <Comp
//       ref={ref}
//       data-sidebar="group-label"
//       className={cn(
//         "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
//         "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarGroupLabel.displayName = "SidebarGroupLabel"

// const SidebarGroupAction = React.forwardRef<
//   HTMLButtonElement,
//   React.ComponentProps<"button"> & { asChild?: boolean }
// >(({ className, asChild = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button"

//   return (
//     <Comp
//       ref={ref}
//       data-sidebar="group-action"
//       className={cn(
//         "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
//         // Increases the hit area of the button on mobile.
//         "after:absolute after:-inset-2 after:md:hidden",
//         "group-data-[collapsible=icon]:hidden",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarGroupAction.displayName = "SidebarGroupAction"

// const SidebarGroupContent = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     data-sidebar="group-content"
//     className={cn("w-full text-sm", className)}
//     {...props}
//   />
// ))
// SidebarGroupContent.displayName = "SidebarGroupContent"

// const SidebarMenu = React.forwardRef<
//   HTMLUListElement,
//   React.ComponentProps<"ul">
// >(({ className, ...props }, ref) => (
//   <ul
//     ref={ref}
//     data-sidebar="menu"
//     className={cn("flex w-full min-w-0 flex-col gap-1", className)}
//     {...props}
//   />
// ))
// SidebarMenu.displayName = "SidebarMenu"

// const SidebarMenuItem = React.forwardRef<
//   HTMLLIElement,
//   React.ComponentProps<"li">
// >(({ className, ...props }, ref) => (
//   <li
//     ref={ref}
//     data-sidebar="menu-item"
//     className={cn("group/menu-item relative", className)}
//     {...props}
//   />
// ))
// SidebarMenuItem.displayName = "SidebarMenuItem"

// const sidebarMenuButtonVariants = cva(
//   "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
//         outline:
//           "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
//       },
//       size: {
//         default: "h-8 text-sm",
//         sm: "h-7 text-xs",
//         lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// const SidebarMenuButton = React.forwardRef<
//   HTMLButtonElement,
//   React.ComponentProps<"button"> & {
//     asChild?: boolean
//     isActive?: boolean
//     tooltip?: string | React.ComponentProps<typeof TooltipContent>
//   } & VariantProps<typeof sidebarMenuButtonVariants>
// >(
//   (
//     {
//       asChild = false,
//       isActive = false,
//       variant = "default",
//       size = "default",
//       tooltip,
//       className,
//       ...props
//     },
//     ref
//   ) => {
//     const Comp = asChild ? Slot : "button"
//     const { isMobile, state } = useSidebar()

//     const button = (
//       <Comp
//         ref={ref}
//         data-sidebar="menu-button"
//         data-size={size}
//         data-active={isActive}
//         className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
//         {...props}
//       />
//     )

//     if (!tooltip) {
//       return button
//     }

//     if (typeof tooltip === "string") {
//       tooltip = {
//         children: tooltip,
//       }
//     }

//     return (
//       <Tooltip>
//         <TooltipTrigger asChild>{button}</TooltipTrigger>
//         <TooltipContent
//           side="right"
//           align="center"
//           hidden={state !== "collapsed" || isMobile}
//           {...tooltip}
//         />
//       </Tooltip>
//     )
//   }
// )
// SidebarMenuButton.displayName = "SidebarMenuButton"

// const SidebarMenuAction = React.forwardRef<
//   HTMLButtonElement,
//   React.ComponentProps<"button"> & {
//     asChild?: boolean
//     showOnHover?: boolean
//   }
// >(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button"

//   return (
//     <Comp
//       ref={ref}
//       data-sidebar="menu-action"
//       className={cn(
//         "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
//         // Increases the hit area of the button on mobile.
//         "after:absolute after:-inset-2 after:md:hidden",
//         "peer-data-[size=sm]/menu-button:top-1",
//         "peer-data-[size=default]/menu-button:top-1.5",
//         "peer-data-[size=lg]/menu-button:top-2.5",
//         "group-data-[collapsible=icon]:hidden",
//         showOnHover &&
//           "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarMenuAction.displayName = "SidebarMenuAction"

// const SidebarMenuBadge = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div">
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     data-sidebar="menu-badge"
//     className={cn(
//       "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
//       "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
//       "peer-data-[size=sm]/menu-button:top-1",
//       "peer-data-[size=default]/menu-button:top-1.5",
//       "peer-data-[size=lg]/menu-button:top-2.5",
//       "group-data-[collapsible=icon]:hidden",
//       className
//     )}
//     {...props}
//   />
// ))
// SidebarMenuBadge.displayName = "SidebarMenuBadge"

// const SidebarMenuSkeleton = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> & {
//     showIcon?: boolean
//   }
// >(({ className, showIcon = false, ...props }, ref) => {
//   // Random width between 50 to 90%.
//   const width = React.useMemo(() => {
//     return `${Math.floor(Math.random() * 40) + 50}%`
//   }, [])

//   return (
//     <div
//       ref={ref}
//       data-sidebar="menu-skeleton"
//       className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
//       {...props}
//     >
//       {showIcon && (
//         <Skeleton
//           className="size-4 rounded-md"
//           data-sidebar="menu-skeleton-icon"
//         />
//       )}
//       <Skeleton
//         className="h-4 max-w-[--skeleton-width] flex-1"
//         data-sidebar="menu-skeleton-text"
//         style={
//           {
//             "--skeleton-width": width,
//           } as React.CSSProperties
//         }
//       />
//     </div>
//   )
// })
// SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

// const SidebarMenuSub = React.forwardRef<
//   HTMLUListElement,
//   React.ComponentProps<"ul">
// >(({ className, ...props }, ref) => (
//   <ul
//     ref={ref}
//     data-sidebar="menu-sub"
//     className={cn(
//       "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
//       "group-data-[collapsible=icon]:hidden",
//       className
//     )}
//     {...props}
//   />
// ))
// SidebarMenuSub.displayName = "SidebarMenuSub"

// const SidebarMenuSubItem = React.forwardRef<
//   HTMLLIElement,
//   React.ComponentProps<"li">
// >(({ ...props }, ref) => <li ref={ref} {...props} />)
// SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

// const SidebarMenuSubButton = React.forwardRef<
//   HTMLAnchorElement,
//   React.ComponentProps<"a"> & {
//     asChild?: boolean
//     size?: "sm" | "md"
//     isActive?: boolean
//   }
// >(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
//   const Comp = asChild ? Slot : "a"

//   return (
//     <Comp
//       ref={ref}
//       data-sidebar="menu-sub-button"
//       data-size={size}
//       data-active={isActive}
//       className={cn(
//         "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
//         "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
//         size === "sm" && "text-xs",
//         size === "md" && "text-sm",
//         "group-data-[collapsible=icon]:hidden",
//         className
//       )}
//       {...props}
//     />
//   )
// })
// SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

// export {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupAction,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarInput,
//   SidebarInset,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuBadge,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSkeleton,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarProvider,
//   SidebarRail,
//   SidebarSeparator,
//   SidebarTrigger,
//   useSidebar,
// }


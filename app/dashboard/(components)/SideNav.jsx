"use client"
import React from 'react'
import Image from 'next/image'
import { GraduationCapIcon, LayoutIcon, Hand, SettingsIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

const SideNav = () => {

    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutIcon,
            link: "/dashboard"
        },
        {
            id: 2,
            name: "Students",
            icon: GraduationCapIcon,
            link: "/dashboard/students"
        },
        {
            id: 3,
            name: "Attendance",
            icon: Hand,
            link: "/dashboard/attendance"
        },
        {
            id: 4,
            name: "Settings",
            icon: SettingsIcon,
            link: "/dashboard/settings"
        },
    ]

    return (
        <div className="border-r shadow-md h-screen p-5">

            {/* Logo  */}
            <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={50}
                className="ml-8"
            />

            <hr className="my-5" />

            {/* Navigation Items  */}
            {
                navItems.map(item => {
                    return (
                        <div onClick={() => router.push(item.link)} key={item.id} className={`flex items-center text-md gap-3 p-4 m-1 text-slate-500 hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg ${pathname === item.link && "bg-blue-700 text-white"}`}>
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </div>
                    )
                })
            }

            <div className="flex items-center gap-3 bottom-5 fixed p-2">
                <UserButton />
                <div className="flex flex-col">
                    <p className="text-xs text-slate-500">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-slate-500">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
            </div>

        </div>
    )
}

export default SideNav

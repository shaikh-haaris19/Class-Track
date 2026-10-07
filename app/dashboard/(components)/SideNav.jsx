"use client"
import React from 'react'
import Image from 'next/image'
import { GraduationCapIcon, LayoutIcon, Hand, SettingsIcon } from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const SideNav = () => {

    const { user } = useUser();

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
                width={150}
                height={50}
            />

            <hr className="my-5" />

            {/* Navigation Items  */}
            {
                navItems.map(item => {
                    return (
                        <div key={item.id} className="flex items-center gap-3 p-4 text-slate-500 hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg">
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </div>
                    )
                })
            }

            <div className="flex items-center gap-3">
                <UserButton />
                <span className="text-sm text-slate-500">{user?.firstName} {user?.lastName}</span>
            </div>

        </div>
    )
}

export default SideNav

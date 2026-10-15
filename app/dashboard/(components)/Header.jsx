"use client"
import React from 'react'
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Header = () => {

    const { user } = useUser();

    return (
        <div className="flex justify-between p-4 shadow-sm border">

            <div>

            </div>

            <div>
                <UserButton />
            </div>

        </div>
    )
}

export default Header

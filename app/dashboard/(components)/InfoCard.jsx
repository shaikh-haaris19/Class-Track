import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const InfoCard = ({ icon, title, value }) => {
    return (
        <Card className="bg-sky-100 mb-8 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    <span className="p-2 w-10 h-10 rounded-full bg-white text-blue-800">{icon}</span>
                    <p className="font-bold text-lg">{title} : <b>{value}</b></p>
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export default InfoCard

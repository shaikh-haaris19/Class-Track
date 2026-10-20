"use client"
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDays } from 'lucide-react'
import { addMonths } from "date-fns";
import moment from 'moment';
import { Button } from '../../../../components/ui/button';
import { Calendar } from "@/components/ui/calendar"

const MonthSelection = ({ selectedMonth }) => {

    const currMonth = addMonths(new Date(), 0);

    const [month, setMonth] = useState(currMonth);

    return (
        <div>

            <Popover>

                <PopoverTrigger render={
                    <Button variant="outline"
                        className="flex gap-2 items-center text-slate-500"
                        size="lg"
                    >
                        <CalendarDays className="h-5 w-5" />
                        {moment(month).format("MMM YYYY")}
                    </Button>
                }>
                    Open Popover
                </PopoverTrigger>

                <PopoverContent>
                    <PopoverHeader>
                        <PopoverTitle>Title</PopoverTitle>

                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={(value) => { selectedMonth(value); setMonth(value) }}
                            className="flex flex-1 justify-center"
                        />

                    </PopoverHeader>
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default MonthSelection

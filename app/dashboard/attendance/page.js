"use client"
import React, { useState } from 'react'
import MonthSelection from '@/app/dashboard/(components)/MonthSelection'
import GradeSelect from '../(components)/GradeSelect'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import axios from 'axios'
import { toast } from '@/components/ui/toast'
import AttendanceGrid from './(components)/AttendanceGrid'

const Attendance = () => {

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedGrade, setSelectedGrade] = useState();
    const [attendanceData, setAttendanceData] = useState([]);

    const onSearchHandler = async () => {

        try {

            const month = moment(selectedMonth).format("MM/YYYY");

            const response = await axios.get(`/api/attendance?grade=${selectedGrade}&month=${month}`);

            toast.add({
                title: "Attendance Data Fetched Successfully",
                variant: "success"
            })
            setAttendanceData(response.data);   

        } catch (error) {

            console.error("Error fetching attendance data:", error);
            toast.add({
                title: "Error Fetching Attendance Data",
                variant: "destructive"
            })

        }

    }

    return (
        <div className="p-6">

            <h2 className="text-4xl font-bold">Attendance</h2>

            {/* Search Options */}
            <div className="flex gap-5 border rounded-lg p-5 my-5 shadow-sm">

                <div className="flex gap-2 items-center">
                    <label>Select Month : </label>
                    <MonthSelection selectedMonth={(month) => setSelectedMonth(month)} />
                </div>

                <div className="flex gap-2 items-center">
                    <label>Select Grade : </label>
                    <GradeSelect selectedGrade={(grade) => setSelectedGrade(grade)} />
                </div>

                <Button onClick={() => onSearchHandler()} size="lg">Search</Button>

            </div>


            {/* Student Attendace Table */}
            <AttendanceGrid attendanceData={attendanceData} selectedMonth={selectedMonth} />

        </div>
    )
}

export default Attendance

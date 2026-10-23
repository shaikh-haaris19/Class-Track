"use client"
import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUniqueRecords } from './GetUniqueRecords';

const BarChartComponent = ({ attendanceData, totalPresentCountByDate }) => {

    const [barChartData, setBarChartData] = useState([]);

    const formatAttendanceData = () => {

        const totalStudents = getUniqueRecords(attendanceData).length;

        const result = totalPresentCountByDate.map(item => ({

            day: item.day,
            presentCount: item.presentCount,
            absentCount: totalStudents - item.presentCount

        }))

        setBarChartData(result)

    }

    useEffect(() => {

        if (attendanceData.length > 0 && totalPresentCountByDate.length > 0) {
            formatAttendanceData();
        }

    }, [attendanceData, totalPresentCountByDate]);

    return (
        <div className="p-5 border rounded-lg shadow-sm">

            <ResponsiveContainer width="100%" height="300">
                <BarChart
                    data={barChartData}
                >
                    <CartesianGrid />
                    <XAxis dataKey="day" />
                    <YAxis width="auto" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" name="Present" fill="#8884d8" />
                    <Bar dataKey="absentCount" name="Absent" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default BarChartComponent;

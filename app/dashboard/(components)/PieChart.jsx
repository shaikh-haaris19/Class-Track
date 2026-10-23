"use client"
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts';
import { getUniqueRecords } from './GetUniqueRecords';
import moment from 'moment';

const PieChartComponents = ({ attendanceData }) => {

    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {

        const uniqueStudents = getUniqueRecords(attendanceData);

        const today = moment().format('D');

        const presentStudents = attendanceData.filter(record => record.present === true).length;

        const totalPresentPercentage = (presentStudents / (uniqueStudents.length * Number(today))) * 100;
        setPieChartData([
            { name: 'present', value: Number(totalPresentPercentage.toFixed(1)), fill: '#8884d8' },
            { name: 'absent', value: 100 - Number(totalPresentPercentage.toFixed(1)), fill: '#82ca9d' },
        ]);

    }, [attendanceData]);

    return (
        <div className="p-5 border rounded-lg shadow-sm">

            <ResponsiveContainer width="100%" height="300">
                <PieChart>
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="50%"
                        stroke="white"
                    />
                    <Tooltip defaultIndex={0} />
                </PieChart>
            </ResponsiveContainer>

        </div>
    )
}

export default PieChartComponents

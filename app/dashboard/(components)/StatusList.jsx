import React, { useState, useEffect } from 'react'
import { getUniqueRecords } from './GetUniqueRecords';
import moment from 'moment';
import InfoCard from './InfoCard';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

const StatusList = ({ attendanceData }) => {

    console.log(attendanceData);

    const [totalStudents, setTotalStudents] = useState(0);
    const [presentCount, setPresentCount] = useState(0);
    const [presentPercentage, setPresentPercentage] = useState(0);

    useEffect(() => {

        const uniqueStudents = getUniqueRecords(attendanceData);
        setTotalStudents(uniqueStudents.length);

        const today = moment().format('D');

        const presentStudents = attendanceData.filter(record => record.present === true).length;
        setPresentCount(presentStudents);

        const totalPresentPercentage = (presentCount / (uniqueStudents.length * Number(today))) * 100;
        setPresentPercentage(totalPresentPercentage);

    }, [attendanceData]);

    return (
        <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                <InfoCard icon={<GraduationCap />} title="Total Students" value={totalStudents} />
                <InfoCard icon={<TrendingUp />} title="Total Present" value={presentPercentage.toFixed(2) + '%'} />
                <InfoCard icon={<TrendingDown />} title="Total Absent" value={`${100 - presentPercentage.toFixed(2)}%`} />
            </div>

        </div>
    )
}

export default StatusList

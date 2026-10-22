import React, { useState, useEffect } from 'react'
import { getUniqueRecords } from './GetUniqueRecords';

const StatusList = ({ attendanceData }) => {

    console.log(attendanceData);

    const [totalStudents, setTotalStudents] = useState(0);
    const [presentCount, setPresentCount] = useState(0);

    useEffect(() => {

        const uniqueStudents = getUniqueRecords(attendanceData);
        setTotalStudents(uniqueStudents.length);

    }, [attendanceData]);

    return (
        <div>

        </div>
    )
}

export default StatusList

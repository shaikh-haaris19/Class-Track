"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import moment from 'moment';

const AttendanceGrid = ({ attendanceData, selectedMonth }) => {
    
    // GETS THE NUMBER OF DAYS IN THE SELECTED MONTH IN ARRAY
    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const numberOfDays = daysInMonth(moment(selectedMonth).format("YYYY"), moment(selectedMonth).format("MM"));
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);


    // ROWS AND COLUMNS FOR AG-GRID
    const [rowData, setRowData] = useState([]);
    
    const [colDefs, setColDefs] = useState([
        { field: "studentId" },
        { field: "name" }
    ]);

    const getUniqueRecords = () => {

        const uniqueRecords = [];
        const uniqueRecordsSet = new Set();

        attendanceData.forEach(record => {

            if (!uniqueRecordsSet.has(record.studentId)) {
                uniqueRecordsSet.add(record.studentId);
                uniqueRecords.push(record);
            }
        });

        return uniqueRecords;
    }


    useEffect(() => {

        const uniqueRecords = getUniqueRecords();
        setRowData(uniqueRecords);

        daysArray.forEach(date => {

            setColDefs(prevColDefs => [
                ...prevColDefs,
                {
                    field: date.toString(),
                    width: 50,
                    editable: true,
                }
            ]);

        });

    }, [attendanceData]);

    return (
        <div className="w-full h-125 my-6">

            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={themeQuartz}
            />

        </div>
    )
}

export default AttendanceGrid

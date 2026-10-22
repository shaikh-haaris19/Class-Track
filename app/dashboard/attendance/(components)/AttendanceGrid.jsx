"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import moment from 'moment';
import axios from 'axios';
import { toast } from '@/components/ui/toast';

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

    const MarkAttendance = async (day, studentId, presentStatus) => {

        try {

            const formattedDate = moment(selectedMonth).format("MM/YYYY");
            const studentData = {
                studentId,
                present: presentStatus,
                day,
                date: formattedDate
            }

            if (presentStatus) {

                const response = await axios.post('/api/attendance', studentData);

                toast.add({
                    title: `Attendance Updated Successfully for Student ID: ${studentId} on Day: ${day}`,
                    variant: "success"
                })

            } else {

                // DELETE REQUEST TAKES THE 'studentData' IN {data: studentData} FORMAT
                const response = await axios.delete('/api/attendance', {
                    data: studentData
                });

                toast.add({
                    title: `Attendance Removed Successfully for Student ID: ${studentId} on Day: ${day}`,
                    variant: "success"
                })

            }

        } catch (error) {

            console.error("Error updating attendance data:", error);
            toast.add({
                title: "Error Updating Attendance Data! Please try again.",
                variant: "destructive"
            })

        }

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

            uniqueRecords.forEach(record => {
                record[date] = isPresent(record.studentId, date);
            })

        });

    }, [attendanceData]);

    const isPresent = (studentId, date) => {
        const record = attendanceData.find(record => record.studentId === studentId && date === record.day);
        return record ? true : false;
    }

    return (
        <div className="w-full h-125 my-6">

            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={themeQuartz}
                onCellValueChanged={(e) => {
                    MarkAttendance(e.colDef.field, e.data.studentId, e.newValue);
                }}
            />

        </div>
    )
}

export default AttendanceGrid

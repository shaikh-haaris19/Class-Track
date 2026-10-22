"use client"
import React, { useState, useEffect } from 'react'
import GradeSelect from './(components)/GradeSelect';
import MonthSelection from './(components)/MonthSelection';
import axios from 'axios';
import moment from 'moment';
import { toast } from '@/components/ui/toast';
import StatusList from './(components)/StatusList';

const Dashboard = () => {

  const [month, setMonth] = useState(null);
  const [grade, setGrade] = useState(null);

  const [attendanceData, setAttendanceData] = useState([]);


  // GETS STUDENTS ATTENDANCE DATA BASED ON SELECTED GRADE AND MONTH
  const getStudentsAttendance = async () => {

    try {

      const formattedMonth = moment(month).format("MM/YYYY");
      const response = await axios.get(`/api/attendance?grade=${grade}&month=${formattedMonth}`);

      setAttendanceData(response.data);

    } catch (error) {

      console.error("Error fetching attendance data:", error);
      toast.add({
        title: "Failed to fetch attendance data.",
        variant: "destructive"
      })

    }

  }

  useEffect(() => {

    getStudentsAttendance();

  }, [month, grade]);

  return (
    <div className="p-10">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">Welcome to the Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={(month) => setMonth(month)} />
          <GradeSelect selectedGrade={(grade) => setGrade(grade)} />
        </div>

      </div>

      <StatusList attendanceData={attendanceData} />

    </div>
  )
}

export default Dashboard

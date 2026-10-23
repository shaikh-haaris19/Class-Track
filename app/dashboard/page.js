"use client"
import React, { useState, useEffect } from 'react'
import GradeSelect from './(components)/GradeSelect';
import MonthSelection from './(components)/MonthSelection';
import axios from 'axios';
import moment from 'moment';
import { toast } from '@/components/ui/toast';
import StatusList from './(components)/StatusList';
import BarChart from './(components)/BarChart';
import PieChartComponents from './(components)/PieChart';

const Dashboard = () => {

  const [month, setMonth] = useState(new Date());
  const [grade, setGrade] = useState("10th");

  const [attendanceData, setAttendanceData] = useState([]);
  const [totalPresentCountByDate, setTotalPresentCountByDate] = useState(0);


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

  // GETS {days, presentCount} FOR CHARTS BASED ON SELECTED GRADE AND MONTH
  const getTotalPresentCountByDate = async () => {

    try {

      const formattedMonth = moment(month).format("MM/YYYY");
      const response = await axios.get(`/api/dashboard?grade=${grade}&date=${formattedMonth}`);

      setTotalPresentCountByDate(response.data);

    } catch (error) {

      console.error("Error fetching total present count by date:", error);
      toast.add({
        title: "Failed to fetch total present count by date.",
        variant: "destructive"
      })

    }

  }

  useEffect(() => {

    getStudentsAttendance();
    getTotalPresentCountByDate();

  }, [month, grade]);

  return (
    <div className="p-10">

      <div className="flex items-center justify-between">

        {/* MONTH & GRADE SELECTION */}
        <h2 className="text-3xl font-bold">Welcome to the Dashboard</h2>
        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={(month) => setMonth(month)} />
          <GradeSelect selectedGrade={(grade) => setGrade(grade)} />
        </div>

      </div>

      {/* STATUS OF STUDENTS (MONTHLY OVERVIEW) */}
      <StatusList attendanceData={attendanceData} />

      {/* BAR CHART & PIE CHART */}
      <h2 className="my-4 font-bold text-3xl">Monthly Attendance Overview : </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="md:col-span-2">
          <BarChart attendanceData={attendanceData} totalPresentCountByDate={totalPresentCountByDate} />
        </div>

        <div className="md:col-span-1">
          <PieChartComponents attendanceData={attendanceData} />
        </div>

      </div>

    </div>
  )
}

export default Dashboard

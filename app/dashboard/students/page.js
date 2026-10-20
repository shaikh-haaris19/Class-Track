"use client"
import React, { useState, useEffect } from 'react'
import AddNewStudent from './(components)/AddNewStudent'
import axios from 'axios'
import { toast } from "@/components/ui/toast"
import StudentsListTable from './(components)/StudentsListTable'

const Student = () => {

  const [students, setStudents] = useState([]);

  const getAllStudents = async () => {

    try {

      const response = await axios.get('/api/students');
      setStudents(response.data);

    } catch (error) {

      console.error("Error fetching students:", error);
      toast.add({
        type: "error",
        description: "Failed to fetch students. Please try again.",
        priority: "high"
      })

    }

  }

  useEffect(() => {
    getAllStudents();
  }, [])

  return (
    <div className="p-7">

      <h2 className="text-4xl font-bold flex justify-between items-center">Student
        <AddNewStudent refreshData={getAllStudents} />
      </h2>

      <StudentsListTable studentsList={students} refreshData={getAllStudents} />

    </div>
  )
}

export default Student

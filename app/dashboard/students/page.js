"use client"
import React from 'react'
import AddNewStudent from './(components)/AddNewStudent'

const Student = () => {
  return (
    <div className="p-7">
      <h2 className="text-4xl font-bold flex justify-between items-center">Student
        <AddNewStudent />
      </h2>
    </div>
  )
}

export default Student

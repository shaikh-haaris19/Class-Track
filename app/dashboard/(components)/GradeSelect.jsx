"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const GradeSelect = ({ selectedGrade }) => {

    const [gradesList, setGradesList] = useState([]);

    const getAllGradesList = async () => {

        try {

            const response = await axios.get('/api/getAllGrades');
            setGradesList(response.data);

        } catch (error) {
            console.error("Error fetching grades:", error);
        }

    }

    useEffect(() => {
        getAllGradesList();
    }, []);

    return (
        <div>
            <select 
            onChange={(e) => selectedGrade(e.target.value)}
            className="p-2 border rounded-lg">
                {
                    gradesList.map((grade) => (
                        <option key={grade._id} value={grade.grade}>{grade.grade}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default GradeSelect

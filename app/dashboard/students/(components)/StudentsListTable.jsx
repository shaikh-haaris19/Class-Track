import React, { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentsListTable = ({ studentsList }) => {

    const CustomButton = () => {
        return <Button variant="destructive" size='sm'><Trash /></Button>
    };

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "studentName", filter: true },
        { field: "studentGrade", filter: true },
        { field: "studentAddress", filter: true },
        { field: "contactNumber", filter: true },
        { field: "action", cellRenderer: CustomButton },
    ]);

    const [rowData, setRowData] = useState([]);

    useEffect(() => {

        if (studentsList && studentsList.length > 0) {
            setRowData(studentsList);
        }

    }, [studentsList]);

    return (
        <div className="w-full h-125">
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={themeQuartz}
            />
        </div>  
    )
}

export default StudentsListTable

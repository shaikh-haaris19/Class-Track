import React, { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import axios from 'axios';
import { toast } from "@/components/ui/toast"

const StudentsListTable = ({ studentsList, refreshData }) => {

    const [userSearchInput, setUserSearchInput] = useState("");
    const [loading, setLoading] = useState(false);

    const CustomButton = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" size='sm'><Trash /></Button>} />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            Record from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { deleteRecord(props.data.id) }} disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        )
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

    const deleteRecord = async (id) => {

        setLoading(true);

        try {

            const response = await axios.delete(`/api/students?id=${id}`);

            refreshData();
            toast.add({
                type: "success",
                description: response.data.message,
                priority: "high"
            });

        } catch (error) {

            console.error("Error deleting student:", error);
            toast.add({
                type: "error",
                description: "Failed to delete student.",
                priority: "high"
            });

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        if (studentsList && studentsList.length > 0) {
            setRowData(studentsList);
        }

    }, [studentsList]);

    return (
        <div className="w-full h-125 my-6">

            <Card className="mb-8 max-w-sm shadow-sm">
                <CardHeader>
                    <CardTitle>Total Number of Students : <b>{rowData.length}</b></CardTitle>
                </CardHeader>
            </Card>

            <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
                <Search />
                <input type="text" placeholder="Search Anything Here..." className="outline-none w-full" value={userSearchInput} onChange={(e) => setUserSearchInput(e.target.value)} />
            </div>



            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme={themeQuartz}
                pagination={10}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 100]}
                quickFilterText={userSearchInput}
            />
        </div>
    )
}

export default StudentsListTable

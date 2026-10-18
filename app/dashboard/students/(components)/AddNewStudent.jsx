"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { toast } from "@/components/ui/toast"
import { Loader2 } from "lucide-react"

const AddNewStudent = () => {

    const [open, setOpen] = useState(false);
    const [gradesList, setGradesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const getAllGradesList = async () => {

        try {

            const response = await axios.get('/api/getAllGrades');
            setGradesList(response.data);

        } catch (error) {
            console.error("Error fetching grades:", error);
        }

    }

    const onSubmit = async (data) => {

        setLoading(true);

        try {

            const response = await axios.post('/api/students', data);

            toast.add({
                type: "success",
                title: "Success",
                description: "Student has been added successfully.",
            })

            reset();
            setOpen(false);

        } catch (error) {
            console.error("Error adding student:", error);
            toast.add({
                type: "error",
                description: "Failed to add student. Please try again.",
                priority: "high",
            })

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getAllGradesList();
    }, []);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <DialogHeader>
                            <DialogTitle className={'text-center text-2xl font-bold my-2'}>Add New Student</DialogTitle>

                            <DialogDescription>
                                Enter the student's details below.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="py-2">
                            <Label htmlFor="studentName" className={'py-1'}>Full Name</Label>
                            <Input {...register("studentName", { required: true })} id="studentName" name="studentName" placeholder="Example: John Doe" />
                            {errors.studentName && <span>This field is required</span>}
                        </div>

                        <div className="py-2 flex flex-col">
                            <Label htmlFor="studentGrade" className={'py-1'}>Select Grade</Label>
                            <select {...register("studentGrade", { required: true })} className="p-2 border rounded-lg">
                                {
                                    gradesList.map((grade) => (
                                        <option key={grade._id} value={grade.grade}>{grade.grade}</option>
                                    ))
                                }
                            </select>
                            {errors.studentGrade && <span>This field is required</span>}
                        </div>

                        <div className="py-2">
                            <Label htmlFor="contactNumber" className={'py-1'}>Contact Number</Label>
                            <Input type="number" {...register("contactNumber", { required: true })} id="contactNumber" name="contactNumber" placeholder="Example: 123-456-7890" />
                            {errors.contactNumber && <span>This field is required</span>}
                        </div>

                        <div className="py-2">
                            <Label htmlFor="studentAddress" className={'py-1'}>Address</Label>
                            <Textarea {...register("studentAddress", { required: true })} id="studentAddress" name="studentAddress" placeholder="Example: 123 Main St, City, State 12345" />
                            {errors.studentAddress && <span>This field is required</span>}
                        </div>

                        <DialogFooter>
                            <Button type="button" onClick={() => setOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-md px-6" variant="outline">Cancel</Button>
                            <Button onClick={() => console.log("Save changes")} className="bg-black hover:bg-gray-800 text-white text-md px-6" type="submit" disabled={loading}>
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
                            </Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewStudent

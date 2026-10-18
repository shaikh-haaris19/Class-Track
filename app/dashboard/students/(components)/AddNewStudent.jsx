"use client"
import React from 'react'
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

const AddNewStudent = () => {

    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <DialogHeader>
                            <DialogTitle className={'text-center text-2xl font-bold my-2'}>Add New Student</DialogTitle>
                        </DialogHeader>

                        <DialogDescription>


                            <div className="py-2">
                                <Label htmlFor="studentName" className={'py-1'}>Full Name</Label>
                                <Input {...register("studentName", { required: true })} id="studentName" name="studentName" placeholder="Example: John Doe" />
                                {errors.studentName && <span>This field is required</span>}
                            </div>

                            <div className="py-2 flex flex-col">
                                <Label htmlFor="studentGrade" className={'py-1'}>Select Grade</Label>
                                <select {...register("studentGrade", { required: true })} className="p-2 border rounded-lg">
                                    <option value="10th">10th</option>
                                    <option value="11th">11th</option>
                                    <option value="12th">12th</option>
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


                        </DialogDescription>

                        <DialogFooter>
                            <Button onClick={() => setOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-md px-6" variant="outline">Cancel</Button>
                            <Button onClick={() => console.log("Save changes")} className="bg-black hover:bg-gray-800 text-white text-md px-6" type="submit">Save changes</Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewStudent

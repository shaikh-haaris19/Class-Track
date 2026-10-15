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
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

const AddNewStudent = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>

                    <DialogDescription>
                        <div className="py-2">
                            <Label htmlFor="username-1">Full Name</Label>
                            <Input id="username-1" name="username" placeholder="Example: John Doe" />
                        </div>
                        <div className="py-2">
                            <Label htmlFor="username-1">Select Grade</Label>
                            <select>
                                <option value="10th">10th</option>
                                <option value="11th">11th</option>
                                <option value="12th">12th</option>
                            </select>
                        </div>
                        <div className="py-2">
                            <Label htmlFor="username-1">Contact Number</Label>
                            <Input id="username-1" name="username" placeholder="Example: 123-456-7890" />
                        </div>
                        <div className="py-2">
                            <Label htmlFor="username-1">Address</Label>
                            <Textarea id="username-1" name="username" placeholder="Example: 123 Main St, City, State 12345" />
                        </div>
                    </DialogDescription>

                    <DialogFooter>
                        <Button onClick={() => setOpen(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-md px-6" variant="outline">Cancel</Button>
                        <Button onClick={() => console.log("Save changes")} className="bg-black hover:bg-gray-800 text-white text-md px-6" type="submit">Save changes</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewStudent

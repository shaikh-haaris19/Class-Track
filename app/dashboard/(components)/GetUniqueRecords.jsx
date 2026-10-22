


//GET UNIQUE RECORDS FROM ATTENDANCE DATA BASED ON STUDENT ID
export const getUniqueRecords = (attendanceData) => {

    const uniqueRecords = [];
    const uniqueRecordsSet = new Set();

    attendanceData.forEach(record => {

        if (!uniqueRecordsSet.has(record.studentId)) {
            uniqueRecordsSet.add(record.studentId);
            uniqueRecords.push(record);
        }
    });

    return uniqueRecords;
}
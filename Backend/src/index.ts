import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from 'cors'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { authenticatedUser } from "./middlware";



require('dotenv').config();

const app = express();




app.use(express.json())


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions))


const client = new PrismaClient();



app.post('/api/v1/register', async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);


        await client.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        console.log("user created" + name)

        res.status(201).json({
            messsage: "User registered Successfully",
            sucess: true
        })
        console.log("user registered")

    } catch (err) {
        res.status(404).json({ message: `error occured in:${err as Error}.message` })
        console.log((err as Error).message)
    }





});
// @ts-ignore
app.post("/api/v1/login", async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user = await client.user.findUnique({

            where: {
                email: email
            }

        })
        // @ts-ignore
        const isMatch = await bcrypt.compare(password, user?.password);

        if (!isMatch || !user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        console.log(process.env.JWT_SECRET)

        return res.status(200).json({ message: "Login Successfully", token: token })




    } catch (error) {
        return res.status(500).json({ message: "error occurred while" + ((error) as Error).message })
    }


})
// @ts-ignore
app.post('/api/v1/schedules', authenticatedUser, async (req: Request, res: Response) => {
    try {
        const { subject, day, time } = req.body;  // @ts-ignore
        const userId = req.user.id;
        console.log(userId)

        const schedule = await client.schedule.create({
            data: {
                subject: subject,
                day: day,
                time: time,
                userId: userId
            }
        })

        return res.status(201).json({ message: "Schedule created Successfully", schedule: schedule })



    } catch (error) {
        return res.status(500).json({ message: "error occurred while creating schedule" + ((error) as Error).message })
    }
})
// @ts-ignore
app.get("/api/v1/userInfo", authenticatedUser, async (req, res) => {

    try {
        const userId = req.user?.id;

        const user = await client.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,

            }
        })

        return res.status(200).json({ message: "User information", user: user })

    } catch (err) {
        return res.status(404).json({ message: "error occurred while getting user information" + ((err) as Error).message })
    }




})
// @ts-ignore
app.get("/api/v1/scheduleInfo", authenticatedUser, async (req, res) => {

    try {
        const userId = req.user?.id;
        const schedules = await client.schedule.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                subject: true,
                day: true,
                time: true
            }

        })
        return res.status(200).json({ message: "Schedule information", schedules: schedules })
    } catch (error) {
        return res.status(404).json({ messages: "Some error occurred" })
    }

})
// @ts-ignore
app.post("/api/v1/updateSchedules", authenticatedUser, async (req, res) => {
    try {
        const userId = req.user?.id;
        const { scheduleId, subject, day, time } = req.body;
        console.log(scheduleId)

        if (!scheduleId || !subject || !day || !time) {
            return res.status(404).json({ message: "All fields are required." });
        }
        const subjectId = parseInt(scheduleId, 10)

        const updatedSchedule = await client.schedule.update({
            where: {
                id: subjectId,
                userId: userId
            },
            data: {
                subject: subject,
                day: day,
                time: time
            }
        })
        return res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    } catch (error) {
        return res.status(404).json({ message: "Error occurred while :" + ((error) as Error).message })
    }
})
// @ts-ignore
app.post("/api/v1/deleteScheduleforSubject", authenticatedUser, async (req, res) => {
    try {
        const userId = req.user?.id
        const { scheduleId } = req.body;
        if (!scheduleId) {
            return res.status(404).json({ message: "Invalid id" })
        }

        await client.schedule.delete({
            where: {
                id: parseInt(scheduleId, 10),
                userId: userId
            }
        })
        return res.status(201).json({ message: "Schedule deleted successfully" })

    } catch (error) {
        return res.status(404).json({ message: "Error occurred while :" + ((error) as Error).message })
    }
})

// @ts-ignore
app.post("/api/v1/markAttendance", authenticatedUser, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (userId === undefined) {
            throw new Error("User ID is required");
        }
        const { scheduleId, date, status } = req.body;
        if (!scheduleId || !date || typeof status != "boolean") {
            return res.status(404).json({ message: "All fields are required." });
        }

        // check if the schedule is there or not
        const schedule = await client.schedule.findFirst({
            where: {
                id: parseInt(scheduleId, 10),
                userId: userId,

            }
        })
        if (!schedule) {
            return res.status(404).json({ mesage: "Schedule not created yet!!" })
        }
        const atttendanceDate = new Date(date)
        //function to convert date into day

        const daysofweek = atttendanceDate.toLocaleString("en-US", { weekday: "long" });
        console.log(daysofweek)
        if (schedule.day != daysofweek) {
            return res.status(404).json({ message: "Schedule not scheduled for this day!!" })
        }
        // check if the attendance is already marked or not
        const existingAttendance = await client.attendance.findFirst({
            where: {
                scheduleId: parseInt(scheduleId, 10),
                userId: userId,
                date: atttendanceDate,

            }
        })

        if (existingAttendance) {
            return res.status(404).json({ mesage: "Attendance already marked for this date!!" })
        }

        const attendance = await client.attendance.create({
            data: {
                scheduleId: parseInt(scheduleId, 10),
                userId: userId,
                date: atttendanceDate,
                status: status
            }
        })
        return res.status(201).json({ message: "Attendance marked successfully", attendance: attendance })





    } catch (err) {
        return res.status(404).json({ message: "Error occurred while :" + ((err) as Error).message })
    }
})
// @ts-ignore
app.get('/api/v1/getAttendance', authenticatedUser, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new Error("User ID is required");
        }
        const { scheduleId } = req.query;
        if (!scheduleId) {
            return res.status(404).json({ message: "All fields are required." });
        }
        const filter :any = {
            userId:userId
        }
        //adding new object to filter
        if(scheduleId){
           filter.scheduleId = parseInt(scheduleId as string,10)
        }
     
        // using filter in query
        const attendanceRecords = await client.attendance.findMany({
            where:filter,
            include:{
                schedule:true
            }
        })
        return res.status(200).json({message:"Attendance fetched successfully",attendanceRecords})



    }catch(err){
        return res.status(404).json({ message: "Error occurred while :" + ((err) as Error).message })
    }
})





console.log("hello")



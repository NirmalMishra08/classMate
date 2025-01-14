"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlware_1 = require("./middlware");
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
const client = new client_1.PrismaClient();
app.post('/api/v1/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield client.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        console.log("user created" + name);
        res.status(201).json({
            messsage: "User registered Successfully",
            sucess: true
        });
        console.log("user registered");
    }
    catch (err) {
        res.status(404).json({ message: `error occured in:${err}.message` });
        console.log(err.message);
    }
}));
// @ts-ignore
app.post("/api/v1/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield client.user.findUnique({
            where: {
                email: email
            }
        });
        // @ts-ignore
        const isMatch = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatch || !user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login Successfully", token: token });
    }
    catch (error) {
        return res.status(500).json({ message: "error occurred while" + (error).message });
    }
}));
// @ts-ignore
app.post('/api/v1/schedules', middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, day, time } = req.body; // @ts-ignore
        const userId = req.user.id;
        console.log(userId);
        const schedule = yield client.schedule.create({
            data: {
                subject: subject,
                day: day,
                time: time,
                userId: userId
            }
        });
        return res.status(201).json({ message: "Schedule created Successfully", schedule: schedule, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "error occurred while creating schedule" + (error).message });
    }
}));
// @ts-ignore
app.get("/api/v1/userInfo", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield client.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        return res.status(200).json({ message: "User information", user: user });
    }
    catch (err) {
        return res.status(404).json({ message: "error occurred while getting user information" + (err).message });
    }
}));
// @ts-ignore
app.get("/api/v1/scheduleInfo", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const schedules = yield client.schedule.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                subject: true,
                day: true,
                time: true
            }
        });
        return res.status(200).json({ message: "Schedule information", schedules: schedules });
    }
    catch (error) {
        return res.status(404).json({ messages: "Some error occurred" });
    }
}));
// @ts-ignore
app.post("/api/v1/updateSchedules", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { scheduleId, subject, day, time } = req.body;
        console.log(scheduleId);
        if (!scheduleId || !subject || !day || !time) {
            return res.status(404).json({ message: "All fields are required." });
        }
        const subjectId = parseInt(scheduleId, 10);
        const updatedSchedule = yield client.schedule.update({
            where: {
                id: subjectId,
                userId: userId
            },
            data: {
                subject: subject,
                day: day,
                time: time
            }
        });
        return res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
    }
    catch (error) {
        return res.status(404).json({ message: "Error occurred while :" + (error).message });
    }
}));
// @ts-ignore
app.post("/api/v1/deleteScheduleforSubject", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { scheduleId } = req.body;
        if (!scheduleId) {
            return res.status(404).json({ message: "Invalid id" });
        }
        yield client.schedule.delete({
            where: {
                id: parseInt(scheduleId, 10),
                userId: userId
            }
        });
        return res.status(201).json({ message: "Schedule deleted successfully" });
    }
    catch (error) {
        return res.status(404).json({ message: "Error occurred while :" + (error).message });
    }
}));
// Marking attendance
// @ts-ignore
app.post("/api/v1/markAttendance", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (userId === undefined) {
            throw new Error("User ID is required");
        }
        const { scheduleId, date, status } = req.body;
        if (!scheduleId || !date || typeof status != "boolean") {
            return res.status(404).json({ message: "All fields are required." });
        }
        // check if the schedule is there or not
        const schedule = yield client.schedule.findFirst({
            where: {
                id: parseInt(scheduleId, 10),
                userId: userId,
            }
        });
        if (!schedule) {
            return res.status(404).json({ mesage: "Schedule not created yet!!" });
        }
        const atttendanceDate = new Date(date);
        //function to convert date into day
        const daysofweek = atttendanceDate.toLocaleString("en-US", { weekday: "long" });
        console.log(daysofweek);
        if (schedule.day != daysofweek) {
            return res.status(404).json({ message: "Schedule not scheduled for this day!!" });
        }
        // check if the attendance is already marked or not
        const existingAttendance = yield client.attendance.findFirst({
            where: {
                scheduleId: parseInt(scheduleId, 10),
                userId: userId,
                date: atttendanceDate,
            }
        });
        if (existingAttendance) {
            return res.status(404).json({ mesage: "Attendance already marked for this date!!" });
        }
        const attendance = yield client.attendance.create({
            data: {
                scheduleId: parseInt(scheduleId, 10),
                userId: userId,
                date: atttendanceDate,
                status: status
            }
        });
        return res.status(201).json({ message: "Attendance marked successfully", attendance: attendance });
    }
    catch (err) {
        return res.status(404).json({ message: "Error occurred while :" + (err).message });
    }
}));
// getting attendance of that day
// @ts-ignore
app.get('/api/v1/getAttendance', middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            throw new Error("User ID is required");
        }
        const { scheduleId } = req.query;
        if (!scheduleId) {
            return res.status(404).json({ message: "All fields are required." });
        }
        const filter = {
            userId: userId
        };
        //adding new object to filter
        if (scheduleId) {
            filter.scheduleId = parseInt(scheduleId, 10);
        }
        // using filter in query
        const attendanceRecords = yield client.attendance.findMany({
            where: filter,
            include: {
                schedule: true
            }
        });
        return res.status(200).json({ message: "Attendance fetched successfully", attendanceRecords });
    }
    catch (err) {
        return res.status(404).json({ message: "Error occurred while :" + (err).message });
    }
}));
// update attendance
// @ts-ignore
app.post("/api/v1/updateAttendance", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const { attendanceId, date, status } = req.body;
        if (!attendanceId || !date || typeof status != "boolean") {
            return res.status(404).json({ message: "All fields are required." });
        }
        const updateAttendance = yield client.attendance.update({
            where: {
                id: attendanceId
            },
            data: Object.assign(Object.assign({}, (date && { date: new Date(date) })), (status !== undefined && { status }))
        });
        if (!updateAttendance) {
            return res.status(404).json({ message: "Attendance not found." });
        }
        return res.status(200).json({ message: "Attendance updated successfully", updatedAttendance: updateAttendance });
    }
    catch (error) {
        return res.status(404).json({ message: "an error occurred while updating" + error });
    }
}));
// @ts-ignore
app.post("/api/v1/attendanceSummary", middlware_1.authenticatedUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const attendance = yield client.attendance.findMany({
            where: {
                userId: userId
            }
        });
        const totalClass = attendance.length;
        const attendedClass = attendance.filter(a => a.status).length;
        const attendedClassPercentage = (attendedClass / totalClass) * 100;
        res.status(200).json({
            message: "Attendance summary fetched successfully",
            totalClass,
            attendedClass,
            attendedClassPercentage: attendedClassPercentage.toFixed(2),
        });
    }
    catch (error) {
        return res.status(404).json({ message: { error: (error).message } });
    }
}));
console.log("hello");

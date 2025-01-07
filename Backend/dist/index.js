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
console.log("hello");

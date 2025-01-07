import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from 'cors'
import bcrypt from "bcrypt"

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

    try{
        const hashedPassword =  await bcrypt.hash(password,10);


        await client.user.create({
            data: {
                name:name,
                email:email,
                password:hashedPassword
            }
        });
        console.log("user created"+ name)
    
        res.status(201).json({
            messsage:"User registered Successfully",
            sucess:true
        })
        console.log("user registered")

    }catch(err){
        res.status(404).json({message:`error occured in:${err as Error}.message`})
        console.log((err as Error).message)
    }
 
   

 

});

console.log("hello")



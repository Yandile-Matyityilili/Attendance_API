import express from "express"
import {config} from "dotenv"
config()
import cors from "cors"
import usersRouters from "./Routers/usersRouters.js"


//creating app
const app =express()
app.use(cors())
app.use(express.json())

app.use('/', usersRouters)

const PORT = 5000
app.listen(PORT, ()=>{
    console.log("http://localhost:"+PORT)
    console.log("I am running:👍...")
})
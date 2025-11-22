import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

dotenv.config();
// app config
const app = express()
const PORT = process.env.PORT || 4000

// Connect to database (CALL THE FUNCTION)
connectDB()


// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working")
});


app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`)
})
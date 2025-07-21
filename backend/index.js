import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";



dotenv.config({});

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // corrected origin
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


app.use("/api/vi/user",userRoute);    
app.use("/api/vi/company",companyRoute);   
app.use("/api/vi/job",jobRoute);   
app.use("/api/vi/application",applicationRoute);    





// we will create this Api

// "http://localhost:8000/api/vi/user/register"
// "http://localhost:8000/api/vi/user/login"
// "http://localhost:8000/api/vi/user/profile/update"



app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
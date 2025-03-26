import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createUserRoute } from "./profile_back.js";
import { getAllUsers, getUserByEmail } from "../js/profile_back.js"; 

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

app.post('/users', createUserRoute);

// API endpoints
app.get("/users", getAllUsers); // Fetch all users
app.get("/users/:email", getUserByEmail); // Fetch user by email

export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
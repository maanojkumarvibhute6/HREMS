import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import { errorMiddleware } from './middlewares/error.middleware.js';
import authRouter from "./routes/auth.routes.js";
import employeeRouter from "./routes/employees-list.routes.js";
import roleRouter from "./routes/roles.routes.js";
import departmentRouter from "./routes/department.routes.js";
import designationRouter from "./routes/designation.routes.js";


configDotenv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json(
    { limit: "10mb" }
));


// routes
// app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/role', roleRouter);
app.use('/api/department', departmentRouter);
app.use('/api/designation', designationRouter);

// Error Middleware 
app.use(errorMiddleware);

export default app;
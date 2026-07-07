import express from 'express';

import { EmployeeLogin } from '../controllers/auth.controller.js';


const authRouter = express.Router();

authRouter.post('/login', EmployeeLogin);


export default authRouter;
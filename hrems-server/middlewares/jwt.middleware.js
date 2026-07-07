import jwt from 'jsonwebtoken';
import employeeModel from '../models/employees-list.model.js';
import { MESSAGES } from '../constants/messages.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';


export const jwt_middleware = async (req, res, next) => {
    try {
        let token = '';

        // check header
        if (req.headers.authorization && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: {
                    status: MESSAGES.ERROR,
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.ACCESS_DENIED_UNAUTHORIZED_NOTOKEN,
                }
            });
        }

        // Token verification
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Check user exists or not with is active status
        const employeeExists = await employeeModel.findById(tokenDecode.id);
        if (!employeeExists || !employeeExists.isActive) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: {
                    status: MESSAGES.ERROR,
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.EMPLOYEE_NOT_FOUND_INACTIVE
                }
            });
        }

        req.user = employeeExists;
        next();



    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: {
                status: MESSAGES.ERROR,
                statusCode: HTTP_STATUS.UNAUTHORIZED,
                message: MESSAGES.TOKEN_INVALID_EXPIRED
            }
        });
    }
}
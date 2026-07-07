import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: {
                    status: MESSAGES.ERROR,
                    statusCode: HTTP_STATUS.UNAUTHORIZED,
                    message: MESSAGES.UNAUTHORIZED
                }
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                status: {
                    status: MESSAGES.ERROR,
                    statusCode: HTTP_STATUS.FORBIDDEN,
                    message: MESSAGES.ACCESS_DENIED
                }
            });
        }

        next();

    }
}
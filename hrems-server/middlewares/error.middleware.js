import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const errorMiddleware = (error, req, res, next) => {

    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        status: {
            status: MESSAGES.ERROR,
            statusCode: statusCode,
            message: error.customMessage || error.message || MESSAGES.INTERNAL_SERVER_ERROR
        },
        errorMessage: error.message || MESSAGES.INTERNAL_SERVER_ERROR
    });
}
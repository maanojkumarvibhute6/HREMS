import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { EmployeeLoginService } from "../services/auth.service.js";

export const EmployeeLogin = async (req, res, next) => {
    try {
        const user = await EmployeeLoginService(req);
        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.LOGIN_SUCCESS
            },
            data: user
        });

    } catch (error) {
        error.customMessage = MESSAGES.LOGIN_FAILED
        next(error);
    }
}
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { CURRENT_STATUS } from "../constants/status.constant.js";
import {
    createEmployeeService,
    employeeUpdateService,
    getAllEmployeesListService,
    getEmployeeDetailService,
    deactiveEmployeService
} from "../services/employees-list.service.js";

// Create Employee - POST Method
export const createEmployee = async (req, res, next) => {
    try {
        const employeeDetails = await createEmployeeService(req);
        res.status(HTTP_STATUS.CREATED).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.CREATED,
                message: MESSAGES.EMPLOYEE_CREATED_SUCCESS
            },
            data: {
                employeeId: employeeDetails.employeeId,
                firstName: employeeDetails.firstName,
                lastName: employeeDetails.lastName,
                email: employeeDetails.email,
                phone: employeeDetails.phone,
                role: employeeDetails.role,
                department: employeeDetails.department,
                designation: employeeDetails.designation,
                employmentType: employeeDetails.employmentType,
                status: employeeDetails.status,
                salary: employeeDetails.salary,
                isActive: employeeDetails.isActive,
                createdAt: employeeDetails.createdAt,
                updatedAt: employeeDetails.updatedAt,
            }
        });
    } catch (error) {
        error.customMessage = MESSAGES.EMPLOYEE_CREATED_FAILED
        next(error);
    }
}

// Get All Employees List - GET Method
export const getAllEmployeesList = async (req, res, next) => {
    try {
        const employeeList = await getAllEmployeesListService(req);
        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.EMPLOYEE_LIST_RETERIVED_SUCCESS
            },
            data: employeeList,
            length: employeeList.length
        });
    } catch (error) {
        error.customMessage = MESSAGES.EMPLOYEE_LIST_RETERIVED_FAILED;
        next(error);
    }
}

// Get Employee Details - GET Method
export const getEmployeeById = async (req, res, next) => {
    try {
        const employeeDetails = await getEmployeeDetailService(req);
        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.EMPLOYEE_DETAILS_RETERIVED_SUCCESS
            },
            data: employeeDetails
        });
    } catch (error) {
        error.customMessage = MESSAGES.EMPLOYEE_DETAILS_RETERIVED_FAILED
        next(error);
    }
}

// Employee update details - PUT Method
export const updateEmployeeById = async (req, res, next) => {
    try {
        const updateEmployeeDetails = await employeeUpdateService(req);
        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.EMPLOYEE_DETAILS_UPDATE_SUCCESS
            },
            data: updateEmployeeDetails
        });
    } catch (error) {
        error.customMessage = MESSAGES.EMPLOYEE_DETAILS_UPDATE_FAILED;
        next(error);
    }
}

// Employee inActive when leaves company 
export const inactivateEmployeeById = async (req, res, next) => {
    try {
        const employeeDetails = await deactiveEmployeService(req);
        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.EMPLOYEE_DETAILS_INACTIVATE_SUCCESS
            },
            data: employeeDetails
        });
    } catch (error) {
        error.customMessage = MESSAGES.EMPLOYEE_DETAILS_INACTIVATE_FAILED
        next(error);
    }
}
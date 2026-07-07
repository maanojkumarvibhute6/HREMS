import rolesModel from "../models/roles.model.js";

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { createError } from "../utils/error.util.js";

// Create Role - POST Method
export const createRole = async (req, res, next) => {
    try {
        const { roleId, label, value, roleHead, roleDescription } = req.body;

        // To check all mandatory fields
        if (!roleId || !label || !value || !roleHead || !roleDescription) {
            throw createError(MESSAGES.ALL_MANDATORY_FIELDS, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        // To check role is already exists
        const isRoleExists = await rolesModel.findOne({ value });
        if (isRoleExists) {
            throw createError(MESSAGES.ROLE_ALREADY_CREATED, HTTP_STATUS.CONFLICT);
        }

        const role = await rolesModel.create({
            roleId, 
            label, 
            value, 
            roleHead, 
            roleDescription
        });

        res.status(HTTP_STATUS.CREATED).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.CREATED,
                message: MESSAGES.ROLE_SUCCESS
            },
            data: {
                roleId: role.roleId,
                label: role.label,
                value: role.value,
                roleHead: role.roleHead,
                roleDescription: role.roleDescription,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                status: role.status,
                isActive: role.isActive,
            }
        });

    } catch (error) {
        error.customMessage = MESSAGES.ROLE_FAILED
        next(error);
    }
}
// Get All Roles List - GET Method
export const getAllRoles = async (req, res, next) => {
    try {
        const allRoles = await rolesModel.find();
        const rolesList = allRoles.map((role) => ({
                roleId: role.roleId,
                label: role.label,
                value: role.value,
                roleHead: role.roleHead,
                roleDescription: role.roleDescription,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt,
                status: role.status,
                isActive: role.isActive,
        }))

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.ROLE_RETRIVED_SUCCESS
            },
            data: rolesList,
            length: rolesList.length
        });

    } catch (error) {
        error.customMessage = MESSAGES.ROLE_RETRIVED_FAILED
        next(error);
    }
}
// Get Role Details - GET Method
export const getRoleById = async (req, res, next) => {
    try {
        const roleId = req.params.roleId;

        const roleFullDetails = await rolesModel.findOne({ roleId });

        if (!roleFullDetails) {
            throw createError(MESSAGES.ROLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.ROLE_RETRIVED_SUCCESS
            },
            data: {
                roleId: roleFullDetails.roleId,
                label: roleFullDetails.label,
                value: roleFullDetails.value,
                roleHead: roleFullDetails.roleHead,
                roleDescription: roleFullDetails.roleDescription,
                createdAt: roleFullDetails.createdAt,
                updatedAt: roleFullDetails.updatedAt,
                status: roleFullDetails.status,
                isActive: roleFullDetails.isActive,
            }
        });
    } catch (error) {
        error.customMessage = MESSAGES.ROLE_RETRIVED_FAILED
        next(error);
    }
}

// Role update details - PUT Method
export const updateRoleById = async (req, res, next) => {
    try {
        const value = req.params.value;
        const reqBody = req.body;

        // To check role is exists
        const isRoleExists = await rolesModel.findOne({ value });
        if (!isRoleExists) {
            throw createError(MESSAGES.ROLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const roleDetails = await rolesModel.findByIdAndUpdate(
            isRoleExists._id,
            reqBody,
            { new: true}
        );

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.ROLE_UPDATE_SUCCESS
            },
            data: roleDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.ROLE_UPDATE_FAILED
        next(error);
    }
}
// Role inActive when leaves company 
export const deleteRoleByID = async (req, res, next) => {
    try {
        const value = req.params.value;

        // To check role is exists
        const isRoleExists = await rolesModel.findOne({ value });
        if (!isRoleExists) {
            throw createError(MESSAGES.ROLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const deleteRoleDetails = await rolesModel.findByIdAndDelete(isRoleExists._id)

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.ROLE_DELETED_SUCCESS
            },
            data: deleteRoleDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.ROLE_DELETED_FAILED
        next(error);
    }
}
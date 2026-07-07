import designationModel from "../models/designation.model.js";

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { createError } from "../utils/error.util.js";

// Create Designation - POST Method
export const createDesignation = async (req, res, next) => {
    try {
        const { designationId, label, value, designationHead, designationDescription } = req.body;

        // To check all mandatory fields
        if (!designationId || !label || !value || !designationHead || !designationDescription) {
            throw createError(MESSAGES.ALL_MANDATORY_FIELDS, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        // To check designation is already exists
        const isDesignationExists = await designationModel.findOne({ value });
        if (isDesignationExists) {
            throw createError(MESSAGES.DESIGNATION_ALREADY_CREATED, HTTP_STATUS.CONFLICT);
        }

        const designation = await designationModel.create({
            designationId,
            label,
            value,
            designationHead,
            designationDescription
        });

        res.status(HTTP_STATUS.CREATED).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.CREATED,
                message: MESSAGES.DESIGNATION_SUCCESS
            },
            data: {
                designationId: designation.designationId,
                label: designation.label,
                value: designation.value,
                designationHead: designation.designationHead,
                designationDescription: designation.designationDescription,
                createdAt: designation.createdAt,
                updatedAt: designation.updatedAt,
                status: designation.status,
                isActive: designation.isActive,
            }
        });

    } catch (error) {
        error.customMessage = MESSAGES.DESIGNATION_FAILED
        next(error);
    }
}
// Get All Designations List - GET Method
export const getAllDesignation = async (req, res, next) => {
    try {
        const allDesignation = await designationModel.find();
        const designationList = allDesignation.map((designation) => ({
            designationId: designation.designationId,
            label: designation.label,
            value: designation.value,
            designationHead: designation.designationHead,
            designationDescription: designation.designationDescription,
            createdAt: designation.createdAt,
            updatedAt: designation.updatedAt,
            status: designation.status,
            isActive: designation.isActive,
        }))

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DESIGNATION_RETRIVED_SUCCESS
            },
            data: designationList,
            length: designationList.length
        });

    } catch (error) {
        error.customMessage = MESSAGES.DESIGNATION_RETRIVED_FAILED
        next(error);
    }
}
// Get Designation Details - GET Method
export const getDesignationById = async (req, res, next) => {
    try {
        const designationId = req.params.designationId;

        const designationFullDetails = await designationModel.findOne({ designationId });

        if (!designationFullDetails) {
            throw createError(MESSAGES.DESIGNATION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DESIGNATION_RETRIVED_SUCCESS
            },
            data: {
                designationId: designationFullDetails.designationId,
                label: designationFullDetails.label,
                value: designationFullDetails.value,
                designationHead: designationFullDetails.designationHead,
                designationDescription: designationFullDetails.designationDescription,
                createdAt: designationFullDetails.createdAt,
                updatedAt: designationFullDetails.updatedAt,
                status: designationFullDetails.status,
                isActive: designationFullDetails.isActive,
            }
        });
    } catch (error) {
        error.customMessage = MESSAGES.DESIGNATION_RETRIVED_FAILED
        next(error);
    }
}

// Designation update details - PUT Method
export const updateDesignationById = async (req, res, next) => {
    try {
        const value = req.params.value;
        const reqBody = req.body;

        // To check designation is exists
        const isDesignationExists = await designationModel.findOne({ value });
        if (!isDesignationExists) {
            throw createError(MESSAGES.DESIGNATION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const designationDetails = await designationModel.findByIdAndUpdate(
            isDesignationExists._id,
            reqBody,
            { new: true }
        );

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DESIGNATION_UPDATE_SUCCESS
            },
            data: designationDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.DESIGNATION_UPDATE_FAILED
        next(error);
    }
}
// Designation inActive when leaves company 
export const deleteDesignationById = async (req, res, next) => {
    try {
        const value = req.params.value;

        // To check Designation is exists
        const isDesignationExists = await designationModel.findOne({ value });
        if (!isDesignationExists) {
            throw createError(MESSAGES.DESIGNATION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const deleteDesignationDetails = await designationModel.findByIdAndDelete(isDesignationExists._id)

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DESIGNATION_DELETED_SUCCESS
            },
            data: deleteDesignationDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.DESIGNATION_DELETED_FAILED
        next(error);
    }
}
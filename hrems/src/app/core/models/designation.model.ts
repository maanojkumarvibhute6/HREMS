// Designation Responses
export interface DesignationListResponse {
    status: {
        status: string,
        statusCode: number,
        message: string
    },
    data: DesignationResponse[],
    length: number
}

export interface DesignationResponse {
    label: string,
    value: string
}
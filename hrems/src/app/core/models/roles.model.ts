// Roles Responses
export interface RoleListResponse {
    status: {
        status: string,
        statusCode: number,
        message: string
    },
    data: RoleResponse[],
    length: number
}

export interface RoleResponse {
    label: string,
    value: string
}

// Department Responses
export interface DepartmentListResponse {
    status: {
        status: string,
        statusCode: number,
        message: string
    },
    data: DepartmentResponse[],
    length: number
}

export interface DepartmentResponse {
    label: string,
    value: string
}
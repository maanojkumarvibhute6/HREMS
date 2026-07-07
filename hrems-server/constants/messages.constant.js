export const MESSAGES = {
    SUCCESS: 'Success',
    ERROR: 'Error',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',

    // JWT
    ACCESS_DENIED: 'Access Denied',
    UNAUTHORIZED: 'Unauthorized',
    ACCESS_DENIED_UNAUTHORIZED_NOTOKEN: 'Access Denied, Unauthorized, No token found',
    EMPLOYEE_NOT_FOUND_INACTIVE: 'Employee not found or inactive',
    TOKEN_INVALID_EXPIRED: 'Token invalid or expired',

    // LOGIN
    LOGIN_SUCCESS: 'Login successfully',
    LOGIN_FAILED: 'Login failed',
    ALL_MANDATORY_FIELDS: 'Please fill all the mandatory fields',
    EMPLOYEE_DOES_NOT_EXISTS: 'Employee does not exists',
    EMPLOYEE_INACTIVATED: 'Employee is inactivated',
    INVALID_CREDENTIALS: 'Invalid credentials',
    
    // AFTER LOGIN
    EMPLOYEE_CREATED_SUCCESS: 'Employee created successfully',
    EMPLOYEE_CREATED_FAILED: 'Employee creation failed',
    EMPLOYEE_ALREADY_CREATED: 'Employee already created',
    EMPLOYEE_DETAILS_NOT_FOUND: 'Employee details not found',

    EMPLOYEE_LIST_RETERIVED_SUCCESS: 'Employees list retrived successfully',
    EMPLOYEE_LIST_RETERIVED_FAILED: 'Employees list reterived failed',

    EMPLOYEE_ACTIVE_LIST_RETERIVED_SUCCESS: 'Employees active list retrived successfully',
    EMPLOYEE_ACTIVE_LIST_RETERIVED_FAILED: 'Employees active list reterived failed',

    EMPLOYEE_INACTIVE_LIST_RETERIVED_SUCCESS: 'Employees inactive list retrived successfully',
    EMPLOYEE_INACTIVE_LIST_RETERIVED_FAILED: 'Employees inactive list reterived failed',

    EMPLOYEE_DETAILS_RETERIVED_SUCCESS: 'Employee details retrived successfully',
    EMPLOYEE_DETAILS_RETERIVED_FAILED: 'Employee details reterived failed',

    EMPLOYEE_DETAILS_UPDATE_SUCCESS: 'Employee details updated successfully',
    EMPLOYEE_DETAILS_UPDATE_FAILED: 'Employee details update failed',
    EMPLOYEE_CURRENTLY_INACTIVE_UPDATE_FAILED: 'Employee currently is inactive update failed',

    EMPLOYEE_DETAILS_INACTIVATE_SUCCESS: 'Employee details inActive successfully',
    EMPLOYEE_DETAILS_INACTIVATE_FAILED: 'Employee details inActive failed',

    // ROLE
    ROLE_SUCCESS: 'Role Created successfully',
    ROLE_FAILED: 'Role Creation Failed',
    ROLE_ALREADY_CREATED: 'Role is already created',
    ROLE_RETRIVED_SUCCESS: 'Roles reterived successfully',
    ROLE_RETRIVED_FAILED: 'Roles reterived failed',
    ROLE_NOT_FOUND: 'Role is not found',
    ROLE_UPDATE_SUCCESS: 'Role update success',
    ROLE_UPDATE_FAILED: 'Role update failed',
    ROLE_DELETED_SUCCESS: 'Role deleted successfully',
    ROLE_DELETED_FAILED: 'Role deleted failed',

    // DEPARTMENT
    DEPARTMENT_SUCCESS: 'Department Created successfully',
    DEPARTMENT_FAILED: 'Department Creation Failed',
    DEPARTMENT_ALREADY_CREATED: 'Department is already created',
    DEPARTMENT_RETRIVED_SUCCESS: 'Departments reterived successfully',
    DEPARTMENT_RETRIVED_FAILED: 'Departments reterived failed',
    DEPARTMENT_NOT_FOUND: 'Department is not found',
    DEPARTMENT_UPDATE_SUCCESS: 'Department update success',
    DEPARTMENT_UPDATE_FAILED: 'Department update failed',
    DEPARTMENT_DELETED_SUCCESS: 'Department deleted successfully',
    DEPARTMENT_DELETED_FAILED: 'Department deleted failed',

    // DESIGNATION
    DESIGNATION_SUCCESS: 'Designation Created successfully',
    DESIGNATION_FAILED: 'Designation Creation Failed',
    DESIGNATION_ALREADY_CREATED: 'Designation is already created',
    DESIGNATION_RETRIVED_SUCCESS: 'Designations reterived successfully',
    DESIGNATION_RETRIVED_FAILED: 'Designations reterived failed',
    DESIGNATION_NOT_FOUND: 'Designation is not found',
    DESIGNATION_UPDATE_SUCCESS: 'Designation update success',
    DESIGNATION_UPDATE_FAILED: 'Designation update failed',
    DESIGNATION_DELETED_SUCCESS: 'Designation deleted successfully',
    DESIGNATION_DELETED_FAILED: 'Designation deleted failed',

}
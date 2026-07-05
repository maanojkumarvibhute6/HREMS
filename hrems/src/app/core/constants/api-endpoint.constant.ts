import { environment } from '../../../environments/environment';

const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINT = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,

  EMPLOYEE: {
    CREATE: `${API_BASE_URL}/employees/create`,
    GET_ALL: `${API_BASE_URL}/employees/all`,
    GET_ACTIVE: `${API_BASE_URL}/employees/active`,
    GET_INACTIVE: `${API_BASE_URL}/employees/inactive`,
    GET_DETAILS: `${API_BASE_URL}/employees`,
    UPDATE: `${API_BASE_URL}/employees/update`,
    INACTIVATE: `${API_BASE_URL}/employees/inactivate`,
  },

  ROLE: {
    CREATE: `${API_BASE_URL}/role/create`,
    GET_ALL: `${API_BASE_URL}/role/allRole`,
    UPDATE: `${API_BASE_URL}/role/updateRole`,
    INACTIVATE: `${API_BASE_URL}/role/deleteRole`,
  },

  DEPARTMENT: {
    CREATE: `${API_BASE_URL}/department/create`,
    GET_ALL: `${API_BASE_URL}/department/allDepartment`,
    GET_DETAILS: `${API_BASE_URL}/department/allDepartment`,
    UPDATE: `${API_BASE_URL}/department/updateDepartment`,
    INACTIVATE: `${API_BASE_URL}/department/deleteDepartment`,
  },

  DESIGNATION: {
    CREATE: `${API_BASE_URL}/designation/create`,
    GET_ALL: `${API_BASE_URL}/designation/allDesignation`,
    GET_DETAILS: `${API_BASE_URL}/designation/allDesignation`,
    UPDATE: `${API_BASE_URL}/designation/updateDesignation`,
    INACTIVATE: `${API_BASE_URL}/designation/deleteDesignation`,
  },
};

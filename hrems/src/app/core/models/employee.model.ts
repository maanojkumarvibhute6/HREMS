export interface EmployeeListResponse {
  status: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: Employee[];
  length: number;
}

export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  department: string;
  designation: string;
  salary: number;
  phone: string;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeResponse {
  status: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: Employee;
}

export interface CreateEmployeeResponse {
  status: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: Employee;
}

export interface UpdateEmployeeResponse {
  status: {
    status: string;
    statusCode: number;
    message: string;
  };
  data: Employee;
}

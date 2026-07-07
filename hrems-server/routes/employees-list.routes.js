import express from 'express';

import {
    createEmployee,
    inactivateEmployeeById,
    getAllEmployeesList,
    getEmployeeById,
    updateEmployeeById
} from '../controllers/employees-list.controller.js';
import { jwt_middleware } from '../middlewares/jwt.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { ROLES } from '../constants/roles.constant.js';

const employeeRouter = express.Router();

employeeRouter.post(
    '/create',
    createEmployee
);

employeeRouter.get(
    '/all',
    getAllEmployeesList
);

employeeRouter.get(
    '/:employeeId',
    getEmployeeById
);

employeeRouter.put(
    '/update/:employeeId',
    updateEmployeeById
);

employeeRouter.put(
    '/inactivate/:employeeId',
    inactivateEmployeeById
);
// employeeRouter.post(
//     '/create',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     createEmployee
// );

// employeeRouter.get(
//     '/all', 
//     jwt_middleware, 
//     authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), 
//     getAllEmployeesList
// );

// employeeRouter.get(
//     '/active', 
//     jwt_middleware, 
//     authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), 
//     getAllActiveEmployeesList
// );

// employeeRouter.get(
//     '/inactive', 
//     jwt_middleware, 
//     authorizeRoles(ROLES.ADMIN, ROLES.MANAGER),
//     getAllInActiveEmployeesList
// );

// employeeRouter.get(
//     '/:employeeId', 
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), 
//     getEmployeeById
// );

// employeeRouter.put(
//     '/update/:employeeId', 
//     jwt_middleware, 
//     authorizeRoles(ROLES.ADMIN, ROLES.MANAGER), 
//     updateEmployeeById
// );

// employeeRouter.put(
//     '/inactivate/:employeeId', 
//     jwt_middleware, 
//     authorizeRoles(ROLES.ADMIN), 
//     inactivateEmployeeById
// );


export default employeeRouter;
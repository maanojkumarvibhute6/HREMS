import express from 'express';

import { 
    createDepartment, 
    deleteDepartmentById, 
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
} from '../controllers/department.controller.js';

import { jwt_middleware } from '../middlewares/jwt.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { ROLES } from '../constants/roles.constant.js';

const departmentRouter = express.Router();

departmentRouter.post(
    '/create',
    createDepartment
);

departmentRouter.get(
    '/allDepartment',
    getAllDepartments
);

departmentRouter.get(
    '/:departmentId',
    getDepartmentById
);

departmentRouter.put(
    '/updateDepartment/:value',
    updateDepartmentById
);

departmentRouter.delete(
    '/deleteDepartment/:value',
    deleteDepartmentById
);
// departmentRouter.post(
//     '/create',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     createDepartment
// );

// departmentRouter.get(
//     '/allDepartment',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     getAllDepartments
// );

// departmentRouter.put(
//     '/updateDepartment/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     updateDepartment
// );

// departmentRouter.delete(
//     '/deleteDepartment/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     deleteDepartment
// );


export default departmentRouter;
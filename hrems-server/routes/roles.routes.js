import express from 'express';

import {
    createRole,
    deleteRoleByID,
    getAllRoles,
    getRoleById,
    updateRoleById,
} from '../controllers/roles.controller.js';

import { jwt_middleware } from '../middlewares/jwt.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { ROLES } from '../constants/roles.constant.js';

const roleRouter = express.Router();

roleRouter.post(
    '/create',
    createRole
);

roleRouter.get(
    '/allRole',
    getAllRoles
);

roleRouter.get(
    '/:roleId',
    getRoleById
);

roleRouter.put(
    '/updateRole/:value',
    updateRoleById
);

roleRouter.delete(
    '/deleteRole/:value',
    deleteRoleByID
);
// roleRouter.post(
//     '/create',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     createRole
// );

// roleRouter.get(
//     '/allRole',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     getAllRoles
// );

// roleRouter.put(
//     '/updateRole/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     updateRole
// );

// roleRouter.delete(
//     '/deleteRole/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     deleteRole
// );


export default roleRouter;
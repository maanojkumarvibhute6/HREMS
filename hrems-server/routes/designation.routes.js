import express from 'express';

import { 
    createDesignation, 
    deleteDesignationById, 
    getAllDesignation, 
    getDesignationById, 
    updateDesignationById
} from '../controllers/designation.controller.js';

import { jwt_middleware } from '../middlewares/jwt.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { ROLES } from '../constants/roles.constant.js';

const designationRouter = express.Router();

designationRouter.post(
    '/create',
    createDesignation
);

designationRouter.get(
    '/allDesignation',
    getAllDesignation
);

designationRouter.get(
    '/:designationId',
    getDesignationById
);

designationRouter.put(
    '/updateDesignation/:value',
    updateDesignationById
);

designationRouter.delete(
    '/deleteDesignation/:value',
    deleteDesignationById
);
// designationRouter.post(
//     '/create',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     createDesignation
// );

// designationRouter.get(
//     '/allDesignation',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     getAllDesignation
// );

// designationRouter.put(
//     '/updateDesignation/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     updateDesignation
// );

// designationRouter.delete(
//     '/deleteDesignation/:value',
//     jwt_middleware,
//     authorizeRoles(ROLES.ADMIN),
//     deleteDesignation
// );


export default designationRouter;
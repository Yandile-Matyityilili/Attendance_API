import express from 'express';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUsersByDepartment
} from '../Controllers/usersControllers.js';
const router = express.Router();

// User CRUD routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Additional routes
router.get('/department/:department', getUsersByDepartment);
export default router;
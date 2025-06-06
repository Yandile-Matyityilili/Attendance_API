import User from '../Models/usersModels.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { username, status, department, email } = req.body;
        if (!username || !department || !email) {
            return res.status(400).json({ message: 'Username, email and department are required' });
        }
        const userId = await User.create(username, status, department, email);
        res.status(201).json({ id: userId, username, status, department, email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { username, status, department,  email } = req.body;
        if (!username || !department || !email || status === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        await User.update(req.params.id, username, status, department,  email);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getUsersByDepartment = async (req, res) => {
    try {
        const users = await User.getByDepartment(req.params.department);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsersByTimestamp = async (req, res) => {
    try {
        // Parse query parameters
        const filters = {
            // Date filters
            date: req.query.date,
            startDate: req.query.start_date,
            endDate: req.query.end_date,
            
            // Time filters
            time: req.query.time,
            startTime: req.query.start_time,
            endTime: req.query.end_time,
            hour: req.query.hour,
            minute: req.query.minute,
            
            // Exact timestamp
            exactTimestamp: req.query.timestamp,
            
            // Pagination
            limit: req.query.limit
        };
        
        // Validate time format if provided
        if (filters.time && !/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(filters.time)) {
            return res.status(400).json({ message: 'Invalid time format. Use HH:MM or HH:MM:SS' });
        }
        
        const users = await User.getByTimestamp(filters);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


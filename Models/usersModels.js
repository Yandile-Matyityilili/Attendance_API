// import { pool } from "../Config/config.js"

import  { pool }  from '../Config/config.js';


class User {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM users WHERE active = TRUE');
        return rows;
    }
    static async getById(userId) {
        const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
        return rows[0];
    }
    static async create(username, department) {
        const [result] = await pool.query(
            'INSERT INTO users (username, department) VALUES (?, ?)',
            [username, department]
        );
        return result.insertId;
    }
    static async update(userId, username, department, active) {
        await pool.query(
            'UPDATE users SET username = ?, department = ?, active = ? WHERE user_id = ?',
            [username, department, active, userId]
        );
    }
    static async delete(userId) {
        await pool.query('DELETE FROM users WHERE user_id = ?', [userId]);
    }
    static async getByDepartment(department) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE department = ? AND active = TRUE',
            [department]
        );
        return rows;
    }
    static async getByTimestamp(filter) {
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    
    // Date filtering (existing)
    if (filter.date) {
        query += ' AND DATE(created_at) = ?';
        params.push(filter.date);
    }
    
    if (filter.startDate && filter.endDate) {
        query += ' AND created_at BETWEEN ? AND ?';
        params.push(filter.startDate, filter.endDate);
    }
    
    // Time filtering (new)
    if (filter.time) {
        query += ' AND TIME(created_at) = ?';
        params.push(filter.time);
    }
    
    if (filter.startTime && filter.endTime) {
        query += ' AND TIME(created_at) BETWEEN ? AND ?';
        params.push(filter.startTime, filter.endTime);
    }
    
    if (filter.hour) {
        query += ' AND HOUR(created_at) = ?';
        params.push(filter.hour);
    }
    
    if (filter.minute) {
        query += ' AND MINUTE(created_at) = ?';
        params.push(filter.minute);
    }
    
    // Combined datetime filtering
    if (filter.exactTimestamp) {
        query += ' AND created_at = ?';
        params.push(filter.exactTimestamp);
    }
    
    // Add sorting by default
    query += ' ORDER BY created_at DESC';
    
    // Add pagination if needed
    if (filter.limit) {
        query += ' LIMIT ?';
        params.push(parseInt(filter.limit));
    }
    
    const [rows] = await pool.query(query, params);
    return rows;
}
}
export default User;







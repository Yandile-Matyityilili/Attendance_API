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
}
export default User;







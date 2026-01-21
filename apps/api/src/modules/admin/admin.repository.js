import { pool } from "../../db/pool.js";


export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT 
      id, 
      email, 
      username, 
      first_name, 
      last_name, 
      avatar_url, 
      location, 
      website, 
      role, 
      created_at 
    FROM users 
    ORDER BY created_at DESC`
  );
  return rows;
};

export const getUserById = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
      id, 
      email, 
      username, 
      first_name, 
      last_name, 
      avatar_url, 
      bio, 
      location, 
      website, 
      role, 
      created_at 
    FROM users 
    WHERE id = ?`,
    [userId]
  );
  return rows[0];
};

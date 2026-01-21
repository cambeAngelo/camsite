import { pool } from "../../db/pool.js";
import { hashPassword, comparePassword, generateToken } from "../../shared/auth.js";

// Register user
export async function registerUser({ email, username, password, firstName = "", lastName = "" }) {
  const connection = await pool.getConnection();
  try {
    // Check if user exists
    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (existing.length > 0) {
      throw new Error("Email or username already exists");
    }

    const passwordHash = await hashPassword(password);
    
    const [result] = await connection.query(
      "INSERT INTO users (email, username, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
      [email, username, passwordHash, firstName, lastName]
    );

    // Create default portfolio
    await connection.query(
      "INSERT INTO portfolios (user_id, title, slug) VALUES (?, ?, ?)",
      [result.insertId, `${firstName}'s Portfolio`, username]
    );

    const token = generateToken(result.insertId);
    return { userId: result.insertId, token, email, username };
  } finally {
    connection.release();
  }
}

// Login user
export async function loginUser({ email, password }) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT id, password_hash, email, username FROM users WHERE email = ? AND deleted_at IS NULL",
      [email]
    );

    if (rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = rows[0];
    const isValid = await comparePassword(password, user.password_hash);
    
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user.id);
    return { userId: user.id, token, email: user.email, username: user.username };
  } finally {
    connection.release();
  }
}

// Get user by ID
export async function getUserById(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT id, email, username, first_name, last_name, bio, avatar_url, website, location, is_public, created_at FROM users WHERE id = ? AND deleted_at IS NULL",
      [userId]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Get user by username
export async function getUserByUsername(username) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT id, email, username, first_name, last_name, bio, avatar_url, website, location, is_public, created_at FROM users WHERE username = ? AND deleted_at IS NULL",
      [username]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Update user profile
export async function updateUserProfile(userId, data) {
  const connection = await pool.getConnection();
  try {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return null;

    values.push(userId);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    
    await connection.query(query, values);
    return getUserById(userId);
  } finally {
    connection.release();
  }
}

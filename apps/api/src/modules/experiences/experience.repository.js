import { pool } from "../../db/pool.js";

export async function getExperiencesByUserId(userId) {
  try {
    const [experiences] = await pool.query(
      "SELECT * FROM experiences WHERE user_id = ? ORDER BY start_date DESC",
      [userId]
    );
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
}

export async function createExperience(userId, experienceData) {
  try {
    const { title, company, start_date, end_date, is_current, description } = experienceData;
    const [result] = await pool.query(
      "INSERT INTO experiences (user_id, title, company, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, title, company, start_date, end_date, is_current || false, description || ""]
    );
    return {
      id: result.insertId,
      user_id: userId,
      title,
      company,
      start_date,
      end_date,
      is_current: is_current || false,
      description: description || "",
    };
  } catch (error) {
    console.error("Error creating experience:", error);
    throw error;
  }
}

export async function updateExperience(userId, experienceId, experienceData) {
  try {
    const { title, company, start_date, end_date, is_current, description } = experienceData;
    const [result] = await pool.query(
      "UPDATE experiences SET title = ?, company = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ? AND user_id = ?",
      [title, company, start_date, end_date, is_current || false, description || "", experienceId, userId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Experience not found or not owned by user");
    }
    return { id: experienceId, user_id: userId, ...experienceData };
  } catch (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
}

export async function deleteExperience(userId, experienceId) {
  try {
    const [result] = await pool.query(
      "DELETE FROM experiences WHERE id = ? AND user_id = ?",
      [experienceId, userId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Experience not found or not owned by user");
    }
    return true;
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
}

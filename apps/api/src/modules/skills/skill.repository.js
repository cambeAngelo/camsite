import { pool } from "../../db/pool.js";

export async function getSkillsByUserId(userId) {
  try {
    const [skills] = await pool.query(
      "SELECT * FROM skills WHERE user_id = ? ORDER BY position ASC",
      [userId]
    );
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
}

export async function createSkill(userId, skillData) {
  try {
    const { name, proficiency } = skillData;
    const [result] = await pool.query(
      "INSERT INTO skills (user_id, name, proficiency) VALUES (?, ?, ?)",
      [userId, name, proficiency || 50]
    );
    return { id: result.insertId, user_id: userId, name, proficiency: proficiency || 50 };
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
}

export async function updateSkill(userId, skillId, skillData) {
  try {
    const { name, proficiency, position } = skillData;
    const [result] = await pool.query(
      "UPDATE skills SET name = ?, proficiency = ?, position = ? WHERE id = ? AND user_id = ?",
      [name, proficiency, position, skillId, userId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Skill not found or not owned by user");
    }
    return { id: skillId, user_id: userId, ...skillData };
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}

export async function deleteSkill(userId, skillId) {
  try {
    const [result] = await pool.query(
      "DELETE FROM skills WHERE id = ? AND user_id = ?",
      [skillId, userId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Skill not found or not owned by user");
    }
    return true;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}

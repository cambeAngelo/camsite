import { pool } from "../../db/pool.js";

export async function getTemplates() {
  try {
    const [templates] = await pool.query(
      "SELECT * FROM templates WHERE is_public = true ORDER BY created_at DESC"
    );
    return templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
}

export async function getTemplateById(id) {
  try {
    const [templates] = await pool.query(
      "SELECT * FROM templates WHERE id = ? AND is_public = true",
      [id]
    );
    return templates[0] || null;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
}

export async function getTemplateBySlug(slug) {
  try {
    const [templates] = await pool.query(
      "SELECT * FROM templates WHERE slug = ? AND is_public = true",
      [slug]
    );
    return templates[0] || null;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
}

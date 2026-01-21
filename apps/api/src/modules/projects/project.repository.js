import { pool } from "../../db/pool.js";

export async function getProjectsByPortfolioId(portfolioId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM projects WHERE portfolio_id = ? AND is_published = TRUE ORDER BY position ASC",
      [portfolioId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

export async function getUserProjects(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY position ASC",
      [userId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

export async function createProject(userId, portfolioId, data) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `INSERT INTO projects (user_id, portfolio_id, title, slug, description, image_url, project_url, github_url, technologies, tags, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        portfolioId,
        data.title,
        data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
        data.description,
        data.imageUrl,
        data.projectUrl,
        data.githubUrl,
        JSON.stringify(data.technologies || []),
        JSON.stringify(data.tags || []),
        data.position || 0,
      ]
    );
    return { id: result.insertId, ...data };
  } finally {
    connection.release();
  }
}

export async function updateProject(projectId, userId, data) {
  const connection = await pool.getConnection();
  try {
    // Verify ownership
    const [project] = await connection.query(
      "SELECT user_id FROM projects WHERE id = ?",
      [projectId]
    );

    if (project.length === 0 || project[0].user_id !== userId) {
      throw new Error("Unauthorized");
    }

    const updates = [];
    const values = [];

    const fields = ["title", "slug", "description", "image_url", "project_url", "github_url", "position", "is_featured", "is_published"];
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && fields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (data.technologies) {
      updates.push("technologies = ?");
      values.push(JSON.stringify(data.technologies));
    }

    if (data.tags) {
      updates.push("tags = ?");
      values.push(JSON.stringify(data.tags));
    }

    if (updates.length === 0) return null;

    values.push(projectId);
    await connection.query(`UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, values);
    
    const [updated] = await connection.query("SELECT * FROM projects WHERE id = ?", [projectId]);
    return updated[0];
  } finally {
    connection.release();
  }
}

export async function deleteProject(projectId, userId) {
  const connection = await pool.getConnection();
  try {
    const [project] = await connection.query(
      "SELECT user_id FROM projects WHERE id = ?",
      [projectId]
    );

    if (project.length === 0 || project[0].user_id !== userId) {
      throw new Error("Unauthorized");
    }

    await connection.query("DELETE FROM projects WHERE id = ?", [projectId]);
    return true;
  } finally {
    connection.release();
  }
}

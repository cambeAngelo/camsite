import { pool } from "../../db/pool.js";

// Get portfolio by slug
export async function getPortfolioBySlug(slug) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT p.*, u.username, u.first_name, u.last_name, u.bio, u.avatar_url, u.website, u.location
       FROM portfolios p
       JOIN users u ON p.user_id = u.id
       WHERE p.slug = ? AND p.is_published = TRUE`,
      [slug]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Get user's portfolio
export async function getUserPortfolio(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM portfolios WHERE user_id = ? LIMIT 1",
      [userId]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Update portfolio
export async function updatePortfolio(portfolioId, userId, data) {
  const connection = await pool.getConnection();
  try {
    // Verify ownership
    const [owner] = await connection.query(
      "SELECT user_id FROM portfolios WHERE id = ?",
      [portfolioId]
    );
    
    if (owner.length === 0 || owner[0].user_id !== userId) {
      throw new Error("Unauthorized");
    }

    const updates = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && ["title", "slug", "description", "theme", "color_scheme", "is_published"].includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return null;

    values.push(portfolioId);
    await connection.query(`UPDATE portfolios SET ${updates.join(", ")} WHERE id = ?`, values);
    
    return getPortfolioBySlug(data.slug);
  } finally {
    connection.release();
  }
}

// Increment view count
export async function incrementViewCount(portfolioId) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "UPDATE portfolios SET view_count = view_count + 1 WHERE id = ?",
      [portfolioId]
    );
  } finally {
    connection.release();
  }
}

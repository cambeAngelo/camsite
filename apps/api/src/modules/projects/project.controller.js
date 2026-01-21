import { getProjectsByPortfolioId, getUserProjects, createProject, updateProject, deleteProject } from "./project.repository.js";

export async function getProjects(req, res, next) {
  try {
    const { portfolioId } = req.params;
    const projects = await getProjectsByPortfolioId(portfolioId);
    return res.json({ ok: true, data: projects });
  } catch (err) {
    next(err);
  }
}

export async function getMyProjects(req, res, next) {
  try {
    const projects = await getUserProjects(req.user.id);
    return res.json({ ok: true, data: projects });
  } catch (err) {
    next(err);
  }
}

export async function createNewProject(req, res, next) {
  try {
    const { title, slug, description, imageUrl, projectUrl, githubUrl, technologies, tags, position } = req.body;

    if (!title) {
      return res.status(400).json({ ok: false, error: "Title is required" });
    }

    // Get user's portfolio
    const { pool } = await import("../../db/pool.js");
    const connection = await pool.getConnection();
    const [portfolio] = await connection.query(
      "SELECT id FROM portfolios WHERE user_id = ? LIMIT 1",
      [req.user.id]
    );
    connection.release();

    if (portfolio.length === 0) {
      return res.status(404).json({ ok: false, error: "Portfolio not found" });
    }

    const project = await createProject(req.user.id, portfolio[0].id, {
      title,
      slug,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
      technologies,
      tags,
      position,
    });

    return res.status(201).json({ ok: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function updateExistingProject(req, res, next) {
  try {
    const { projectId } = req.params;
    const project = await updateProject(projectId, req.user.id, req.body);

    if (!project) {
      return res.status(404).json({ ok: false, error: "Project not found" });
    }

    return res.json({ ok: true, data: project });
  } catch (err) {
    if (err.message === "Unauthorized") {
      return res.status(403).json({ ok: false, error: "Unauthorized" });
    }
    next(err);
  }
}

export async function deleteExistingProject(req, res, next) {
  try {
    const { projectId } = req.params;
    await deleteProject(projectId, req.user.id);
    return res.json({ ok: true, message: "Project deleted" });
  } catch (err) {
    if (err.message === "Unauthorized") {
      return res.status(403).json({ ok: false, error: "Unauthorized" });
    }
    next(err);
  }
}

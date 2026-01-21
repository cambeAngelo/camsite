import * as experienceRepository from "./experience.repository.js";

export async function getMyExperiences(req, res, next) {
  try {
    const userId = req.user.id;
    const experiences = await experienceRepository.getExperiencesByUserId(userId);
    res.json({
      ok: true,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
}

export async function createExperience(req, res, next) {
  try {
    const userId = req.user.id;
    const { title, company, start_date, end_date, is_current, description } = req.body;

    if (!title || !company) {
      return res.status(400).json({
        ok: false,
        error: "Title and company are required",
      });
    }

    const experience = await experienceRepository.createExperience(userId, {
      title,
      company,
      start_date,
      end_date,
      is_current,
      description,
    });

    res.status(201).json({
      ok: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateExperience(req, res, next) {
  try {
    const userId = req.user.id;
    const { experienceId } = req.params;
    const { title, company, start_date, end_date, is_current, description } = req.body;

    if (!title || !company) {
      return res.status(400).json({
        ok: false,
        error: "Title and company are required",
      });
    }

    const experience = await experienceRepository.updateExperience(
      userId,
      experienceId,
      {
        title,
        company,
        start_date,
        end_date,
        is_current,
        description,
      }
    );

    res.json({
      ok: true,
      data: experience,
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        ok: false,
        error: "Experience not found",
      });
    }
    next(error);
  }
}

export async function deleteExperience(req, res, next) {
  try {
    const userId = req.user.id;
    const { experienceId } = req.params;

    await experienceRepository.deleteExperience(userId, experienceId);

    res.json({
      ok: true,
      data: { message: "Experience deleted" },
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        ok: false,
        error: "Experience not found",
      });
    }
    next(error);
  }
}

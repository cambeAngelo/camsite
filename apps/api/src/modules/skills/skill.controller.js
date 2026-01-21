import * as skillRepository from "./skill.repository.js";

export async function getMySkills(req, res, next) {
  try {
    const userId = req.user.id;
    const skills = await skillRepository.getSkillsByUserId(userId);
    res.json({
      ok: true,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
}

export async function createSkill(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({
        ok: false,
        error: "Skill name is required",
      });
    }

    const skill = await skillRepository.createSkill(userId, {
      name,
      proficiency,
    });

    res.status(201).json({
      ok: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSkill(req, res, next) {
  try {
    const userId = req.user.id;
    const { skillId } = req.params;
    const { name, proficiency, position } = req.body;

    if (!name) {
      return res.status(400).json({
        ok: false,
        error: "Skill name is required",
      });
    }

    const skill = await skillRepository.updateSkill(userId, skillId, {
      name,
      proficiency,
      position,
    });

    res.json({
      ok: true,
      data: skill,
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        ok: false,
        error: "Skill not found",
      });
    }
    next(error);
  }
}

export async function deleteSkill(req, res, next) {
  try {
    const userId = req.user.id;
    const { skillId } = req.params;

    await skillRepository.deleteSkill(userId, skillId);

    res.json({
      ok: true,
      data: { message: "Skill deleted" },
    });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({
        ok: false,
        error: "Skill not found",
      });
    }
    next(error);
  }
}

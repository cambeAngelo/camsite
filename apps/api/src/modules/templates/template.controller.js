import * as templateRepository from "./template.repository.js";

export async function getTemplates(req, res, next) {
  try {
    const templates = await templateRepository.getTemplates();
    res.json({
      ok: true,
      data: templates,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTemplate(req, res, next) {
  try {
    const { id } = req.params;
    const template = await templateRepository.getTemplateById(id);

    if (!template) {
      return res.status(404).json({
        ok: false,
        error: "Template not found",
      });
    }

    res.json({
      ok: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTemplateBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const template = await templateRepository.getTemplateBySlug(slug);

    if (!template) {
      return res.status(404).json({
        ok: false,
        error: "Template not found",
      });
    }

    res.json({
      ok: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
}

import { getPortfolioBySlug, getUserPortfolio, updatePortfolio, incrementViewCount } from "./portfolio.repository.js";

export async function getPortfolio(req, res, next) {
  try {
    const { slug } = req.params;
    const portfolio = await getPortfolioBySlug(slug);

    if (!portfolio) {
      return res.status(404).json({ ok: false, error: "Portfolio not found" });
    }

    await incrementViewCount(portfolio.id);
    return res.json({ ok: true, data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function getMyPortfolio(req, res, next) {
  try {
    const portfolio = await getUserPortfolio(req.user.id);

    if (!portfolio) {
      return res.status(404).json({ ok: false, error: "Portfolio not found" });
    }

    return res.json({ ok: true, data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function updateMyPortfolio(req, res, next) {
  try {
    const { slug, title, description, theme, colorScheme, isPublished } = req.body;
    
    const portfolio = await getUserPortfolio(req.user.id);
    if (!portfolio) {
      return res.status(404).json({ ok: false, error: "Portfolio not found" });
    }

    const updated = await updatePortfolio(portfolio.id, req.user.id, {
      slug: slug || portfolio.slug,
      title: title || portfolio.title,
      description,
      theme,
      color_scheme: colorScheme,
      is_published: isPublished,
    });

    return res.json({ ok: true, data: updated });
  } catch (err) {
    if (err.message === "Unauthorized") {
      return res.status(403).json({ ok: false, error: "Unauthorized" });
    }
    next(err);
  }
}

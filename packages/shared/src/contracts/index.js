// Auth contracts
export const AUTH_API = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  GET_PROFILE: "/api/auth/me",
  UPDATE_PROFILE: "/api/auth/me",
};

// Portfolio contracts
export const PORTFOLIO_API = {
  GET: "/api/portfolios/:slug",
  GET_MINE: "/api/portfolios",
  UPDATE: "/api/portfolios",
};

// Project contracts
export const PROJECT_API = {
  GET_BY_PORTFOLIO: "/api/projects/portfolio/:portfolioId",
  GET_MINE: "/api/projects/my-projects",
  CREATE: "/api/projects",
  UPDATE: "/api/projects/:projectId",
  DELETE: "/api/projects/:projectId",
};

// Auth defaults
export const AUTH_DEFAULTS = {
  email: "",
  password: "",
  username: "",
  firstName: "",
  lastName: "",
};

// Portfolio defaults
export const PORTFOLIO_DEFAULTS = {
  title: "",
  slug: "",
  description: "",
  theme: "minimal",
  colorScheme: "dark",
  isPublished: false,
};

// Project defaults
export const PROJECT_DEFAULTS = {
  title: "",
  slug: "",
  description: "",
  imageUrl: "",
  projectUrl: "",
  githubUrl: "",
  technologies: [],
  tags: [],
  position: 0,
  isFeatured: false,
  isPublished: true,
};

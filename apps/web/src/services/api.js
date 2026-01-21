const API_BASE = "http://localhost:5000/api";

export const API = {
  AUTH: {
    REGISTER: `${API_BASE}/auth/register`,
    LOGIN: `${API_BASE}/auth/login`,
    ME: `${API_BASE}/auth/me`,
  },
  PORTFOLIOS: {
    LIST: `${API_BASE}/portfolios`,
    GET: (slug) => `${API_BASE}/portfolios/${slug}`,
    UPDATE: `${API_BASE}/portfolios`,
  },
  PROJECTS: {
    LIST: `${API_BASE}/projects`,
    GET_BY_PORTFOLIO: (portfolioId) => `${API_BASE}/projects/portfolio/${portfolioId}`,
    CREATE: `${API_BASE}/projects`,
    UPDATE: (projectId) => `${API_BASE}/projects/${projectId}`,
    DELETE: (projectId) => `${API_BASE}/projects/${projectId}`,
  },
};

// HTTP client with auth
export const http = {
  async request(url, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return response.json();
  },

  get(url) {
    return this.request(url);
  },

  post(url, data) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  put(url, data) {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(url) {
    return this.request(url, {
      method: "DELETE",
    });
  },
};

// Auth service
export const authService = {
  async getCurrentUser() {
    return http.get(API.AUTH.ME);
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
};

// Portfolio service
export const portfolioService = {
  async getPublic(slug) {
    return http.get(API.PORTFOLIOS.GET(slug));
  },

  async getMine() {
    return http.get(API.PORTFOLIOS.LIST);
  },

  async update(data) {
    return http.put(API.PORTFOLIOS.UPDATE, data);
  },
};

// Projects service
export const projectsService = {
  async getByPortfolio(portfolioId) {
    return http.get(API.PROJECTS.GET_BY_PORTFOLIO(portfolioId));
  },

  async getMyProjects() {
    return http.get(API.PROJECTS.LIST);
  },

  async create(data) {
    return http.post(API.PROJECTS.CREATE, data);
  },

  async update(projectId, data) {
    return http.put(API.PROJECTS.UPDATE(projectId), data);
  },

  async delete(projectId) {
    return http.delete(API.PROJECTS.DELETE(projectId));
  },
};

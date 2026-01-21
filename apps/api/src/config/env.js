import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "camsite",
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  
  upload: {
    maxSize: Number(process.env.MAX_UPLOAD_SIZE || 5242880), // 5MB
    uploadDir: process.env.UPLOAD_DIR || "./uploads",
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || "image/jpeg,image/png,image/webp,application/pdf").split(","),
  },
};

// Validate required env vars
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_NAME"];
const missing = requiredEnvVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.warn("⚠ Missing environment variables:", missing.join(", "));
}

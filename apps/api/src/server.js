import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { testConnection } from "./db/pool.js";

const app = createApp();

async function start() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error("Failed to connect to database. Exiting...");
      process.exit(1);
    }

    app.listen(env.port, () => {
      console.log(`\n🚀 Server running on http://localhost:${env.port}`);
      console.log(`📡 API: http://localhost:${env.port}/api`);
      console.log(`🌍 Client: ${env.clientOrigin}\n`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { databaseConnection } from "./lib/db.js";
import { seedDatabase, shouldSeedDatabase } from "./lib/seed.js";
import { logger } from "./utils/logger.js";

const startServer = async () => {
  try {
    const app = await createApp();
    await databaseConnection.connect();

    // Auto-seed in development if needed
    // if (env.NODE_ENV === "development") {
    //   try {
    //     const shouldSeed = await shouldSeedDatabase();
    //     if (shouldSeed) {
    //       logger.info("No seed data found. Starting seeding process...");
    //       await seedDatabase();
    //     }
    //   } catch (error) {
    //     logger.error("Auto-seeding check failed:", error);
    //   }
    // }

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received: closing server");
      server.close(async () => {
        await databaseConnection.disconnect();
        logger.info("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

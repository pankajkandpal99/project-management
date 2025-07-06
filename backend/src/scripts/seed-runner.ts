import { seedDatabase } from "@/lib/seed.js";
import { logger } from "@/utils/logger.js";

(async () => {
  try {
    console.log("Seed script starting 1 ...");
    logger.info("Starting seed process...");
    await seedDatabase();
    logger.info("Seed process completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Seed process failed:", error);
    process.exit(1);
  }
})();

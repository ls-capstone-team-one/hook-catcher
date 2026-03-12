import { cleanupExpiredBins } from "../services/binService";

const ONE_HOUR_INTERVAL: number = 5000;

export function startScheduledCleanup(): NodeJS.Timeout {
  const cleanup = (): void => {
    cleanupExpiredBins()
      .then((count) => {
        if (count > 0) {
          console.log(`Cleaned up ${count} expired bins.`);
        }
      })
      .catch((error) => {
        console.error("Cleanup error:", error);
      });
  };

  cleanup();
  return setInterval(cleanup, ONE_HOUR_INTERVAL);
}

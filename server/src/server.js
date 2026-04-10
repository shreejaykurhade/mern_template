const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');
const logger = require('./config/logger');

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  const server = app.listen(config.port, () => {
    logger.info(` Server running in ${config.env} mode on port ${config.port}`);
    logger.info(` API Docs: http://localhost:${config.port}/api-docs`);
    logger.info(` Health:   http://localhost:${config.port}/api/v1/health`);
  });

  // ── Graceful Shutdown ──
  const shutdown = async (signal) => {
    logger.info(`${signal} received. Shutting down gracefully…`);
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });

    // Force shutdown after 10s
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // ── Unhandled Errors ──
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    shutdown('unhandledRejection');
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    shutdown('uncaughtException');
  });
};

startServer();

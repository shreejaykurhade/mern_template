const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  const config = require('./index');
  try {
    const conn = await mongoose.connect(config.mongo.uri, {
      // Mongoose 8 uses these defaults, but being explicit for clarity
      autoIndex: config.env !== 'production',
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting reconnect…');
    });
  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

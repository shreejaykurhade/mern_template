const Redis = require('ioredis');
const logger = require('./logger');

let redisClient = null;

/**
 * Get or create a Redis client.
 * Returns null if Redis is disabled or unavailable — the app degrades gracefully.
 */
const getRedisClient = () => {
  const config = require('./index');

  if (!config.redis.enabled) {
    return null;
  }

  if (redisClient) {
    return redisClient;
  }

  try {
    redisClient = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          logger.warn('Redis: max retries reached, giving up');
          return null; // stop retrying
        }
        return Math.min(times * 200, 2000);
      },
    });

    redisClient.on('connect', () => logger.info('Redis connected'));
    redisClient.on('error', (err) => logger.error('Redis error:', err.message));
    redisClient.on('close', () => logger.warn('Redis connection closed'));

    return redisClient;
  } catch (error) {
    logger.warn('Redis initialization failed — running without cache:', error.message);
    return null;
  }
};

/**
 * Cache helper — wraps a function with Redis caching.
 * Falls back to direct execution if Redis is unavailable.
 */
const cacheWrapper = async (key, ttlSeconds, fn) => {
  const client = getRedisClient();
  if (!client) return fn();

  try {
    const cached = await client.get(key);
    if (cached) return JSON.parse(cached);

    const result = await fn();
    await client.setex(key, ttlSeconds, JSON.stringify(result));
    return result;
  } catch {
    return fn(); // fallback on cache error
  }
};

/**
 * Invalidate cache keys matching a pattern.
 */
const invalidateCache = async (pattern) => {
  const client = getRedisClient();
  if (!client) return;

  try {
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch (error) {
    logger.warn('Cache invalidation failed:', error.message);
  }
};

module.exports = { getRedisClient, cacheWrapper, invalidateCache };

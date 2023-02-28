export default {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "nicasource",
};

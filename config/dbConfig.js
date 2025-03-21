module.exports = {
  HOST: "localhost",
  USER: "postgres", // Changed from "root" to default PostgreSQL user
  PASSWORD: "root", // Keep same password or change as needed
  DB: "gbs",
  dialect: "postgres", // Changed from "mysql" to "postgres"
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
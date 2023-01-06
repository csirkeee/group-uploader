const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT);
const dbSchema = process.env.DB_SCHEMA;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

export {
  dbHost,
  dbPort,
  dbSchema,
  dbUser,
  dbPass,
}
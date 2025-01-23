import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const PostgresDataSource: PostgresConnectionOptions = {
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Bahodir2008",
  database: "gqlkallaogriq",
  type: "postgres",
  entities: [],
  synchronize: true,
  logging: ["query", "error", "schema", "migration", "warn"],
};

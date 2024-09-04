import { Sequelize } from "sequelize";
import { ConfigDatabaseEnum } from "./types";
import config from "config";

export class SequelizeConnection {
  createConnection(): Sequelize | undefined {
    const dbDatabase: string = config.get(ConfigDatabaseEnum.DB_DATABASE);
    const dbUsername: string = config.get(ConfigDatabaseEnum.DB_USERNAME);
    const dbPassword: string = config.get(ConfigDatabaseEnum.DB_PASSWORD);
    const dbHost: string = config.get(ConfigDatabaseEnum.DB_HOST);

    try {
      const sequelizeConnection: Sequelize = new Sequelize(
        dbDatabase,
        dbUsername,
        dbPassword,
        {
          host: dbHost,
          dialect: "mysql",
          logging: false,
        }
      );

      return sequelizeConnection;
    } catch (error: any) {
      console.log("Error getting Connection");
      console.log(error);
    }
  }

  async connect(): Promise<void> {
    try {
      const connection = this.createConnection();

      if (connection) {
        await connection.authenticate();
        console.log("Database connected");
      }
    } catch (error: any) {
      console.log("Error connecting");
      console.log(error);
    }
  }
}

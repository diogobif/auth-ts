import { Sequelize, Optional, Model, DataTypes } from "sequelize";
import { SequelizeConnection } from "../sequelizeConnection";

export interface SessionAttributes {
  user_id: string;
  token: string;
  refresh_token: string;
  createdAt: Date;
}

const sequelizeManager = new SequelizeConnection();
const sequelizeConnection: Sequelize | undefined =
  sequelizeManager.createConnection();

export interface SessionInput
  extends Optional<SessionAttributes, "createdAt"> {}
export interface SessionOutput extends Required<SessionAttributes> {}

class Session
  extends Model<SessionAttributes, SessionInput>
  implements SessionAttributes
{
  public user_id!: string;
  public token!: string;
  public refresh_token!: string;
  public createdAt!: Date;
}

Session.init(
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize: sequelizeConnection!,
    tableName: "sessions",
    timestamps: true,
    updatedAt: false,
  }
);

export default Session;

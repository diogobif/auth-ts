import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { SequelizeConnection } from "../sequelizeConnection";
import bcrypt from "bcrypt";

const sequelizeManager = new SequelizeConnection();
const sequelizeConnection: Sequelize | undefined =
  sequelizeManager.createConnection();

export interface UserAtttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAtttributes, "id"> {}

class User
  extends Model<UserAtttributes, UserInput>
  implements UserAtttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async comparePasswords(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    sequelize: sequelizeConnection!,
    timestamps: true,
    updatedAt: true,
  }
);

export default User;

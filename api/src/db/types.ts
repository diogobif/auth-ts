export enum ConfigDatabaseEnum {
  DB_DATABASE = "db.database",
  DB_USERNAME = "db.user",
  DB_PASSWORD = "db.password",
  DB_HOST = "db.host",
}

export enum RestResponseCodesEnum {
  SUCCESS = 200,
  DUPLICATED = 409,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 403,
  NOT_FOUND = 404,
  ERROR = 500,
}

export type ServiceResponse<T> = {
  response?: T;
  code: number;
  message?: string;
};

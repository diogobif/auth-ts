import User from "./models/user.model";

const dbInit = () => {
  User.sync({ alter: true });
};

export default dbInit;

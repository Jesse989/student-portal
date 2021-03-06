const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: false
    },
    role: {
      type: DataTypes.STRING,
      unique: false
    }
  });

  return User;
};

module.exports = user;

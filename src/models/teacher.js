const teacher = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: false
    }
  });

  Teacher.associate = models => {
    Teacher.hasMany(models.Student);
  };
  return Teacher;
};

module.exports = teacher;

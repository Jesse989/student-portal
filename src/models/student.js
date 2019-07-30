const student = (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: false
    }
  });

  Student.associate = models => {
    Student.belongsTo(models.Teacher);
  };
  return Student;
};

module.exports = student;

import models from '../models';

export const createTeachersWithStudents = async () => {
  await models.Teacher.create(
    {
      username: 'Teacher0',
      password: 'password',
      students: [
        {
          username: 'Student0',
          password: 'password'
        }
      ]
    },
    {
      include: [models.Student]
    }
  );

  await models.Teacher.create(
    {
      username: 'Teacher1',
      password: 'password',
      students: [
        {
          username: 'Student1',
          password: 'password'
        },
        {
          username: 'Student2',
          password: 'password'
        }
      ]
    },
    {
      include: [models.Student]
    }
  );
};

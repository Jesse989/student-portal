import { sequelize } from '../models';
import { createTeachersWithStudents } from '../seed/createTeachersWithStudents';

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createTeachersWithStudents();
  }
});

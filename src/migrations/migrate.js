import { sequelize } from '../models';
import { createUsers } from '../seed/createUsers';

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsers();
  }
});

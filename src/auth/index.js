import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

export const auth = (app, models) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await models.Teacher.findOne({
          where: {
            username
          }
        });
        if (!user) {
          return done(null, false, { message: 'Incorrect password.' });
        } else if (!user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};

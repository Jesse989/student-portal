import passport from 'passport';
import bcrypt from 'bcrypt';
const LocalStrategy = require('passport-local').Strategy;

export const passportConfig = models => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const result = await models.User.findOne({
        where: {
          id: userId
        }
      });

      return done(null, result);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await models.User.findOne({
          where: {
            username
          }
        });
        if (!user) {
          return done(null, false, { message: 'Incorrect password.' });
        } else if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};

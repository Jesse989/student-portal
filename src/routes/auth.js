import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', (req, res, done) => {
  passport.authenticate('local', {
    successRedirect: '/auth/me',
    failureRedirect: '/auth/login',
    failureFlash: false,
    session: false
  })(req, res, done);
});

router.get('/me', (req, res) => {
  passport.authenticate('local', {
    session: false
  });
  return res.send({ authenticated: req.isAuthenticated() });
});

export default router;

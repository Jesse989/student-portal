import Router from 'express';
const router = Router();
import passport from 'passport';

router.get(
  '/',
  passport.authenticate('local', { failureRedirect: '/auth' }),
  async (req, res) => {
    res.status(200).send(`hello ${req.body.username}`);
  }
);

export default router;

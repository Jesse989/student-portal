import { Router } from 'express';
import models from '../models';
import passport from 'passport';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/logout', async (req, res) => {
  req.logout();
  res.send({ success: true, message: 'logged out success' });
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
  res.send({ success: true, message: 'logged in success' });
});

router.get('/', async (req, res) => {
  // all
  if (!req.isAuthenticated()) {
    res.send({ success: false, message: 'please login first' });
  }
  try {
    const results = await models.User.findAll();
    return results
      ? res.status(200).send({ success: true, results })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.get('/:username', async (req, res) => {
  // one
  try {
    const result = await models.User.findOne({
      where: {
        username: req.params.username
      }
    });
    return result
      ? res.status(200).send({ success: true, result })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.put('/:username', async (req, res) => {
  // update by name
  try {
    const result = await models.User.update(
      {
        username: req.body.newUsername,
        password: req.body.newPassword,
        role: req.body.newRole
      },
      {
        where: {
          username: req.params.username
        }
      }
    );

    return result
      ? res.status(200).send({ success: true })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.post('/', async (req, res) => {
  // create
  try {
    const result = await models.User.create({
      username: req.body.newUsersName,
      password: bcrypt.hashSync(req.body.newUsersPassword, 12)
    });

    return result
      ? res.status(200).send({ success: true })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.delete('/:username', async (req, res) => {
  try {
    // remove by name
    const result = await models.User.destroy({
      where: {
        username: req.params.username
      }
    });
    return result
      ? res.status(200).send({ success: true })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

export default router;

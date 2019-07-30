import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/', async (req, res) => {
  // by name
  try {
    const results = await models.Teacher.findAll({
      include: [models.Student]
    });
    return results
      ? res.status(200).send({ success: true, results })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.get('/:username', async (req, res) => {
  // all
  try {
    const teacher = await models.Teacher.findOne({
      where: {
        username: req.params.username
      },
      include: [models.Student]
    });
    return teacher
      ? res.status(200).send({ success: true, teacher })
      : res.status(505).send({ success: false });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.put('/:username', async (req, res) => {
  // update by name
  try {
    const result = await models.Teacher.update(
      {
        username: req.body.username,
        password: req.body.password
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
  try {
    // create
    const result = await models.Teacher.create({
      username: req.body.username,
      password: req.body.password
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
    const teacher = await models.Teacher.destroy({
      where: {
        username: req.params.username
      }
    });
    return teacher
      ? res.status(200).send('success')
      : res.status(505).send({ success: false, error });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

export default router;

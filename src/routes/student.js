import { Router } from 'express';
import models from '../models';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const results = await models.Student.findAll();
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
    const result = await models.Student.findOne({
      where: {
        username: req.params.username
      }
    });
    return res.status(200).send({ success: true, result });
  } catch (error) {
    return res.status(505).send({ success: false, error });
  }
});

router.put('/:username', async (req, res) => {
  // update by name
  try {
    const result = await models.Student.update(
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
  // create
  try {
    const result = await models.Student.create({
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
    const result = await models.Student.destroy({
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

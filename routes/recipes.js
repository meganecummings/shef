const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.recipeCtrl.index);
router.get('/:name', ctrl.recipeCtrl.show);
router.post('/', ctrl.recipeCtrl.new);
router.post('/:_id', ctrl.recipeCtrl.update);
router.delete('/:_id', ctrl.recipeCtrl.delete);

module.exports = router;
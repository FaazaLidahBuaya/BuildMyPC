const express = require('express');
const router = express.Router();
const { getComponents, getComponentById, getCompatibleComponents, getPresetBuild } = require('../controllers/componentController');

router.get('/preset/:tier', getPresetBuild);
router.get('/', getComponents);
router.get('/:id', getComponentById);
router.get('/:category/compatible', getCompatibleComponents);

module.exports = router;

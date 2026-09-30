const express = require('express');
const router = express.Router();
const { createBuild, getBuilds, getBuildById, updateBuild, deleteBuild } = require('../controllers/buildController');

router.post('/', createBuild);
router.get('/', getBuilds);
router.get('/:id', getBuildById);
router.put('/:id', updateBuild);
router.delete('/:id', deleteBuild);

module.exports = router;

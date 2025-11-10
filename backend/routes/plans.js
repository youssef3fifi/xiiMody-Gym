const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', planController.getAllPlans);
router.get('/:id', planController.getPlanById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const upload = require('../middleware/upload');
const controller = require('../controllers/candidateController');


// POST /api/candidates (multipart/form-data) - resume optional
router.post(
'/',
upload.single('resume'),
[
body('name').notEmpty().withMessage('Name required'),
body('email').isEmail().withMessage('Invalid email'),
body('phone').matches(/^\+?[0-9]{7,15}$/).withMessage('Invalid phone'),
body('jobTitle').notEmpty().withMessage('Job title required'),
],
controller.createCandidate
);


// GET /api/candidates
router.get('/', controller.getCandidates);


// PUT /api/candidates/:id/status
router.put('/:id/status', [body('status').notEmpty()], controller.updateStatus);


// DELETE /api/candidates/:id
router.delete('/:id', controller.deleteCandidate);


// GET /api/candidates/metrics/all
router.get('/metrics/all', controller.getMetrics);


module.exports = router;
const express = require('express');
const {
    getCurrentUserProfile,
    getUserProfileById,
    updateUserProfile,
} = require('../controllers/profileController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCurrentUserProfile);

router.get('/:userId', authMiddleware, getUserProfileById);

router.put('/', authMiddleware, updateUserProfile);

module.exports = router;


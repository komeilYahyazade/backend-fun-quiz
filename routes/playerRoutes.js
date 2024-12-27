const express = require('express');
const {
    answerQuestion,
    getQuestionsByCategory,
    getRandomQuestion,
    followUser,
    getLeaderboard,
} = require('../controllers/playerController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { allowRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/questions/:id/answer', authMiddleware, allowRoles(['player']), answerQuestion);

router.get('/questions/category/:categoryName', authMiddleware, allowRoles(['player']), getQuestionsByCategory);

router.get('/questions/random', authMiddleware, allowRoles(['player']), getRandomQuestion);

router.post('/follow/:userId', authMiddleware, allowRoles(['player']), followUser);

router.get('/leaderboard', authMiddleware, allowRoles(['player']), getLeaderboard);

module.exports = router;


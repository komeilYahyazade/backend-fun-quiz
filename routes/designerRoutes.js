const express = require('express');
const {
    createQuestion,
    updateQuestion,
    getQuestions,
    getCategories,
    createCategory,
} = require('../controllers/designerController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { allowRoles } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/categories', authMiddleware, allowRoles(['designer']), createCategory);
router.get('/categories', authMiddleware, allowRoles(['designer']), getCategories);

router.post('/questions', authMiddleware, allowRoles(['designer']), createQuestion);
router.put('/questions/:id', authMiddleware, allowRoles(['designer']), updateQuestion);
router.get('/questions', authMiddleware, allowRoles(['designer']), getQuestions);

module.exports = router;


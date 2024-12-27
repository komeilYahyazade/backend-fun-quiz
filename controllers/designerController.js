const Question = require('../models/Question');
const Category = require('../models/Category');

exports.createQuestion = async (req, res) => {
    try {
        const { text, options, correctAnswer, difficulty, category } = req.body;

        if (!text || !options || options.length !== 4 || !correctAnswer || !difficulty || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const question = await Question.create({
            text,
            options,
            correctAnswer,
            difficulty,
            category,
            createdBy: req.user.id,
        });

        res.status(201).json({ message: 'Question created successfully.', question });
    } catch (error) {
        res.status(500).json({ message: 'Error creating question.', error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, options, correctAnswer, difficulty, category } = req.body;

        if (!text || !options || options.length !== 4 || !correctAnswer || !difficulty || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        if (String(question.createdBy) !== String(req.user.id)) {
            return res.status(403).json({ message: 'You are not authorized to update this question.' });
        }

        question.text = text;
        question.options = options;
        question.correctAnswer = correctAnswer;
        question.difficulty = difficulty;
        question.category = category;

        await question.save();

        res.status(200).json({ message: 'Question updated successfully.', question });
    } catch (error) {
        res.status(500).json({ message: 'Error updating question.', error: error.message });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('category', 'name')
            .populate('createdBy', 'username');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions.', error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists.' });
        }

        const category = await Category.create({ name });
        res.status(201).json({ message: 'Category created successfully.', category });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category.', error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories.', error: error.message });
    }
};


const Question = require('../models/Question');
const User = require('../models/User');
const Category = require('../models/Category');

exports.answerQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        const isCorrect = question.correctAnswer === answer;
        if (isCorrect) {
            // Update player's score
            const player = await User.findById(req.user.id);
            player.score += 10;
            await player.save();
        }

        res.status(200).json({
            message: isCorrect ? 'Correct answer!' : 'Wrong answer.',
            isCorrect,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error answering question.', error: error.message });
    }
};

exports.getQuestionsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const questions = await Question.find({ category: category._id });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions by category.', error: error.message });
    }
};

exports.getRandomQuestion = async (req, res) => {
    try {
        const count = await Question.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuestion = await Question.findOne().skip(randomIndex);

        res.status(200).json(randomQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving random question.', error: error.message });
    }
};

exports.followUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure the user to follow exists
        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const currentUser = await User.findById(req.user.id);

        if (currentUser.following.includes(userId)) {
            return res.status(400).json({ message: 'You are already following this user.' });
        }

        currentUser.following.push(userId);
        await currentUser.save();

        userToFollow.followers.push(req.user.id);
        await userToFollow.save();

        res.status(200).json({ message: 'User followed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error following user.', error: error.message });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({ role: 'player' })
            .sort({ score: -1 })
            .select('username score')
            .limit(10);

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving leaderboard.', error: error.message });
    }
};


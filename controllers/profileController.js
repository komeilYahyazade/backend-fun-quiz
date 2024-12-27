const User = require('../models/User');
const Question = require('../models/Question');
const Category = require('../models/Category');

exports.getCurrentUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (user.role === 'designer') {
            const categories = await Category.find({ createdBy: req.user.id }).select('name');
            const questions = await Question.find({ createdBy: req.user.id }).select('text');
            return res.status(200).json({
                user,
                categories,
                questions,
            });
        }

        if (user.role === 'player') {
            return res.status(200).json({
                user,
                rank: await calculatePlayerRank(req.user.id),
            });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile.', error: error.message });
    }
};

exports.getUserProfileById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role === 'designer') {
            const categories = await Category.find({ createdBy: userId }).select('name');
            const questions = await Question.find({ createdBy: userId }).select('text');
            return res.status(200).json({
                user,
                categories,
                questions,
            });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile.', error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (username) user.username = username;
        if (password) user.password = password;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile.', error: error.message });
    }
};

const calculatePlayerRank = async (playerId) => {
    const players = await User.find({ role: 'player' }).sort({ score: -1 }).select('_id');
    const rank = players.findIndex((player) => String(player._id) === String(playerId)) + 1;
    return rank;
};


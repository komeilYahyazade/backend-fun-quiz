const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['designer', 'player'], required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users following this user
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users this user is following
    score: { type: Number, default: 0 }, // Player score for leaderboard
});

module.exports = mongoose.model('User', userSchema);


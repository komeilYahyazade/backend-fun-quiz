const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    points: { type: Number, default: 0 },
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);


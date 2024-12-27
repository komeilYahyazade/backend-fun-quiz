const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true }, // Question text
    options: [{ type: String, required: true }], // Array of 4 options
    correctAnswer: { type: String, required: true }, // Correct answer
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }, // Difficulty level
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Category reference
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Designer reference
    relatedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] // Related questions
});

module.exports = mongoose.model('Question', questionSchema);


const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ["javascript", "python", "java", "cpp"], // Extend with supported languages
    required: true,
  },
  results: [
    {
      input: String,
      expectedOutput: String,
      output: String,
      isPassed: Boolean,
    },
  ],
  passedCount: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);

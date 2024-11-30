const mongoose = require("mongoose");

const testcaseSchema = new mongoose.Schema({
  input: {
    type: String,
  },
  output: {
    type: String,
  },
  problemid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
});

const TestCase = mongoose.model("TestCase", testcaseSchema);
module.exports = TestCase;

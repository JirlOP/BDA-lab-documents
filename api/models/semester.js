const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semesterID: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

module.exports = mongoose.model('Semester', semesterSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  studentID: { type: String, required: true },
  email: { type: String },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseID: { type: String, required: true },
  credits: { type: Number, required: true, min: 0, max: 12 },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester',
    required: true,
  },
  students: [studentSchema],
});

courseSchema.index({ courseID: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);

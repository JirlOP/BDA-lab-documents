const Semester = require('../models/semester');
const Course = require('../models/course');

// @desc    Create a new semester
// @route   POST /api/semesters
exports.createSemester = async (req, res) => {
  try {
    const newSemester = new Semester(req.body);
    const semester = await newSemester.save();
    res.status(201).json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all semesters
// @route   GET /api/semesters
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate('courses');
    res.status(200).json(semesters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single semester by ID
// @route   GET /api/semesters/:id
exports.getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate('courses');
    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }
    res.status(200).json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a semester
// @route   PUT /api/semesters/:id
exports.updateSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }
    res.status(200).json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a semester
// @route   DELETE /api/semesters/:id
exports.deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }

    // Delete all courses associated with the semester
    await Course.deleteMany({ _id: { $in: semester.courses } });

    // Delete the semester itself
    await semester.remove();

    res.status(200).json({ msg: 'Semester and associated courses removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

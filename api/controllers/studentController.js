const Course = require('../models/course');

// @desc    Add a student to a course
// @route   POST /api/courses/:courseId/students
exports.addStudentToCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course.students.push(req.body);
    await course.save();

    res.status(201).json(course.students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all students in a course
// @route   GET /api/courses/:courseId/students
exports.getStudentsInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json(course.students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single student in a course
// @route   GET /api/courses/:courseId/students/:studentId
exports.getStudentInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const student = course.students.id(req.params.studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a student in a course
// @route   PUT /api/courses/:courseId/students/:studentId
exports.updateStudentInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const student = course.students.id(req.params.studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.set(req.body);
    await course.save();

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Remove a student from a course
// @route   DELETE /api/courses/:courseId/students/:studentId
exports.removeStudentFromCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const student = course.students.id(req.params.studentId);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.deleteOne();
    await course.save();

    res.status(200).json({ msg: 'Student removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

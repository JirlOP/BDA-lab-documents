const Course = require('../models/course');
const Semester = require('../models/semester');

// @desc    Create a new course
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const { name, courseID, credits, semester: semesterId } = req.body;

    const semester = await Semester.findById(semesterId);
    if (!semester) {
      return res.status(404).json({ msg: 'Semester not found' });
    }

    const newCourse = new Course({
      name,
      courseID,
      credits,
      semester: semesterId,
    });

    const course = await newCourse.save();

    semester.courses.push(course._id);
    await semester.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('semester', 'semesterID');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'semester',
      'semesterID'
    );
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Remove the course from the semester's list of courses
    await Semester.updateOne(
      { _id: course.semester },
      { $pull: { courses: course._id } }
    );

    res.status(200).json({ msg: 'Course removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

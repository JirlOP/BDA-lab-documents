const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const {
  addStudentToCourse,
  getStudentsInCourse,
  getStudentInCourse,
  updateStudentInCourse,
  removeStudentFromCourse,
} = require('../controllers/studentController');

router.route('/').post(createCourse).get(getAllCourses);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

// Student routes
router.route('/:courseId/students').post(addStudentToCourse).get(getStudentsInCourse);
router
  .route('/:courseId/students/:studentId')
  .get(getStudentInCourse)
  .put(updateStudentInCourse)
  .delete(removeStudentFromCourse);

module.exports = router;

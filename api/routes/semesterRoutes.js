const express = require('express');
const router = express.Router();
const {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
} = require('../controllers/semesterController');

router.route('/').post(createSemester).get(getAllSemesters);
router
  .route('/:id')
  .get(getSemesterById)
  .put(updateSemester)
  .delete(deleteSemester);

module.exports = router;

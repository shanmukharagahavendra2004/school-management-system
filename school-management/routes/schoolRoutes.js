const express = require('express');
const router = express.Router();

const { addSchoolController, listSchoolsController } = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validators');


router.post('/addSchool', validateAddSchool, addSchoolController);


router.get('/listSchools', validateListSchools, listSchoolsController);

module.exports = router;

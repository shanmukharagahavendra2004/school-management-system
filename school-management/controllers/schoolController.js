const { addSchool, getAllSchools } = require('../models/schoolModel');
const { haversineDistance } = require('../utils/distance');

const addSchoolController = async (req, res) => {
  try {
    const school = await addSchool(req.body);

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: school,
    });
  } catch (err) {
    console.error('addSchool error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to add school',
    });
  }
};


const listSchoolsController = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLng = parseFloat(req.query.longitude);

    const schools = await getAllSchools();

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found',
        data: [],
      });
    }

    
    const schoolsWithDistance = schools
      .map((school) => ({
        ...school,
        distance_km: haversineDistance(
          userLat,
          userLng,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: `Found ${schoolsWithDistance.length} school(s)`,
      user_location: { latitude: userLat, longitude: userLng },
      data: schoolsWithDistance,
    });
  } catch (err) {
    console.error('listSchools error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch schools',
    });
  }
};

module.exports = { addSchoolController, listSchoolsController };

const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;
  const errors = [];

  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('name is required and must be a non-empty string');
  } else if (name.trim().length > 255) {
    errors.push('name must not exceed 255 characters');
  }

  
  if (!address || typeof address !== 'string' || address.trim().length === 0) {
    errors.push('address is required and must be a non-empty string');
  } else if (address.trim().length > 500) {
    errors.push('address must not exceed 500 characters');
  }

  
  if (latitude === undefined || latitude === null || latitude === '') {
    errors.push('latitude is required');
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat)) {
      errors.push('latitude must be a valid number');
    } else if (lat < -90 || lat > 90) {
      errors.push('latitude must be between -90 and 90');
    }
  }

  
  if (longitude === undefined || longitude === null || longitude === '') {
    errors.push('longitude is required');
  } else {
    const lng = parseFloat(longitude);
    if (isNaN(lng)) {
      errors.push('longitude must be a valid number');
    } else if (lng < -180 || lng > 180) {
      errors.push('longitude must be between -180 and 180');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};


const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;
  const errors = [];

  if (latitude === undefined || latitude === '') {
    errors.push('latitude query parameter is required');
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat)) {
      errors.push('latitude must be a valid number');
    } else if (lat < -90 || lat > 90) {
      errors.push('latitude must be between -90 and 90');
    }
  }

  if (longitude === undefined || longitude === '') {
    errors.push('longitude query parameter is required');
  } else {
    const lng = parseFloat(longitude);
    if (isNaN(lng)) {
      errors.push('longitude must be a valid number');
    } else if (lng < -180 || lng > 180) {
      errors.push('longitude must be between -180 and 180');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = { validateAddSchool, validateListSchools };

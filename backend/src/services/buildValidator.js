const validateBuild = (compatibilityResult) => {
  if (compatibilityResult.errors.length > 0) {
    return { valid: false, message: 'Build tidak valid karena ada komponen yang tidak kompatibel.' };
  }
  
  if (compatibilityResult.warnings.length > 0) {
    return { valid: true, message: 'Build valid namun memiliki peringatan.' };
  }

  return { valid: true, message: 'Build valid dan sepenuhnya kompatibel.' };
};

module.exports = { validateBuild };

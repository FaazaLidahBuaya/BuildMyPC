exports.parseJsonFields = (record) => {
  if (!record) return null;
  const data = record.toJSON ? record.toJSON() : record;
  if (data.components && typeof data.components === 'string') {
    try { data.components = JSON.parse(data.components); } catch(e){}
  }
  if (data.compatibilityDetails && typeof data.compatibilityDetails === 'string') {
    try { data.compatibilityDetails = JSON.parse(data.compatibilityDetails); } catch(e){}
  }
  return data;
};
exports.GPU_JSON_FIELDS = [];
exports.MB_JSON_FIELDS = [];
exports.CASE_JSON_FIELDS = [];
exports.COOLER_JSON_FIELDS = [];
exports.PSU_JSON_FIELDS = [];
exports.BUILD_JSON_FIELDS = ['components', 'compatibilityDetails'];
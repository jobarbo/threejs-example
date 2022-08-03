// utils
const deepMerge = require('../utils/deepMerge');

/**
 * BrowserSync
 * configuration
 * object
 *
 */
module.exports = deepMerge({
	proxy: 'blueprint.local',
	host: 'blueprint.local',
	open: 'external',
});

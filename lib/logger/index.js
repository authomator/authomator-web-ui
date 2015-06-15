var morgan = require('morgan');
var config = require('config');

var defaultModuleConfig = {
  format: 'combined',
  options: {}
};

module.exports = function(options){

  config.util.extendDeep(defaultModuleConfig, options)
  config.util.setModuleDefaults('morgan', defaultModuleConfig);

  var moduleConfig = config.get('morgan');
  console.log(moduleConfig);
  return morgan(moduleConfig.format, moduleConfig.options);
};

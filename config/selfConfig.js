console.log('build env:'+process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./selfConfig.prod.js');
}else if (process.env.NODE_ENV === 'development') {
	module.exports = require('./selfConfig.dev.js');
}


const nconf = require('nconf')

let env 	  = process.env.NODE_ENV || 'development',
	  file 	  = './etc/.' + env + '.config.json'

nconf.argv().env().file({ file: file })

module.exports = nconf

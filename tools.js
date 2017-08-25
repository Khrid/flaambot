/**
 * http://usejsdoc.org/
 */
function scanDir(dir, callback) {
	const fs = require('fs')
	var f = []
	fs.readdir(dir, (err, files) => {
		if (err) {
	        throw err;
	    }

		if(files.length > 0) {
			files.foreach(file => {
				f.push(file)
			})
		} else {
			console.log("empty")
		}

		return callback(null, f)
	})
}

function sendToLogChannel(message) {
	module.exports.client.channels.get(module.exports.CHAN_ID_DKC_FLAAMLOGS).send(message);
}

module.exports.scanDir = scanDir
module.exports.sendToLogChannel = sendToLogChannel
module.exports.client = 'test'
module.exports.CHAN_ID_DKC_FLAAMLOGS = ''
/**
 * http://usejsdoc.org/
 */
function scanDir(dir) {
	const fs = require('fs')
	fs.readdir(dir, (err, files) => {
		return files
	})
}

function sendToLogChannel(message) {
	module.exports.client.channels.get(module.exports.CHAN_ID_DKC_FLAAMLOGS).send(message);
}

module.exports.scanDir = scanDir
module.exports.sendToLogChannel = sendToLogChannel
module.exports.client = 'test'
module.exports.CHAN_ID_DKC_FLAAMLOGS = ''
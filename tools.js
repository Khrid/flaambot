/**
 * http://usejsdoc.org/
 */
function scanDir(dir) {
	const fs = require('fs')
	fs.readdir(dir, (err, files) => {
		if(files.length > 0) {
			files.foreach(file => {
				sendToLogChannel(file)
			})
		} else {
			sendToLogChannel("Plus de photos de Flaam");
		}
	})
}

function sendToLogChannel(message) {
	module.exports.client.channels.get(CHAN_ID_DKC_FLAAMLOGS).send(message);
}

module.exports.scanDir = scanDir
module.exports.sendToLogChannel = sendToLogChannel
module.exports.client = 'test'
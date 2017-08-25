/**
 * http://usejsdoc.org/
 */
function scanDir(dir) {
	const fs = require('fs')
	var f = [];
	fs.readdir(dir, (err, files) => {
		try {
			files.foreach(file => {
				f.push(file)
				console.log(file)
			})
		} catch(err) {
			
		} 
	})
	console.log(f)
	return f
}

function sendToLogChannel(message) {
	module.exports.client.channels.get(module.exports.CHAN_ID_DKC_FLAAMLOGS).send(message);
}

module.exports.scanDir = scanDir
module.exports.sendToLogChannel = sendToLogChannel
module.exports.client = 'test'
module.exports.CHAN_ID_DKC_FLAAMLOGS = ''
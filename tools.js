/**
 * http://usejsdoc.org/
 */
function scanDir(dir) {
	const fs = require('fs')
	var f = []
	fs.readdir(dir, (err, files) => {
		if (err) {
	        throw err;
	    }

		if(files.length > 0) {
			files.forEach(file => {
				f.push(file)
				console.log(file)
			})
		} else {
			console.log("empty")
		}

		return f
	})
}

function sendToLogChannel(message) {
	module.exports.client.channels.get(module.exports.CHAN_ID_DKC_FLAAMLOGS).send(message);
}

function sendImageToLogChannel(title, file) {
	module.exports.client.channels.get(module.exports.CHAN_ID_DKC_FLAAMLOGS).send(title, {
        files: [
        	file
        ]
      });
}

module.exports.scanDir = scanDir
module.exports.sendToLogChannel = sendToLogChannel
module.exports.client = 'test'
module.exports.CHAN_ID_DKC_FLAAMLOGS = ''
/**
 * http://usejsdoc.org/
 */
module.exports = {

scanDir: function (dir) {
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
},

sendToLogChannel: function (message) {
	module.exports.client.channels.get(CHAN_ID_DKC_FLAAMLOGS).send(message);
},

client = 0

}
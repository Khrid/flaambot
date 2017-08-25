// Import the discord.js module
const Discord = require('discord.js');
var schedule = require('node-schedule');

const CHAN_ID_DKC_GENERAL = "349976478538268674";
const CHAN_ID_DKC_FLAAMLOGS = "350728940501073924";

const CHAN_ID_QGS_FLAAMCHAN = "330420560972742656";

// Create an instance of a Discord client
var client = new Discord.Client();

client.on('ready', () => { 
	var revision = require('child_process')
	  .execSync('git rev-parse HEAD')
	  .toString().trim();

	sendToLogChannel(":smirk_cat: Flaambot starting :smirk_cat:")
	sendToLogChannel("**revision : **" + revision)
	sendToLogChannel("ready \:heart_eyes_cat:")

	scanDir('./images/available');
	
    var rule = new schedule.RecurrenceRule();
    rule.minute = 0;
    rule.hour = 6;
    // rule.second =30;

    var j = schedule.scheduleJob(rule, function() {
        client.channels.get(CHAN_ID_DKC_GENERAL).send("Testing change");
        /*
		 * client.channels.get("330420560972742656").send({ "embed": { title:
		 * 'Photo de Flaam du jour <3', image: { "url" :
		 * "http://172.104.154.243/pics/today.jpg" } } }); console.log('Pics
		 * sent to channel !');
		 */
    });
});

// Create an event listener for messages
client.on('message', message => {

	  if (message.content === '!availableImages') {
	    // Send "pong" to the same channel
	    message.channel.send('Here is a list of available images :');
	  }
	  if (message.content === '!usedImages') {
		  // Send "pong" to the same channel
		  message.channel.send('Here is a list of used images :');
	  }
});

// Log our bot in
client.login(process.env.FLAAMBOT_DISCORD_TOKEN);

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

function sentToLogChannel(message) {
    client.channels.get(CHAN_ID_DKC_FLAAMLOGS).send(message);
}

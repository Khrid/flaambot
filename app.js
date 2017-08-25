// Import the discord.js module
const Discord = require('discord.js');
const fs = require('fs')
var schedule = require('node-schedule');
var tools = require('./tools')

const CHAN_ID_DKC_GENERAL = "349976478538268674";
const CHAN_ID_DKC_FLAAMLOGS = "350728940501073924";

const CHAN_ID_QGS_FLAAMCHAN = "330420560972742656";

// Create an instance of a Discord client
var client = new Discord.Client();
tools.client = client;
tools.CHAN_ID_DKC_FLAAMLOGS = CHAN_ID_DKC_FLAAMLOGS;

client.on('ready', () => { 
	var revision = require('child_process')
	  .execSync('git rev-parse HEAD')
	  .toString().trim();
	var bootMessage = "";
	bootMessage += ":smirk_cat: Flaambot starting :smirk_cat:"+"\n"
	bootMessage += "**revision : **" + revision+"\n"
	bootMessage += "ready \:heart_eyes_cat:"
	tools.sendToLogChannel(bootMessage)
	
	if(fs.exists('./images/today.jpg'), function (exists) {
		if(exists) {
		} else {
			files = tools.scanDir('./images/available')
			if(files.length > 0) {
				key = Math.floor(Math.random() * files.length)
				target = files[key]
				if(fs.rename('./images/available/'+target, './images/today.jpg'), function (success) {
					if(success) {
						tools.sendToLogChannel(":smirk_cat: today.jpg updated :smirk_cat:")
					} else {
						tools.sendToLogChannel(":scream_cat: Could not create today.jpg :scream_cat:")
					}
				}) {}
			} else {
				tools.sendToLogChannel(":scream_cat: No more pics :scream_cat:");
			}
		}
	})
	
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

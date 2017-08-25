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
	
	fs.stat('./images/today.jpg', function(err, stat) {
		if(err == null) {
			console.log(stat.birthtimeMs)
			filetime = Date(stat.birthtimeMs).toLocaleFormat('%Y/%m/%d');

			console.log(filetime)
			today = new Date();
			dd = today.getDate();
			mm = today.getMonth()+1; //January is 0!

			yyyy = today.getFullYear();
			if(dd<10){
			    dd='0'+dd;
			} 
			if(mm<10){
			    mm='0'+mm;
			} 
			today = yyyy+'/'+mm+'/'+dd;
			if(filetime < today) {
				tools.sendToLogChannel(":smirk_cat: Replacing the picture :smirk_cat:")
			} else {
				tools.sendToLogChannel(":smirk_cat: No need to change the picture yet :smirk_cat:")
			}
		} else {
			fs.readdir('./images/available/', function (err, files) { 
				if(files.length > 0) {
					key = Math.floor(Math.random() * files.length)
					target = files[key]
					fs.rename('./images/available/'+target, './images/today.jpg'), function (success) {
						fs.stat('./images/today.jpg', function(err, stat) {
							if(err == null) {
								tools.sendToLogChannel(":smirk_cat: today.jpg updated :smirk_cat:")
							} else {
								tools.sendToLogChannel(":scream_cat: Could not create today.jpg :scream_cat:")
							}
						})
					}
				} else {
					tools.sendToLogChannel(":scream_cat: No more pics :scream_cat:");
				}
			})
		}
	});
	
	
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

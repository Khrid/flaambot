// Import the discord.js module
const Discord = require('discord.js')
const fs = require('fs')
var schedule = require('node-schedule')
var moment = require('moment')
var tools = require('./tools')
var https = require ('https')
var crypto = require("crypto")

const CHAN_ID_DKC_GENERAL = "349976478538268674";
const CHAN_ID_DKC_FLAAMLOGS = "350728940501073924"
const CHAN_ID_QGS_FLAAMCHAN = "330420560972742656"

var action = ""
var client = new Discord.Client();

tools.client = client;
tools.CHAN_ID_DKC_FLAAMLOGS = CHAN_ID_DKC_FLAAMLOGS;

client.on('ready', () => { 
	var revision = require('child_process')
	  .execSync('git rev-parse HEAD')
	  .toString().trim();
	var bootMessage = "";
	bootMessage += ":smirk_cat: Flaambot starting :smirk_cat:"+"\n"
	bootMessage += "rev : " + revision+"\n"
	bootMessage += "ready :heart_eyes_cat:"
	tools.sendToLogChannel(bootMessage)
	client.fetchUser("133313104162455552").then(user => {user.send('Flaambot (re)démarré !')})
	
	var rule = new schedule.RecurrenceRule()
    rule.minute = 30
    // rule.hour = 6
    // rule.second = 30

    var j = schedule.scheduleJob(rule, function() {
    	
    	/**
		 * Processing what's needed to do
		 */
    	fs.stat('./images/today.jpg', function(err, stat) {
    		if(err == null) {
    			filetime = moment(stat.birthtimeMs).format('YYYYMMDD');
    			today = moment().format('YYYYMMDD');
    			// today = moment(today).add(1, "days").format('YYYYMMDD');
    			console.log(filetime + " - " + today)
    			if(filetime < today) {
    				action = "Replacing the picture"
    				fs.rename('./images/today.jpg', './images/used/'+filetime+'.jpg', function (err) {
    					if(!err) {
    						fs.readdir('./images/available/', function (err, files) { 
    							if(files.length > 0) {
    								key = Math.floor(Math.random() * files.length)
    								target = files[key]
    								fs.rename('./images/available/'+target, './images/today.jpg'), function (success) {
    									fs.stat('./images/today.jpg', function(err, stat) {
    										if(err == null) {
    											action = "today.jpg updated"
    										} else {
    											action = ":scream_cat: Could not create today.jpg :scream_cat:"
    										}
    									})
    								}
    							} else {
    								action = ":scream_cat: No more pics :scream_cat:";
    							}
    						})
    					} else {
    						action = ":scream_cat: Could not move old today.jpg to used folder :scream_cat:"
    					}
    				})
    			} else {
    				action = "No need to change the picture yet"
    			}
    		} else {
    			fs.readdir('./images/available/', function (err, files) { 
    				if(files.length > 0) {
    					key = Math.floor(Math.random() * files.length)
    					target = files[key]
    					fs.rename('./images/available/'+target, './images/today.jpg'), function (success) {
    						fs.stat('./images/today.jpg', function(err, stat) {
    							if(err == null) {
    								action = "today.jpg updated"
    							} else {
    								action = ":scream_cat: Could not create today.jpg :scream_cat:"
    							}
    						})
    					}
    				} else {
    					action = ":scream_cat: No more pics :scream_cat:";
    				}
    			})
    		}
        	tools.sendToLogChannel('Action : ' + action);
    	});
    	
        // client.channels.get(CHAN_ID_DKC_GENERAL).send("Testing change");
        client.channels.get(CHAN_ID_DKC_GENERAL).send("Photo de Flaam du jour :heart_eyes_cat:", {
            files: [
              "./images/today.jpg"
            ]
          });
    });
});


// Create an event listener for messages
client.on('message', message => {

	if(message.author.id == "133313104162455552") {
		if(message.attachments.size > 0) {			
			if(message.attachments.size < 2) {
				if(message.attachments.first().filename.endsWith(".jpg")) {
					var newFile = crypto.randomBytes(20).toString('hex')+".jpg"
					
					
					
					
					var download = function(url, dest, cb) {
					  var file = fs.createWriteStream(dest);
					  var request = https.get(url, function(response) {
					    response.pipe(file);
					    file.on('finish', function() {
					      file.close(cb);  // close() is async, call cb after close completes.
					    });
					  }).on('error', function(err) { // Handle errors
					    fs.unlink(dest); // Delete the file async. (But we don't check the result)
					    if (cb) cb(err.message);
					    console.log(err.message);
					  });
					};
					download(message.attachments.first().url, "./images/available/"+newFile, null);
					fs.stat("./images/available/"+newFile, function(err, stat) {
			    		if(err == null) {
			    			message.channel.send("Photo ajoutée !", {
			    	            files: [
			    	            	"./images/available/"+newFile
			    	            ]
			    	          });
			    			      
			            	tools.sendImageToLogChannel("New pic uploaded", "./images/available/"+newFile);
			    		}
			    })
				} else {
					message.channel.send("Format d'image pas supporté :smile_cat:");
				}
			} else {
				message.channel.send("Une à la fois :smile_cat:");
			}
		} else {
		}
	}
	
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

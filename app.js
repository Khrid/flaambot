// Import the discord.js module
const Discord = require("discord.js")
const fs = require("fs")
var schedule = require("node-schedule")
var moment = require("moment")
var https = require ("https")
var crypto = require("crypto")
var glob = require("glob")
var path = require("path")
var tools = require("./tools")

const CHAN_ID_DKC_GENERAL = "349976478538268674";
const CHAN_ID_DKC_FLAAMLOGS = "350728940501073924"
const CHAN_ID_QGS_FLAAMCHAN = "330420560972742656"
	
var FLAAMBOT_KHRID_ID = process.env.FLAAMBOT_KHRID_ID
var FLAAMBOT_AERIN_ID = process.env.FLAAMBOT_AERIN_ID

var action = ""
var client = new Discord.Client();
var ext = ""

tools.client = client;
tools.CHAN_ID_DKC_FLAAMLOGS = CHAN_ID_DKC_FLAAMLOGS;

client.on("ready", () => { 
	var revision = require("child_process")
	  .execSync("git rev-parse HEAD")
	  .toString().trim();
	var bootMessage = "";
	bootMessage += ":smirk_cat: Flaambot starting :smirk_cat:"+"\n"
	bootMessage += "rev : " + revision+"\n"
	bootMessage += "ready :heart_eyes_cat:"
	tools.sendToLogChannel(bootMessage)
	client.fetchUser(FLAAMBOT_KHRID_ID).then(user => {user.send("Flaambot (re)démarré !")})
	
	
    		
	
	var rule = new schedule.RecurrenceRule()
    //rule.minute = 30
    rule.hour = 6
    //rule.second = 30

    var j = schedule.scheduleJob(rule, function() {
    	
    	/**
		 * Processing what"s need to
		 */

    	glob("./images/today.*", function (err, files) {
    		files = files[0].replace("./images/","");
	    	fs.stat("./images/"+files, function(err, stat) {
	    		
	    		if(err == null) {
	    			filetime = moment(stat.birthtimeMs).format("YYYYMMDD");
	    			today = moment().format("YYYYMMDD");
	    			// today = moment(today).add(1, "days").format("YYYYMMDD");
	    			//console.log(filetime + " - " + today)
	    			if(filetime < today) {
	    				action = "Replacing the picture"
	    				fs.rename("./images/"+files, "./images/used/"+files, function (err) {
	    					if(!err) {
	    						fs.readdir("./images/available/", function (err, files) { 
	    							if(files.length > 0) {
	    								key = Math.floor(Math.random() * files.length)
	    								target = files[key]
	    								fs.rename("./images/available/"+target, "./images/"+target), function (success) {
	    									fs.stat("./images/"+target, function(err, stat) {
	    										if(err == null) {
	    											action = "today's pic updated"
	    										} else {
	    											action = ":scream_cat: Could not create today's pic :scream_cat:"
	    										}
	    									})
	    								}
	    								if(files.length < 2) {
	        		    					client.fetchUser(FLAAMBOT_KHRID_ID).then(user => {user.send("Il ne rest plus beaucoup de photos de Flaam :crying_cat_face:")})
	    								}
	    							} else {
	    								action = ":scream_cat: No more pics :scream_cat:";
	    		    					client.fetchUser(FLAAMBOT_KHRID_ID).then(user => {user.send(action)})
	    							}
	    						})
	    					} else {
	    						action = ":scream_cat: Could not move old today to used folder :scream_cat:"
	    					}
	    				})
	    			} else {
	    				action = "No need to change the picture yet"
	    			}
	    		} else {
	    			fs.readdir("./images/available/", function (err, files) { 
	    				if(files.length > 0) {
	    					key = Math.floor(Math.random() * files.length)
	    					target = files[key]
	    					fs.rename("./images/available/"+target, "./images/"+target), function (success) {
	    						fs.stat("./images/"+target, function(err, stat) {
	    							if(err == null) {
	    								action = "today's pic updated"
	    							} else {
	    								action = ":scream_cat: Could not create today's pic :scream_cat:"
	    							}
	    						})
	    					}
	    				} else {
	    					action = ":scream_cat: No more pics :scream_cat:";
	    					client.fetchUser(FLAAMBOT_KHRID_ID).then(user => {user.send(action)})
	    				}
	    			})
	    		}
	        	tools.sendToLogChannel("Action : " + action);
	    	})
	        // client.channels.get(CHAN_ID_DKC_GENERAL).send("Testing change");
	        client.channels.get(CHAN_ID_QGS_FLAAMCHAN).send("Photo de Flaam du jour :heart_eyes_cat:", {
	            files: [
	              "./images/"+files
	            ]
	          });
    	})
    });
});


// Create an event listener for messages
client.on("message", message => {

	if(message.author.id == FLAAMBOT_KHRID_ID || message.author.id == FLAAMBOT_AERIN_ID) {
		if(message.attachments.size > 0) {			
			if(message.attachments.size < 2) {
				if(message.attachments.first().filename.endsWith(".jpg") 
						|| message.attachments.first().filename.endsWith(".png")
						|| message.attachments.first().filename.endsWith(".gif")) {
					var newFile = crypto.randomBytes(20).toString("hex")+"."+message.attachments.first().filename.split(".").pop()
					var download = function(url, dest, cb) {
					  var file = fs.createWriteStream(dest);
					  var request = https.get(url, function(response) {
					    response.pipe(file);
					    file.on("finish", function() {
					      file.close(cb);  // close() is async, call cb after close completes.
					      fs.stat("./images/available/"+newFile, function(err, stat) {
					    		if(err == null) {
					    			message.channel.send("Photo ajoutée !", {
					    	            files: [
					    	            	"./images/available/"+newFile
					    	            ]
					    	          });
					    			      
					            	tools.sendImageToLogChannel("New pic uploaded ("+newFile+")", "./images/available/"+newFile);
					    		}
					    })
					    });
					  }).on("error", function(err) { // Handle errors
					    fs.unlink(dest); // Delete the file async. (But we don"t check the result)
					    if (cb) cb(err.message);
					    console.log(err.message);
					  });
					};
					download(message.attachments.first().url, "./images/available/"+newFile, null);
				} else {
					message.channel.send("Format d\'image pas supporté :smile_cat:");
				}
			} else {
				message.channel.send("Une à la fois :smile_cat:");
			}
		}
	}
});

// Log our bot in
client.login(process.env.FLAAMBOT_DISCORD_TOKEN);

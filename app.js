
/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

var schedule = require('node-schedule');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {

var rule = new schedule.RecurrenceRule();
    rule.minute = 0;
    rule.hour = 6;
    //rule.second =30;

    var j = schedule.scheduleJob(rule, function() {
        client.channels.get("349976478538268674").send("Testing");
        /*client.channels.get("330420560972742656").send({
                "embed": {
                        title: 'Photo de Flaam du jour <3',
                        image: {
                                "url" : "http://172.104.154.243/pics/today.jpg"
                        }
                }
        });
        console.log('Pics sent to channel !');*/
    })
    client.channels.get("349976478538268674").send("Flaambot ready \:heart_eyes_cat: !");
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    // message.channel.send('pong');
  }


  // If the message is "ping"
  if (message.content === 'malo' && message.channel.id == "330420560972742656") {
    // Send "pong" to the same channel
    message.channel.send('c\'est le plus beau :)');
  }

});

// Log our bot in
client.login(process.env.FLAAMBOT_DISCORD_TOKEN);

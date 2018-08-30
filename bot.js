var Discord = require("discord.js");
var auth = require("./auth.json");
// Initialize Discord Bot
var bot = new Discord.Client();

var pongCount = 0;
bot.on("message", 
	function (message) 
	{
		var text = message.content;
		if (text.substring(0, 1) == "!") {
			var args = text.substring(1).split(" ");
			var cmd = args[0];

			args = args.splice(1);
			switch(cmd) {
				case "intro":
					message.reply("introduit toi avant ! malotru !");
				break;
				case "ping":
					pongCount ++;
					if (pongCount % 4 != 0)
						message.channel.send("pong");
					else
						message.channel.send("on va pas faire ca toute la journée ? si ?");
				}
			}
		});
bot.login(auth.token);

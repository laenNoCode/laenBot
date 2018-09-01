var Discord = require("discord.js");
var auth = require("./auth.json");
var config = require("./config.json");
var fs = require("fs");
var exec = require("child_process").exec;
// Initialize Discord Bot
var bot = new Discord.Client();

var consoleAsMessage = {};
consoleAsMessage.channel = {};
consoleAsMessage.channel.send = console.log;

var commands = {};
function update(message)
{
	message.channel.send("update request received");
	exec("git pull", (err, stdout, stderr) => {
		message.channel.send([
			"```",
			"$ git pull -> " + err,
			"STDOUT",
			stdout +
			"STDERR",
			stderr +
			"```"
		].join("\n"));
		loadCommands(message);
		message.channel.send("update done");
	});
}
function loadCommands(message)
{
	commands = {};
	fs.readdir("./commands", (err, files) =>
	{
		files.forEach(file => {
			var array = file.split(".");
			if (array[array.length - 1] == "js")
			{
				var name = array.slice(0, array.length - 1).join(".");
				message.channel.send("`" + config.servers.default.prefix + name + "`");
				commands[name] = require("./commands/" + name).main;
			}
		});
	});
	commands["update"] = update;
}

loadCommands(consoleAsMessage);
bot.on("message", 
	function (message) 
	{
		var text = message.content;
		var prefix = config.servers.default.prefix;
		if (text.substring(0, prefix.length) == prefix) 
		{
			var commandName = text.split(" ")[0].substring(prefix.length);
			if (commands[commandName] === undefined)
			{
				message.channel.send("la commande `" + commandName + "` n'existe pas");
				message.channel.send(Object.keys(commands).join(" "));
				return;
			}
			try
			{
				var args = text.split(" ");
				args.splice(0, 1);
				commands[commandName](message, args);
			}
			catch(exception)
			{
				if(exception.message !== undefined)
					message.channel.send("Error: " + exception.message);
			}
		}
	}
);
bot.on("error",(err) => 
	{
	console.log(error);
	});
bot.login(auth.token);

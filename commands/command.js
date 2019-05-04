var exec = require('child_process').exec;
function main(message,args)
{
	message.channel.send(args.join(" "));
	exec(args.join(" "),(err, stdout, stderr) => {
		message.channel.send([
			"```",
			" -> " + err,
			"STDOUT",
			stdout +
			"STDERR",
			stderr +
			"```"
		].join("\n"));
	});
}
exports.main = main;
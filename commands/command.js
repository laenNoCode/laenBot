var exec = require('child_process').exec;
function main(message,args)
{
	message.channel.send(args.join(" "));
	//exec(args.join(" "))
}
exports.main = main;
var exec = require('child_process').exec;
function main(message,args)
{
	message.channel.send(args);
}
exports.main = main;
var exec = require('child_process').exec;
function main(message,args)
{
	message.channel.message(args);
}
exports.main = main;
function sendCode(message, code)
{
	message.channel.send("```" + code + "```");
}


function main(message, args)
{
	sendCode(message,"test");
}
exports.main = main;
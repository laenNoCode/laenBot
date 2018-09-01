function sendCode(message, code)
{
	message.channel.send("```" + code + "```");
}

function main(message, args)
{
	sendCode("test");
}
exports.main = main;
function addThreeBackslashes(message)
{
	message.channel.send("```");
}

function main(message, args)
{
	addThreeBackslashes(message);
	message.channel.send("test");
	addThreeBackslashes(message);
}
exports.main = main;
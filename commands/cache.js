function main(message)
{
	for (var key of Object.keys(require.cache))
		message.channel.send("```" + key + "```");
}
exports.main = main;
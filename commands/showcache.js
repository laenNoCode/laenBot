function main(message)
{
	message.channel.send("start of cache");
	var array = [];
	for (var key of Object.keys(require.cache))
		array.push(key);
	message.channel.send("```" + array.join("\n") + "```");
	message.channel.send("end of cache");
}
exports.main = main;
function main(message)
{
	for (var key of Object.keys(require.cache))
		delete require.cache[key];
	message.channel.send("cache successfully cleared.")
}
exports.main = main;
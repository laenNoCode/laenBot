function main(message)
{
	for (var key of Object.keys(require.cache))
		delete require.cache[key];
}
exports.main = main;
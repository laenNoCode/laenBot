function main(message,args)
{
	message.channel.send("vous avez utilisé /vote");
	message.channel.send("avec les arguments:" + args.join(" "));
}
exports.main = main;

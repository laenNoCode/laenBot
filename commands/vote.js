function main(message, args)
{
	message.channel.send("`!vote` is in alpha testing.");
	message.channel.send("args:" + args);
	showHelp(message);
	if (args === [] || args === ["help"])
	{
		showHelp(message);
		return;
	}
	else if (args.lenght === 1) {
		message.channel.send("You need to provide a vote name.");
		return;
	}
	try {
		var VoteManager = require("commands/vote/controller/VoteManager").VoteManager;
		message.channel.send("VoteManager: " + VoteManager);
		var subcommand = args.shift();
		var vm = new VoteManager();
		var cmd = vm[subcommand];
		if (cmd === undefined) {
			args.unshift(subcommand);
			cmd = vm.ballot;
		}
		var voteName = args.shift();
		cmd.apply(vm, [voteName, args, message]);
	}
	catch (err) {
		message.channel.send(["```", err.stack, "```"].join());
	}
}
exports.main = main;


function showHelp(message) {
	message.channel.send(`\`\`\`
Usage (voter):
!vote {vote-name} {option}
(!vote {vote-name} ([+-]{reloption})+)
!vote status {vote-name}

Usage (creator):
!vote create {vote-name}
!vote type {vote-name} {vote-type}
!vote option {vote-name} {option}*
!vote option {vote-name} ([+-]{reloption})+
!vote result {vote-name}
!vote close {vote-name}
!vote open {vote-name}
!vote delete {vote-name}
\`\`\``);
}
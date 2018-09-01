exports.option = function (vote, args, message) {
	var option;
	var op = OptionParser(args, message);
	var parsed = op.parse();
	if (parsed.error)
	{
		message.channel.send("Error: " + parsed.error);
		return;
	}
	if (parsed.absolute)
	{
		vote.options = {};
		for (option of parsed.options)
		{
			vote.options[option] = true;
		}
		var msg = "Options for vote " + vote + " are now: " + parsed.options.join(", ") + ".";
		message.channel.send(msg);
	}
	else
	{
		for (option of op.rmv) {
			// Remove the option from all ballots
			for (var voter of vote.ballots) {
				var ballot = vote.ballots[voter];
				var i = ballot.indexOf(option);
				if (i == -1)
				{
					continue;
				}
				else
				{
					ballot.splice(i, 1); // remove 1 element at i
				}
			}
			// Remove the option from the accepted options set
			delete vote.options[option];
		}
		for (option of op.add) {
			// Adding the option to the set of accepted options
			vote.options[option] = true;
		}
		op.rmv && message.channel.send("Remvd options " + op.rmv.join(", ") + " fm vote " + vote.name + ".");
		op.add && message.channel.send("Added options " + op.add.join(", ") + " to vote " + vote.name + ".");
	}
};
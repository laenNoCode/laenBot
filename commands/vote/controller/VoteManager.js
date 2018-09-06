const VOTE_FOLDER = "..";
const TYPES_FOLDER = VOTE_FOLDER + "/types";
const CONTROLLER_FOLDER = ".";
const SUBCOMMAND_FOLDER = CONTROLLER_FOLDER + "/subcommand";
var fs = require("fs");
var Vote = require(VOTE_FOLDER + "/model/Vote");
var VoteSerializer = require(CONTROLLER_FOLDER + "/VoteSerializer").VoteSerializer;
var OptionParser = require(SUBCOMMAND_FOLDER + "/OptionParser");

exports.VoteManager = class
{
	constructor(fileName = "../../../save/vote/votes.json")
	{
		this.vs = new VoteSerializer(fileName);
	}
	
	create(name, args, message)
	{
		if (this.vs.getVote(name) === undefined)
		{
			var vote = new Vote(name, message.author);
			this.vs.serializeVote(vote);
			message.channel.send("vote " + name + " successfully created");
		}
		else
		{
			message.channel.send("Error: vote " + name + " already exists.");
		}
	}

	_fetchVote(name, _message)
	{
		var vote = this.vs.getVote(name);
		if (vote === undefined)
		{
			throw new Error("vote " + name + " doesn't exists.");
		}
		return vote;
	}

	type(name, args, message)
	{
		var type = args[0];
		if (type === undefined) {
			message.channel.send("You must provide a vote type (#Unimplemented: this message should list the available vote types)");
			return;
		}
		var vote = this._fetchVote(name, message);
		fs.readdir(TYPES_FOLDER, (err, files) =>
		{
			var names = Array.from(files);
			
			if (names.indexOf(type) == -1)
			{
				message.channel.send("Error: type " + type + "doesn't exists.");
				return;
			}
			vote.type = type;
			this.vs.serializeVote(vote);
			message.channel.send("vote " + name + " is now of type " + `${type}.`);
		});
	}

	option(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		var optionCmd = require(SUBCOMMAND_FOLDER + "/option").option;
		optionCmd(vote, args, message);
		this.vs.serializeVote(vote);
	}

	ballot(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		if (!vote.open)
		{
			message.channel.send("Error: vote " + name + " isn't open.");
			return;
		}
		var typeManager = require(TYPES_FOLDER + "/" + vote.type);

		var op = new OptionParser(args);
		var parsed = op.parse();
		if (parsed.error) {
			message.channel.send("Error: " + parsed.error);
			return;
		}

		var p = parsed;
		for (var option of [].concat(p.options, p.add, p.rmv))
		{
			if (vote.options.indexOf(option) === -1)
			{
				message.channel.send("Error: option " + option + " is not available.");
			}
		}

		var ballot;
		if (parsed.absolute)
		{
			ballot = typeManager.makeBallot(vote.options, parsed.options, message);
			vote.ballots[message.author] = ballot;
		}
		else
		{
			ballot = vote.ballots[message.author];
			ballot = typeManager.changeBallot(vote.options, ballot, parsed.add, parsed.rmv, message);
			vote.ballots[message.author] = ballot;
		}
	}

	status(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		let optionArr = Object.keys(vote.options);
		let voterArr = Object.keys(vote.ballots);
		message.channel.send(`\`\`\`js
vote = {
	voteName: "${vote.voteName}",
	type: "${vote.type}",
	options (${optionArr.length}): {{${optionArr}}},
	votes (${voterArr.length}): <<${voterArr}>>,
	creator: "${vote.creator}",
	open: ${vote.open}
}
\`\`\`
`);
	}

	open(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		if (vote.open === true) {
			message.channel.send("Vote " + name + " is already open.");
			return;
		}
		
		vote.open = true;
		this.vs.serializeVote(vote);
	}

	close(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		if (vote.open === false) {
			message.channel.send("Vote " + name + " is already closed.");
			return;
		}
		
		vote.open = false;
		this.vs.serializeVote(vote);
	}

	result(name, args, message)
	{
		var vote = this._fetchVote(name, message);
		if (vote.open === false) {
			message.channel.send("Vote " + name + " is already closed.");
			return;
		}
		var typeManager = require(TYPES_FOLDER + "/" + vote.type);

		typeManager.results(vote, message);
	}

};
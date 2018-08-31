const FOLDER_NAME = "commands/vote/types";
var VoteSerializer = require("VoteSerializer");
var fs = require("fs");
class VotesManager
{
	constructor(fileName = "save/vote/votes.json")
	{
		this.vs = new VoteSerializer(fileName);
	}
	
	create(name, message)
	{
		vote = new Vote(name);
		if (this.vs.getVote(name) === undefined)
		{
			this.vs.serializeVote(vote);
			message.channel.send("vote " + name + " successfully created");
		}
		else
		{
			message.channel.send("Error: vote " + name + " already exists.");
		}
	}

	type(name, type)
	{
		if (this.vs.getVote(name) === undefined)
		{
			message.channel.send("Error: vote " + name + " doesn't exists.");
			return;
		}
		var names;
		fs.readdir(FOLDER_NAME, (err, files) =>
		{
			names = Array.from(files);
			
			var vote = this.vs.getVote(name);
			if (names.indexOf(type) == -1)
			{
				message.channel.send("Error: type " + type + "doesn't exists.");
				return;
			}
			vote.type = type;
			this.vs.serializeVote(vote);
			message.channel.send("vote " + name + " is now of type " + `${type}.`);
		}
	}
	results(name, message)
	{
		if (this.vs.getVote(name) === undefined)
		{
			message.channel.send("Error: vote " + name + " doesn't exists.");
			return;
		}
		var vote = this.vs.getVote(name);
		var typeManager = require(FOLDER_NAME + "/" + vote.type);
		typeManager.results(vote, message);
	}

	options(name, options, message)
	{
		if (this.vs.getVote(name) === undefined)
		{
			message.channel.send("Error: vote " + name + " doesn't exists.");
			return;
		}
		var vote = this.vs.getVote(name);
		options.forEach((option) =>
		{
			vote.options.push(option);
		});
		this.vs.serializeVote(vote);
		message.channel.send("options: " + options.join(" ") + "have been added to the vote " + `${name}.`);
		
	}

	putBallot(name, options, message)
	{
		if (this.vs.getVote(name) === undefined)
		{
			message.channel.send("Error: vote " + name + " doesn't exists.");
			return;
		}
		vote = this.vs.getVote(name);
		var typeManager = require(FOLDER_NAME + "/" + vote.type);
		if (typeManager.checkBallot(options, message))
		{
			vote.ballots.push(typeManager.ballotMaker(options));
		}
	}
}


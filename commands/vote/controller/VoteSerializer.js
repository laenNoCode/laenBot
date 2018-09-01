class VotesSerializer
{
	constructor(fileName)
	{
		this.fileName = fileName;
	}

	_getAsObject()
	{
		return require(this.fileName);
	}

	_serializeObject(votes, callback)
	{
		var fs = require("fs");
		fs.writeFile(this.fileName, JSON.stringify(votes), callback);
	}

	removeVote(vote, callback)
	{
		var voteMapping = this._getAsObject();
		delete(voteMapping[vote]);
		this._serializeObject(voteMapping, callback);
	}

	serializeVote(vote, callback)
	{
		var voteMapping = this._getAsObject();
		voteMapping[vote.voteName] = vote;
		this._serializeObject(voteMapping, callback);		
	}

	getVote(vote)
	{
		return this._getAsObject()[vote.voteName];
	}
}
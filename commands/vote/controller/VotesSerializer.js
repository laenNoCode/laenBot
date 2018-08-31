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
		var fs = require('fs');
		fs.writeFile(this.fileName, JSON.stringify(votes), callback);
	}

	removeVote(vote, callback)
	{
		votes = this._getAsObject();
		delete(votes[vote]);
		_serializeObject(votes);
	}

	serializeVote(vote, callback)
	{
		votes = this._getAsObject();
		votes[vote.voteName] = vote;
		this._serializeObject(votes, callback);		
	}
	getVote(vote)
	{
		return this._getAsObject()[vote.voteName];
	}
}
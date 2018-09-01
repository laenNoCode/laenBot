exports.Ballot = class
{
	constructor(voter, options = [])
	{
		this.voter = voter;
		this.options = options;
	}
};
exports.Vote = class
{
	constructor(voteName, creator)
	{
		this.voteName = voteName;
		this.type = "approval";
		this.options = {};
		this.ballots = {};
		this.creator = creator;
		this.open = true;
	}
};
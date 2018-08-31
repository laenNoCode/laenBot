class Vote
{
	constructor(voteName)
	{
		this.voteName = voteName;
		this.type = "approval";
		this.options = [];
		this.ballots = [];
	}
}
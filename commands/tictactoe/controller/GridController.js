class GridController
{
	// players values ar 1 and 4
	constructor()
	{
		this.grid = Grid();
	}
	checkWin()
	{
		win = 0;
		for (i = 0; i < 3; i++)
		{
			valeur = 0;
			for (j = 1; j < 3; j++)
			{
				valeur += this.grid.values[i][j];
			}
			if (valeur == 3 || valeur == 12)
				win = valeur / 3;
		}
		for (i = 0; i < 3; i++)
		{
			valeur = 0;
			for (j = 0; j < 3; j++)
			{
				valeur += this.grid.values[j][i];
			}
			if (valeur == 3 || valeur == 12)
				win = valeur / 3;
		}
		for (i = 0; i < 3; i++)
		{
			valeur = 0;
			valeur += this.grid.values[i][i];
			if (valeur == 3 || valeur == 12)
				win = valeur / 3;
		}
		for (i = 0; i < 3; i++)
		{
			valeur = 0;
			valeur += this.grid.values[3 - 1 - i][i];
			if (valeur == 3 || valeur == 12)
				win = valeur / 3;
		}
		return win;
	}
	play(joueur, position, message)
	{
		if (this.grid.values )
	}
}
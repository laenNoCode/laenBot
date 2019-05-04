exports.OptionParser = class {
	constructor (optionSpecifierArray) {
		this.optionSpecifierArray = optionSpecifierArray;
	}
	parse () {
		var option;
		var i;
		var allAbsolute = true;
		var allRelative = true;
		var parsed = {
			add: [],
			rmv: [],
			options: [],
			error: undefined,
			relative: undefined,
			absolute: undefined
		};
		for (var optionSpec of this.optionSpecifierArray)
		{
			if (optionSpec === "")
			{
				parsed.error = "option name cannot be empty";
				return parsed;
			}
			var relative = "+-".indexOf(optionSpec[0]) !== -1;
			if (relative)
			{
				option = optionSpec.slice(1);
				if (option === "")
				{
					parsed.error = "option name cannot be empty / + and - mean relative option";
					return parsed;
				}
				if ("+-".indexOf(option[0]) !== -1)
				{
					parsed.error = "option name cannot start by + or -";
					return parsed;
				}
				allAbsolute = false;
				
				// Adding / removing according to the optionSpec
				if (optionSpec[0] == "+")
				{
					parsed.add.push(option);
					i = parsed.rmv.indexOf(option);
					if (i != -1)
					{
						parsed.rmv.splice(i, 1);
					}
				}
				else // "-"
				{
					parsed.rmv.push(option);
					i = parsed.add.indexOf(option);
					if (i != -1)
					{
						parsed.add.splice(i);
					}
				}
			}
			else // absolute
			{
				allRelative = false;
				// processed later
			}
		}

		if (!allAbsolute && !allRelative)
		{
			parsed.error = "relative option specifiers cannot be mixed with absolute specifiers";
			return parsed;
		}

		parsed.absolute = allAbsolute;
		if (parsed.absolute) {
			parsed.options = this.optionSpecifierArray;
		}
		parsed.relative = !allAbsolute;

		return parsed;
	}
};
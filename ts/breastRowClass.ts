class BreastRow {
	public breasts             = 2;
	public lactationMultiplier = 0;
	//Goes up to 100.
	public milkFullness        = 0;
	public fuckable            = false;
	public nippleLength        = 0.25;

	constructor(public breastSize       = 2,
				public nipplesPerBreast = 2) {
	}
}

/**
 * @deprecated
 */
function unfuckBreastRow(breastRow:BreastRow):BreastRow { //Fix any undefined numbers.
	if (breastRow.breasts == undefined)
		breastRow.breasts = 2;
	if (breastRow.breastSize == undefined)
		breastRow.breastSize = 0;
	if (breastRow.lactationMultiplier == undefined)
		breastRow.lactationMultiplier = 0;
	if (breastRow.milkFullness == undefined)
		breastRow.milkFullness = 0;
	if (breastRow.fuckable == undefined)
		breastRow.fuckable = false;
	if (breastRow.nipplesPerBreast == undefined)
		breastRow.nipplesPerBreast = 1;
	if (breastRow.nippleLength == undefined)
		breastRow.nippleLength = 0.25;
	return breastRow;
}
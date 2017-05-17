class Cock {
	//Special, for dog and dragon cocks
	public knotMultiplier = 1;
	//Other
	public isPierced      = false;
	public pShortDesc     = "";
	public sock           = "";

	public constructor(public cockLength    = 5.5,
				public cockThickness = 1,
				public cockType      = CockTypesEnum.HUMAN) {
	}

	public cockArea(): number {
		return (this.cockLength * this.cockThickness)
	}

	public thickenCock(amount: number): void {
		//Diminishing returns!
		if (!hyperHappy) {
			if (this.cockThickness >= 6 && this.cockThickness < 10)
				amount *= 0.8;
			else if (this.cockThickness >= 10 && this.cockThickness < 14)
				amount *= 0.6;
			else if (this.cockThickness >= 14 && this.cockThickness < 18)
				amount *= 0.5;
			else if (this.cockThickness >= 18 && this.cockThickness < 24)
				amount *= 0.4;
			else if (this.cockThickness >= 24)
				amount *= 0.3;
		}
		//Apply growth
		this.cockThickness += amount;
		//Apply hard cap
		if (this.cockThickness > 40) this.cockThickness = 40;
	}

	public increaseCock(amount: number):void {
		//Diminishing returns!
		if (!hyperHappy) {
			if (this.cockLength >= 30 && this.cockLength < 50)
				amount *= 0.8;
			else if (this.cockLength >= 50 && this.cockLength < 70)
				amount *= 0.6;
			else if (this.cockLength >= 70 && this.cockLength < 90)
				amount *= 0.5;
			else if (this.cockLength >= 90 && this.cockLength < 120)
				amount *= 0.4;
			else if (this.cockLength >= 120)
				amount *= 0.3;
		}
		//Apply growth
		this.cockLength += amount;
		//Apply hard cap
		if (this.cockLength > 240) this.cockLength = 240;
	}

	public cArea(): number {
		return this.cockLength * this.cockThickness;
	}

	public hasKnot():boolean {
		return this.knotMultiplier > 1;
	}
}

/**
 * @deprecated
 */
function fixCock(cock:Cock):Cock { // Fix any undefined numbers.
	if (cock.cockType == undefined)
		cock.cockType = 0;
	if (cock.cockLength == undefined)
		cock.cockLength = 5;
	if (cock.cockThickness == undefined)
		cock.cockThickness = 1;
	if (cock.knotMultiplier == undefined)
		cock.knotMultiplier = 1;
	if (cock.isPierced == undefined)
		cock.isPierced = false;
	if (cock.sock == undefined)
		cock.sock = "";
	return cock;
}
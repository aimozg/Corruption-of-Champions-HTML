class PerkType {
	constructor(public id: string,
				public name: string,
				public desc: string,
				public longDesc: string | null  = null,
				public keepOnAscension: boolean = false) {
		PerkIDs[this.id] = this;
	}
}

class Perk {
	constructor(public ptype: PerkType,
				public value1:number = 0,
				public value2:number = 0,
				public value3:number = 0,
				public value4:number = 0) {
	}

	get perkName(): string {
		return this.ptype.name;
	}
}

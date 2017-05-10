class StatusEffectType {
	constructor(public id: string) {
		StatusEffectIDs[this.id] = this;
	}
}
class StatusEffect {
	constructor(public stype: StatusEffectType,
				public value1:number=0,
				public value2:number=0,
				public value3:number=0,
				public value4:number=0) {
	}

	value(vidx: 1 | 2 | 3 | 4): number {
		switch (vidx) {
			case 1:
				return this.value1;
			case 2:
				return this.value2;
			case 3:
				return this.value3;
			case 4:
				return this.value4;
		}
	}
}
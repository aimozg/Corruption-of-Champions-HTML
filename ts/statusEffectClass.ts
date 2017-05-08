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

}
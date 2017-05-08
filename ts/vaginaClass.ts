class Vagina {
	public clitLength = 0.25;
	public clitPierced = 0;
	constructor(public vaginalWetness:number=1,
				public vaginalLooseness:number=0,
				public virgin:boolean=false,
				public type:VaginaTypesEnum = VaginaTypesEnum.HUMAN) {
	}
}

function fixVagina(pussy:Vagina):Vagina { //Fix any undefined numbers.
    if (pussy.type == undefined)
        pussy.type = 0;
    if (pussy.clitLength == undefined)
        pussy.clitLength = 0.25;
    if (pussy.vaginalWetness == undefined)
        pussy.vaginalWetness = 1;
    if (pussy.vaginalLooseness == undefined)
        pussy.vaginalLooseness = 0;
    if (pussy.virgin == undefined)
        pussy.virgin = false;
    return pussy;
}
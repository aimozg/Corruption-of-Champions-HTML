class Vagina {
	public clitPierced  = 0;
	public labiaPierced = 0;
	public clitPShort   = "";
	public labiaPShort  = "";
	constructor(public vaginalWetness:number=1,
				public vaginalLooseness:number=0,
				public virgin:boolean=false,
				public type:VaginaTypesEnum = VaginaTypesEnum.HUMAN) {
	}
}

/**
 * @deprecated
 */
function fixVagina(pussy:Vagina):Vagina { //Fix any undefined numbers.
    if (pussy.type == undefined)
        pussy.type = 0;
    if (pussy.vaginalWetness == undefined)
        pussy.vaginalWetness = 1;
    if (pussy.vaginalLooseness == undefined)
        pussy.vaginalLooseness = 0;
    if (pussy.virgin == undefined)
        pussy.virgin = false;
    return pussy;
}
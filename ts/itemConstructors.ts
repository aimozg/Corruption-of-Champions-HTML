class HairDye extends Item {
	constructor(dyeId: string, dyeColor: string) {
		super(dyeId, dyeColor + " Dye", "a vial of " + dyeColor + " hair dye", ITEM_TYPE_CONSUMABLE);
		this.description   = "This bottle of dye will allow you to change the color of your hair. Of course if you don't have hair, using this would be a waste.";
		this.consumeEffect = createCallBackFunction(ConsumableEffects.hairDye, dyeColor.toLowerCase());
	}
}

class SkinOil extends Item {
	constructor(oilId: string, oilColor: string) {
		super(oilId, oilColor + " Oil", "a bottle of " + oilColor + " oil", ITEM_TYPE_CONSUMABLE);
		this.description   = "A small glass bottle filled with a smooth clear liquid. A label across the front says, \"" + oilColor + " Skin Oil.\"";
		this.consumeEffect = createCallBackFunction(ConsumableEffects.skinOil, oilColor.toLowerCase());
	}
}

class BodyLotion extends Item {
	constructor(lotionId: string, lotionType: string, longAdj: string) {
		super(lotionId, lotionType + " Ltn", "a flask of " + lotionType + " lotion", ITEM_TYPE_CONSUMABLE);
		this.description   = "A small wooden flask filled with a " + longAdj + " . A label across the front says, \"" + lotionType + " Lotion.\""
		this.consumeEffect = createCallBackFunction(ConsumableEffects.bodyLotion, lotionType.toLowerCase());
	}
}

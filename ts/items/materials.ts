namespace Items {
	export namespace Materials {
		export const GreenGel = new Item("GreenGl", "Green Gel", "a clump of green gel", ITEM_TYPE_MATERIAL);
		GreenGel.description = "This tough substance has no obvious use that you can discern.";
		GreenGel.useText = function() { outputText("You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable. Somehow you know eating it would not be a good idea."); return false; };

		export const BeeChitin = new Item("B.Chitn", "B.Chitin", "a large shard of chitinous plating", ITEM_TYPE_MATERIAL);
		BeeChitin.description = "A perfect piece of black chitin from a bee-girl. It still has some fuzz on it.";
		BeeChitin.useText = function() { outputText("You look over the chitin carefully but cannot find a use for it. Maybe someone else will know how to use it."); return false; };

		export const ImpSkull = new Item("ImpSkull", "Imp Skull", "To Be Added", ITEM_TYPE_MATERIAL);
		ImpSkull.description = "To be added";
		ImpSkull.useText = function() { outputText("To Be Added."); return false; };
	}
}


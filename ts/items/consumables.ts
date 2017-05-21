namespace Items {
	export namespace Consumables {
		//------------
		// STANDARD
		//------------

		export const Lactaid  = new Item("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", ITEM_TYPE_CONSUMABLE);
		Lactaid.description   = "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.";
		Lactaid.consumeEffect = ConsumableEffects.lactaid;

		export const MinotaurCum  = new Item("M.Cum", "MinoCum", "a sealed bottle of minotaur cum", ITEM_TYPE_CONSUMABLE);
		MinotaurCum.description   = "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.";
		MinotaurCum.consumeEffect = ()=>ConsumableEffects.minotaurCum(false);
		MinotaurCum.value         = 60;


		//------------
		// NON-TFs
		//------------
		export const BlackBook  = new Item("B.Book", "Black Book", "a small book with a midnight-black cover", ITEM_TYPE_CONSUMABLE);
		BlackBook.description   = "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.";
		BlackBook.consumeEffect = ConsumableEffects.blackSpellbook;
		BlackBook.value         = 40;

		export const Condom  = new Item("Condom", "Condom", "a condom packet", ITEM_TYPE_CONSUMABLE);
		Condom.description   = "This wrapper contains a latex condom that can be worn over penis. It's designed to prevent pregnancy most of the time. Can be used in certain sex scenes.";
		Condom.consumeEffect = ()=>outputText("You look at the unopened packet of condom.  If applicable, you can use the condom to prevent pregnancy most of the time.");
		Condom.value         = 6;

		export const FishFillet  = new Item("FishFil", "F. Fillet", "a fish fillet", ITEM_TYPE_CONSUMABLE);
		FishFillet.description   = "A perfectly cooked piece of fish. You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.";
		FishFillet.consumeEffect = ConsumableEffects.fishFillet;

		export const LustDraft  = new Item("L.Draft", "Lust Draft", "a vial of roiling bubble-gum pink fluid", ITEM_TYPE_CONSUMABLE);
		LustDraft.description   = "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape. It smells very sweet, and has \"Lust\" inscribed on the side of the vial.";
		LustDraft.consumeEffect = ConsumableEffects.lustDraft;
		LustDraft.value         = 20;

		export const FuckDraft  = new Item("F.Draft", "Fuck Draft", "a vial of roiling red fluid labeled \"Fuck Draft\".", ITEM_TYPE_CONSUMABLE);
		FuckDraft.description   = "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial.";
		FuckDraft.consumeEffect = () => ConsumableEffects.lustDraft(true);
		FuckDraft.value         = 20;

		export const OviElixir  = new Item("OviElix", "Ovi Elixir", "a salve marked as 'Ovulation Exlixir'", ITEM_TYPE_CONSUMABLE);
		OviElixir.description   = "This hexagonal container with an egg-shaped label can help you or others lay eggs.";
		OviElixir.consumeEffect = ConsumableEffects.oviElixir;
		OviElixir.value         = 30;

		export const Reducto  = new Item("Reducto", "Reducto", "a salve marked as 'Reducto'", ITEM_TYPE_CONSUMABLE);
		Reducto.description   = "This container full of paste can be used to shrink a body part down by a significant amount.";
		Reducto.consumeEffect = ConsumableEffects.reductoMenu;
		Reducto.value         = 30;

		export const ScholarsTea  = new Item("Smart T", "Scholars T.", "a cup of scholar's tea", ITEM_TYPE_CONSUMABLE);
		ScholarsTea.description   = "This potent tea supposedly has mind-strengthening effects.";
		ScholarsTea.consumeEffect = ConsumableEffects.scholarsTea;

		export const TatteredScroll  = new Item("T.Scroll", "Tattered Scroll", "a tattered scroll", ITEM_TYPE_CONSUMABLE);
		TatteredScroll.description   = "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.";
		TatteredScroll.consumeEffect = ConsumableEffects.tatteredScroll;

		export const VitalityTincture  = new Item("Vital T", "Vitality T.", "a fish fillet", ITEM_TYPE_CONSUMABLE);
		VitalityTincture.description   = "This powerful brew is supposedly good for the strengthening the body.";
		VitalityTincture.consumeEffect = ConsumableEffects.vitalityTincture;

		export const WhiteBook  = new Item("W.Book", "White Book", "a small book with a pristine white cover", ITEM_TYPE_CONSUMABLE);
		WhiteBook.description   = "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it.";
		WhiteBook.consumeEffect = ConsumableEffects.whiteSpellBook;
		WhiteBook.value         = 40;


		//------------
		// DYES/OILS/LOTIONS
		//------------
		export const HairDyeAuburn  = new HairDye("AuburnD", "Auburn");
		export const HairDyeBlack   = new HairDye("Black D", "Black");
		export const HairDyeBlond   = new HairDye("Blond D", "Blond");
		export const HairDyeBlue    = new HairDye("BlueDye", "Blue");
		export const HairDyeBrown   = new HairDye("Brown D", "Brown");
		export const HairDyeGray    = new HairDye("GrayDye", "Gray");
		export const HairDyeGreen   = new HairDye("Green D", "Green");
		export const HairDyeOrange  = new HairDye("OrangeD", "Orange");
		export const HairDyePink    = new HairDye("PinkDye", "Pink");
		export const HairDyePurple  = new HairDye("PurpleD", "Purple");
		export const HairDyeRainbow = new HairDye("RainDye", "Rainbow");
		export const HairDyeRed     = new HairDye("Red Dye", "Red");
		export const HairDyeWhite   = new HairDye("White D", "White");

		export const SkinOilDark     = new SkinOil("DarkOil", "Dark");
		export const SkinOilEbony    = new SkinOil("EbonyOl", "Ebony");
		export const SkinOilFair     = new SkinOil("FairOil", "Fair");
		export const SkinOilLight    = new SkinOil("LightOl", "Light");
		export const SkinOilMahogany = new SkinOil("MahogOl", "Mahogany");
		export const SkinOilOlive    = new SkinOil("OliveOl", "Olive");
		export const SkinOilRusset   = new SkinOil("RussOil", "Russet");

		export const BodyLotionClear  = new BodyLotion("ClearLn", "Clear", "smooth thick creamy liquid");
		export const BodyLotionRough  = new BodyLotion("RoughLn", "Rough", "thick abrasive cream");
		export const BodyLotionSexy   = new BodyLotion("SexyLtn", "Sexy", "pretty cream like substance");
		export const BodyLotionSmooth = new BodyLotion("SmthLtn", "Smooth", "smooth thick creamy liquid");


		//-------------
		// EGGS
		//-------------

		// Needed for Amily transformation code to work. Flesh out when we can obtain the items.
		export const BlackEgg = new Item("BlEgg", "Black Egg", "a black egg", ITEM_TYPE_CONSUMABLE);

		export const LBlackEgg = new Item("LBlEgg", "L.Black Egg", "a large black egg", ITEM_TYPE_CONSUMABLE);

	}
}
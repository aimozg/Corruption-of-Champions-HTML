namespace Items {
	export namespace Consumables {
		//------------
		// STANDARD
		//------------
		export const BeeHoney  = new Item("BeeHony", "Bee Honey", "a small vial filled with giant-bee honey", ITEM_TYPE_CONSUMABLE);
		BeeHoney.description   = "This fine crystal vial is filled with a thick amber liquid that glitters dully in the light. You can smell a sweet scent, even though it is tightly corked.";
		BeeHoney.consumeEffect = () => ConsumableEffects.beeTFs(0);

		export const CaninePepper  = new Item("CanineP", "Canine Pp", "a canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepper.description   = "The pepper is shiny and red, bulbous at the base but long and narrow at the tip. It smells spicy.";
		CaninePepper.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 0);

		export const CaninePepperLarge  = new Item("Large P", "Large Pp", "an overly large canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperLarge.description   = "This large canine pepper is much bigger than any normal peppers you've seen.";
		CaninePepperLarge.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 1);
		CaninePepperLarge.value         = 10;

		export const CaninePepperDouble  = new Item("DoubleP", "Double Pp", "a double canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperDouble.description   = "This canine pepper is actually two that have grown together due to some freak coincidence.";
		CaninePepperDouble.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 2);
		CaninePepperDouble.value         = 10;

		export const CaninePepperBlack  = new Item("Black P", "Black Pp", "a solid black canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperBlack.description   = "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...";
		CaninePepperBlack.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 3);
		CaninePepperBlack.value         = 10;

		export const CaninePepperKnotty  = new Item("KnottyP", "Knotty Pp", "a knotty canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperKnotty.description   = "This knotted pepper is very swollen, with a massive, distended knot near the base.";
		CaninePepperKnotty.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 4);
		CaninePepperKnotty.value         = 10;

		export const CaninePepperBulby  = new Item("Bulby P", "Bulby Pp", "a bulbous canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperBulby.description   = "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.";
		CaninePepperBulby.consumeEffect = createCallBackFunction(ConsumableEffects.canineTFs, 5);
		CaninePepperBulby.value         = 10;

		export const Equinum  = new Item("Equinum", "Equinum", "a vial of Equinum", ITEM_TYPE_CONSUMABLE);
		Equinum.description   = "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\". It is likely this potion is tied to horses in some way.";
		Equinum.consumeEffect = ConsumableEffects.equineTFs;

		export const GoblinAle  = new Item("Gob.Ale", "Goblin Ale", "a flagon of potent goblin ale", ITEM_TYPE_CONSUMABLE);
		GoblinAle.description   = "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew. Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.";
		GoblinAle.consumeEffect = ConsumableEffects.goblinTFs;

		export const GoldenSeed  = new Item("G.Seed", "Golden Seed", "a golden seed", ITEM_TYPE_CONSUMABLE);
		GoldenSeed.description   = "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.";
		GoldenSeed.consumeEffect = () => ConsumableEffects.harpyTFs(0);

		export const Hummanus  = new Item("Hummus ", "Hummanus", "a small jar of hummus", ITEM_TYPE_CONSUMABLE);
		Hummanus.description   = "This is a small jar with label that reads, \"<i>Hummanus</i>\". If the name clues you in, this might be how humanity is regained.";
		Hummanus.consumeEffect = ConsumableEffects.humanTFs;

		export const ImpFood  = new Item("ImpFood", "Imp Food", "a parcel of imp food", ITEM_TYPE_CONSUMABLE);
		ImpFood.description   = "This is a small parcel of reddish-brown bread stuffed with some kind of meat. It smells delicious.";
		ImpFood.consumeEffect = ConsumableEffects.impTFs;

		export const LaBova  = new Item("LaBova", "La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", ITEM_TYPE_CONSUMABLE);
		LaBova.description   = "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.";
		LaBova.consumeEffect = ()=>ConsumableEffects.cowTFs(true, false);

		export const Lactaid  = new Item("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", ITEM_TYPE_CONSUMABLE);
		Lactaid.description   = "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.";
		Lactaid.consumeEffect = ConsumableEffects.lactaid;

		export const MinotaurBlood  = new Item("M.Blood", "MinoBlood", "a vial of Minotaur blood", ITEM_TYPE_CONSUMABLE);
		MinotaurBlood.description   = "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.";
		MinotaurBlood.consumeEffect = ConsumableEffects.minotaurTFs;

		export const MinotaurCum  = new Item("M.Cum", "MinoCum", "a sealed bottle of minotaur cum", ITEM_TYPE_CONSUMABLE);
		MinotaurCum.description   = "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.";
		MinotaurCum.consumeEffect = ()=>ConsumableEffects.minotaurCum(false);
		MinotaurCum.value         = 60;

		export const PigTruffle  = new Item("PigTruf", "Pig Truffle", "a pigtail truffle", ITEM_TYPE_CONSUMABLE);
		PigTruffle.description   = "It's clear where this fungus gets its name. A small, curly sprig resembling a pig's tail can be seen jutting out of it.";
		PigTruffle.consumeEffect = ()=>ConsumableEffects.pigTFs;

		export const PureHoney  = new Item("PurHon", "Pure Honey", "a crystal vial filled with glittering honey", ITEM_TYPE_CONSUMABLE);
		PureHoney.description   = "This fine crystal vial is filled with a thick amber liquid that glitters in the light.  You can smell a sweet scent, even though it is tightly corked.";
		PureHoney.consumeEffect = ()=>ConsumableEffects.beeTFs(1);
		PureHoney.value         = 40;

		export const Reptilum  = new Item("Reptilum", "Reptilum", "a vial of Reptilum", ITEM_TYPE_CONSUMABLE);
		Reptilum.description   = "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.";
		Reptilum.consumeEffect = ConsumableEffects.lizardTFs;

		export const SnakeOil  = new Item("SnakeOil", "Snake Oil", "a vial of snake oil", ITEM_TYPE_CONSUMABLE);
		SnakeOil.description   = "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.";
		SnakeOil.consumeEffect = ConsumableEffects.snakeTFs;

		export const SpecialHoney  = new Item("SPHoney", "Special Honey", "a bottle of special bee honey", ITEM_TYPE_CONSUMABLE);
		SpecialHoney.description   = "A clear crystal bottle of a dark brown fluid that you got from the bee handmaiden.  It gives off a strong sweet smell even though the bottle is still corked.";
		SpecialHoney.consumeEffect = ()=>ConsumableEffects.beeTFs(2);
		SpecialHoney.value         = 20;

		export const TrapOil = new Item("TrapOil", "TrapOil", "a vial of trap oil.", ITEM_TYPE_CONSUMABLE);
		TrapOil.description  = "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.";
		//TrapOil.consumeEffect = ConsumableEffects.trapOil;

		export const WetCloth  = new Item("W.Cloth", "Wet Cloth", "a wet cloth dripping with slippery slime", ITEM_TYPE_CONSUMABLE);
		WetCloth.description   = "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.";
		WetCloth.consumeEffect = ConsumableEffects.slimeTFs; //TODO

		export const WhiskerFruit  = new Item("W.Fruit", "W.Fruit", "a piece of whisker-fruit", ITEM_TYPE_CONSUMABLE);
		WhiskerFruit.description   = "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.";
		WhiskerFruit.consumeEffect = ConsumableEffects.felineTFs;


		//------------
		// DEMONIC
		//------------
		export const IncubiDraft  = new Item("I.Draft", "I.Draft", "a flask of Incubi draft", ITEM_TYPE_CONSUMABLE);
		IncubiDraft.description   = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass.";
		IncubiDraft.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 0, false);

		export const IncubiDraftPurified  = new Item("P.Draft", "P.Draft", "an untainted flask of purified Incubi draft", ITEM_TYPE_CONSUMABLE);
		IncubiDraftPurified.description   = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.";
		IncubiDraftPurified.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 0, true);
		IncubiDraftPurified.value         = 20;

		export const SuccubiMilk  = new Item("SucMilk", "SucMilk", "a bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
		SuccubiMilk.description   = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"";
		SuccubiMilk.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 1, false);


		// There are two definitions for SuccubiMilkPurified. Which one is the correct one?
		export const SuccubiMilkPurified  = new Item("P.S.Mlk", "P.S.Milk", "an untainted bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
		SuccubiMilkPurified.description   = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\" Rathazul has purified this to prevent corruption upon use.";
		SuccubiMilkPurified.consumeEffect = createCallBackFunction(ConsumableEffects.demonTFs, 1, true);
		SuccubiMilkPurified.value         = 20;

		export const SuccubiDelight  = new Item("SDelite", "S.Delite", "a bottle of 'Succubi's Delight'", ITEM_TYPE_CONSUMABLE);
		SuccubiDelight.description   = "This precious fluid is often given to men a succubus intends to play with for a long time.";
		SuccubiDelight.consumeEffect = createCallBackFunction(ConsumableEffects.succubiDelight, false);

		export const SuccubiDelightPurified  = new Item("PSDelit", "PSDelit", "an untainted bottle of \"Succubi's Delight\"", ITEM_TYPE_CONSUMABLE);
		SuccubiDelightPurified.description   = "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.";
		SuccubiDelightPurified.consumeEffect = createCallBackFunction(ConsumableEffects.succubiDelight, true);
		SuccubiDelightPurified.value         = 20;


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
		FuckDraft.consumeEffect = createCallBackFunction(ConsumableEffects.lustDraft, true);
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
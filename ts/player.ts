class Spellbook {
	public blind        = false;
	public chargeWeapon = false;
	public whitefire    = false;
	public arouse       = false;
	public heal         = false;
	public might        = false;
}
class Player extends Creature {
	public teaseLevel            = 0;
	public teaseXP               = 0;
	public itemSlots: ItemSlot[] = [];
	public spells                = new Spellbook();
	public statPoints            = 0;
	public perkPoints            = 0;
	public hunger                = 80;
	public location              = "Camp";
	public originalGender        = Gender.NONE;
	public originalRace          = "human";

	constructor() {
		super();
		this.a           = "";
		this.name        = "";
		this.refName     = "You";
		this.isAre       = "are";
		this.heShe       = "you";
		this.himHer      = "you";
		this.hisHer      = "your";
		this.plural      = true;
		//Appearance
		this.gender      = 0; //0 genderless, 1 male, 2 female, 3 hermaphrodite
		this.tallness    = 60; //Height in inches
		this.skinTone    = "light";
		this.skinType    = SkinType.PLAIN;
		this.skinAdj     = "";
		this.hairType    = HairType.NORMAL;
		this.hairColor   = "brown";
		this.hairLength  = 1;
		this.beardStyle  = BeardStyle.NORMAL;
		this.beardLength = 0;
		this.furColor    = "none";

		this.earType      = EarType.HUMAN;
		this.tailType     = TailType.NONE;
		this.tailVenom    = 0;
		this.tailRecharge = 0;
		this.lowerBody    = LowerBodyType.HUMAN;

		this.tone       = 50;
		this.thickness  = 50;
		this.hipRating  = HIP_RATING_BOYISH;
		this.buttRating = BUTT_RATING_AVERAGE;

		//Sexual Characteristics
		//Cocks
		this.cocks               = [];
		this.balls               = 0;
		this.ballSize            = 0;
		this.hoursSinceCum       = 0;
		this.cumMultiplier       = 0;
		//Vaginas
		this.vaginas             = [];
		//Ass
		this.ass                 = new Ass(1, 0, true);
		//Breasts
		this.breastRows          = [];
		this.lactationMultiplier = 0;

		//Equipment
		this.weapon = Items.NOTHING;
		this.armor  = Items.Armor.ComfortableClothes;

		//Slots 0-9 are player inventory. Slots 10-55 are for gear storage options. See inventory.js for details
		// Initializing it here makes things easier.
		for (let i = 0; i < 56; i++) {
			this.itemSlots.push(new ItemSlot());
		}
		this.keyItems      = [];
		this.statusEffects = [];
		this.perks         = [];
	}

	public minLust():number {
		return 0;
	}

	public race():string {
		//Determine race type:
		let race = "human";
		if (this.catScore() >= 4) {
			if (this.isTaur() && this.lowerBody == LowerBodyType.CAT) {
				race = "cat-taur";
				if (this.faceType == FaceType.HUMAN)
					race = "sphinx-morph"; // no way to be fully feral anyway
			}
			else {
				race = "cat-morph";
				if (this.faceType == FaceType.HUMAN)
					race = "cat-" + this.mf("boy", "girl");
			}
		}
		if (this.lizardScore() >= 4)
			race = "lizan";
		if (this.dragonScore() >= 4) {
			race = "dragon-morph";
			if (this.faceType == FaceType.HUMAN)
				race = "dragon-" + this.mf("man", "girl");
		}
		if (this.raccoonScore() >= 4) {
			race = "raccoon-morph";
			if (this.balls > 0 && this.ballSize > 5)
				race = "tanuki-morph";
		}
		if (this.dogScore() >= 4) {
			if (this.isTaur() && this.lowerBody == LowerBodyType.DOG)
				race = "dog-taur";
			else {
				race = "dog-morph";
				if (this.faceType == FaceType.HUMAN)
					race = "dog-" + this.mf("man", "girl");
			}
		}
		if (this.foxScore() >= 4) {
			if (this.isTaur() && this.lowerBody == LowerBodyType.FOX)
				race = "fox-taur";
			else if (this.skinType == SkinType.FUR)
				race = "fox-morph";
			else
				race = "fox-" + this.mf("morph", "girl");
		}
		if (this.ferretScore() >= 4) {
			if (this.skinType == SkinType.FUR)
				race = "ferret-morph";
			else
				race = "ferret-" + this.mf("morph", "girl");
		}
		if (this.kitsuneScore() >= 4) {
			race = "kitsune";
		}
		if (this.horseScore() >= 3) {
			if (this.isTaur())
				race = "centaur-morph";
			else if (this.hornType == HornType.UNICORN)
				race = "unicorn-morph";
			else
				race = "equine-morph";
		}
		if (this.mutantScore() >= 5 && race == "human")
			race = "corrupted mutant";
		if (this.minotaurScore() >= 4)
			race = "minotaur-morph";
		if (this.cowScore() > 5) {
			race = "cow-";
			race += this.mf("morph", "girl");
		}
		if (this.beeScore() >= 5)
			race = "bee-morph";
		if (this.goblinScore() >= 5)
			race = "goblin";
		if (this.humanScore() >= 5 && race == "corrupted mutant")
			race = "somewhat human mutant";
		if (this.demonScore() > 4)
			race = "demon-morph";
		if (this.sharkScore() >= 3)
			race = "shark-morph";
		if (this.bunnyScore() >= 4)
			race = "bunny-" + this.mf("boy", "girl");
		if (this.harpyScore() >= 4) {
			if (this.gender >= 2)
				race = "harpy";
			else
				race = "avian";
		}
		if (this.spiderScore() >= 4) {
			race = "spider-morph";
			if (this.mf("no", "yes") == "yes")
				race = "spider-girl";
			if (this.isDrider())
				race = "drider";
		}
		if (this.kangaScore() >= 4)
			race = "kangaroo-morph";
		if (this.mouseScore() >= 3) {
			if (this.faceType != FaceType.MOUSE)
				race = "mouse-" + this.mf("boy", "girl");
			else
				race = "mouse-morph";
		}
		//<mod>
		if (this.pigScore() >= 4) {
			race = "pig-morph";
			if (this.faceType == FaceType.HUMAN)
				race = "pig-" + this.mf("boy", "girl");
			if (this.faceType == FaceType.BOAR)
				race = "boar-morph";
		}
		if (this.satyrScore() >= 4) {
			race = "satyr";
		}
		if (this.rhinoScore() >= 4) {
			race = "rhino-morph";
			if (this.faceType == FaceType.HUMAN) race = "rhino-" + this.mf("man", "girl");
		}
		if (this.echidnaScore() >= 4) {
			race = "echidna-morph";
			if (this.faceType == FaceType.HUMAN) race = "echidna-" + this.mf("boy", "girl");
		}
		if (this.deerScore() >= 4) {
			if (this.isTaur()) race = "deer-taur";
			else {
				race = "deer-morph";
				if (this.faceType == FaceType.HUMAN) race = "deer-" + this.mf("morph", "girl");
			}
		}
		//Special, bizarre races
		if (this.dragonneScore() >= 6) {
			if (this.isTaur()) race = "dragonne-taur";
			else {
				race = "dragonne-morph";
				if (this.faceType == FaceType.HUMAN)
					race = "dragonne-" + this.mf("man", "girl");
			}
		}
		if (this.manticoreScore() >= 6) {
			race = "manticore-morph";
			if (this.faceType == FaceType.HUMAN)
				race = "manticore-" + this.mf("man", "girl");
		}
		if (this.sirenScore() >= 4) {
			race = "siren";
		}
		//</mod>
		if (this.lowerBody == LowerBodyType.NAGA)
			race = "naga";
		if (this.lowerBody == LowerBodyType.HOOFED && this.isTaur()) {
			if (this.wingType == WingType.FEATHERED_LARGE) race = "pegataur";
			else race = "centaur";
		}
		if (this.lowerBody == LowerBodyType.PONY)
			race = "pony-kin";
		if (this.gooScore() >= 3) {
			race = "goo-";
			race += this.mf("boi", "girl");
		}
		return race;
	}

	//RACIAL SCORE

	//determine demon rating
	demonScore():number {
		let demonCounter = 0;
		if (this.hornType == HornType.DEMON && this.horns > 0)
			demonCounter++;
		if (this.hornType == HornType.DEMON && this.horns > 4)
			demonCounter++;
		if (this.tailType == TailType.DEMONIC)
			demonCounter++;
		if (this.wingType == WingType.BEE_LIKE_SMALL || this.wingType == WingType.BAT_LIKE_LARGE)
			demonCounter++;
		if (this.skinType == SkinType.PLAIN && this.cor > 50)
			demonCounter++;
		if (this.faceType == FaceType.HUMAN && this.cor > 50)
			demonCounter++;
		if (this.lowerBody == LowerBodyType.DEMONIC_HIGH_HEELS || this.lowerBody == LowerBodyType.DEMONIC_CLAWS)
			demonCounter++;
		if (this.countCocksOfType(CockTypesEnum.DEMON) > 0)
			demonCounter++;
		return demonCounter;
	}

	//Determine Human Rating
	humanScore():number {
		let humanCounter = 0;
		if (this.faceType == FaceType.HUMAN)
			humanCounter++;
		if (this.skinType == SkinType.PLAIN)
			humanCounter++;
		if (this.horns == 0)
			humanCounter++;
		if (this.tailType == TailType.NONE)
			humanCounter++;
		if (this.wingType == WingType.NONE)
			humanCounter++;
		if (this.lowerBody == LowerBodyType.HUMAN)
			humanCounter++;
		if (this.countCocksOfType(CockTypesEnum.HUMAN) == 1 && this.totalCocks() == 1)
			humanCounter++;
		if (this.breastRows.length == 1 && this.skinType == SkinType.PLAIN)
			humanCounter++;
		return humanCounter;
	}

	//Determine minotaur rating
	minotaurScore():number {
		let minoCounter = 0;
		if (this.faceType == FaceType.COW_MINOTAUR)
			minoCounter++;
		if (this.earType == EarType.COW)
			minoCounter++;
		if (this.tailType == TailType.COW)
			minoCounter++;
		if (this.hornType == HornType.COW_MINOTAUR)
			minoCounter++;
		if (this.lowerBody == LowerBodyType.HOOFED && minoCounter > 0)
			minoCounter++;
		if (this.tallness > 80 && minoCounter > 0)
			minoCounter++;
		if (this.cocks.length > 0 && minoCounter > 0) {
			if (this.countCocksOfType(CockTypesEnum.HORSE) > 0)
				minoCounter++;
		}
		if (this.vaginas.length > 0)
			minoCounter--;
		return minoCounter;
	}

	//Determine cow rating
	cowScore():number {
		let minoCounter = 0;
		if (this.faceType == FaceType.HUMAN)
			minoCounter++;
		if (this.faceType == FaceType.COW_MINOTAUR)
			minoCounter--;
		if (this.earType == EarType.COW)
			minoCounter++;
		if (this.tailType == TailType.COW)
			minoCounter++;
		if (this.hornType == HornType.COW_MINOTAUR)
			minoCounter++;
		if (this.lowerBody == LowerBodyType.HOOFED && minoCounter > 0)
			minoCounter++;
		if (this.tallness >= 73 && minoCounter > 0)
			minoCounter++;
		if (this.vaginas.length > 0)
			minoCounter++;
		if (this.biggestTitSize() > 4 && minoCounter > 0)
			minoCounter++;
		if (this.biggestLactation() > 2 && minoCounter > 0)
			minoCounter++;
		return minoCounter;
	}

	sandTrapScore():number {
		let counter = 0;
		if (this.hasStatusEffect(StatusEffects.BlackNipples))
			counter++;
		if (this.hasStatusEffect(StatusEffects.Uniball))
			counter++;
		if (this.hasVagina() && this.vaginaType() == VaginaTypesEnum.BLACK_SAND_TRAP)
			counter++;
		if (this.eyeType == EyeType.BLACK_EYES_SAND_TRAP)
			counter++;
		if (this.wingType == WingType.GIANT_DRAGONFLY)
			counter++;
		if (this.hasStatusEffect(StatusEffects.Uniball))
			counter++;
		return counter;
	}

	//Determine Bee Rating
	beeScore():number {
		let beeCounter = 0;
		if (this.hairColor == "shiny black")
			beeCounter++;
		if (this.hairColor == "black and yellow")
			beeCounter += 2;
		if (this.antennae != AntennaeType.NONE) {
			beeCounter++;
			if (this.faceType == FaceType.HUMAN)
				beeCounter++;
		}
		if (this.lowerBody == LowerBodyType.BEE) {
			beeCounter++;
			if (this.vaginas.length == 1)
				beeCounter++;
		}
		if (this.tailType == TailType.BEE_ABDOMEN)
			beeCounter++;
		if (this.wingType == WingType.BEE_LIKE_SMALL)
			beeCounter++;
		if (this.wingType == WingType.BAT_LIKE_LARGE)
			beeCounter++;
		return beeCounter;
	}

	//Determine Ferret Rating!
	ferretScore():number {
		let counter = 0;
		if (this.faceType == FaceType.FERRET_MASK) counter++;
		if (this.faceType == FaceType.FERRET) counter += 2;
		if (this.earType == EarType.FERRET) counter++;
		if (this.tailType == TailType.FERRET) counter++;
		if (this.lowerBody == LowerBodyType.FERRET) counter++;
		if (this.skinType == SkinType.FUR && counter > 0) counter++;
		return counter;
	}

	//Determine Dog Rating
	dogScore():number {
		let dogCounter = 0;
		if (this.faceType == FaceType.DOG)
			dogCounter++;
		if (this.earType == EarType.DOG)
			dogCounter++;
		if (this.tailType == TailType.DOG)
			dogCounter++;
		if (this.lowerBody == LowerBodyType.DOG)
			dogCounter++;
		if (this.countCocksOfType(CockTypesEnum.DOG) > 0)
			dogCounter++;
		if (this.breastRows.length > 1)
			dogCounter++;
		if (this.breastRows.length == 3)
			dogCounter++;
		if (this.breastRows.length > 3)
			dogCounter--;
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && dogCounter > 0)
			dogCounter++;
		return dogCounter;
	}

	mouseScore():number {
		let coonCounter = 0;
		if (this.earType == EarType.MOUSE)
			coonCounter++;
		if (this.tailType == TailType.MOUSE)
			coonCounter++;
		if (this.faceType == FaceType.BUCKTEETH)
			coonCounter++;
		if (this.faceType == FaceType.MOUSE)
			coonCounter += 2;
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && coonCounter > 0)
			coonCounter++;
		if (this.tallness < 55 && coonCounter > 0)
			coonCounter++;
		if (this.tallness < 45 && coonCounter > 0)
			coonCounter++;
		return coonCounter;
	}

	raccoonScore():number {
		let coonCounter = 0;
		if (this.faceType == FaceType.RACCOON_MASK)
			coonCounter++;
		if (this.faceType == FaceType.RACCOON)
			coonCounter += 2;
		if (this.earType == EarType.RACCOON)
			coonCounter++;
		if (this.tailType == TailType.RACCOON)
			coonCounter++;
		if (this.lowerBody == LowerBodyType.RACCOON)
			coonCounter++;
		if (coonCounter > 0 && this.balls > 0)
			coonCounter++;
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && coonCounter > 0)
			coonCounter++;
		return coonCounter;
	}

	//Determine Fox Rating
	foxScore():number {
		let foxCounter = 0;
		if (this.faceType == FaceType.FOX)
			foxCounter++;
		if (this.earType == EarType.FOX)
			foxCounter++;
		if (this.tailType == TailType.FOX)
			foxCounter++;
		if (this.lowerBody == LowerBodyType.FOX)
			foxCounter++;
		if (this.countCocksOfType(CockTypesEnum.DOG) && foxCounter > 0)
			foxCounter++;
		if (this.breastRows.length > 1 && foxCounter > 0)
			foxCounter++;
		if (this.breastRows.length == 3 && foxCounter > 0)
			foxCounter++;
		if (this.breastRows.length == 4 && foxCounter > 0)
			foxCounter++;
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && foxCounter > 0)
			foxCounter++;
		return foxCounter;
	}

	//Determine cat Rating
	catScore():number {
		let catCounter = 0;
		if (this.faceType == FaceType.CAT)
			catCounter++;
		if (this.earType == EarType.CAT)
			catCounter++;
		if (this.tailType == TailType.CAT)
			catCounter++;
		if (this.lowerBody == LowerBodyType.CAT)
			catCounter++;
		if (this.countCocksOfType(CockTypesEnum.CAT) > 0)
			catCounter++;
		if (this.breastRows.length > 1 && catCounter > 0)
			catCounter++;
		if (this.breastRows.length == 3 && catCounter > 0)
			catCounter++;
		if (this.breastRows.length > 3)
			catCounter -= 2;
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && catCounter > 0)
			catCounter++;
		return catCounter;
	}

	//Determine lizard rating
	lizardScore():number {
		let lizardCounter = 0;
		if (this.faceType == FaceType.LIZARD)
			lizardCounter++;
		if (this.earType == EarType.LIZARD)
			lizardCounter++;
		if (this.tailType == TailType.LIZARD)
			lizardCounter++;
		if (this.lowerBody == LowerBodyType.LIZARD)
			lizardCounter++;
		if (this.countCocksOfType(CockTypesEnum.LIZARD) > 0)
			lizardCounter++;
		if (this.horns > 0 && (this.hornType == HornType.DRACONIC_X2 || this.hornType == HornType.DRACONIC_X4_12_INCH_LONG))
			lizardCounter++;
		if (this.skinType == SkinType.SCALES)
			lizardCounter++;
		return lizardCounter;
	}

	spiderScore():number {
		let score = 0;
		if (this.eyeType == EyeType.FOUR_SPIDER_EYES)
			score += 2;
		if (this.faceType == FaceType.SPIDER_FANGS)
			score++;
		if (this.armType == ArmType.SPIDER)
			score++;
		if (this.lowerBody == LowerBodyType.CHITINOUS_SPIDER_LEGS || this.lowerBody == LowerBodyType.DRIDER_LOWER_BODY)
			score += 2;
		else if (score > 0)
			score--;
		if (this.tailType == TailType.SPIDER_ADBOMEN)
			score += 2;
		if (this.skinType != SkinType.PLAIN && score > 0)
			score--;
		return score;
	}

	//Determine Horse Rating
	horseScore():number {
		let horseCounter = 0;
		if (this.faceType == FaceType.HORSE)
			horseCounter++;
		if (this.earType == EarType.HORSE)
			horseCounter++;
		if (this.tailType == TailType.DOG)
			horseCounter++;
		if (this.countCocksOfType(CockTypesEnum.HORSE) > 0)
			horseCounter++;
		if (this.lowerBody == LowerBodyType.HOOFED || this.lowerBody == LowerBodyType.CENTAUR)
			horseCounter++;
		//Fur only counts if some equine features are present
		if (this.skinType == SkinType.FUR && horseCounter > 0)
			horseCounter++;
		return horseCounter;
	}

	//Determine kitsune Rating
	kitsuneScore():number {
		let kitsuneCounter = 0;
		//If the character has fox ears, +1
		if (this.earType == EarType.FOX)
			kitsuneCounter++;
		//If the character has a fox tail, +1
		if (this.tailType == TailType.FOX)
			kitsuneCounter++;
		//If the character has two or more fox tails, +2
		if (this.tailType == TailType.FOX && this.tailVenom >= 2)
			kitsuneCounter += 2;
		//If the character has tattooed skin, +1
		//9999
		//If the character has a 'vag of holding', +1
		if (this.vaginalCapacity() >= 8000)
			kitsuneCounter++;
		//If the character's kitsune score is greater than 0 and:
		//If the character has a normal face, +1
		if (kitsuneCounter > 0 && (this.faceType == FaceType.HUMAN || this.faceType == FaceType.FOX))
			kitsuneCounter++;
		//If the character's kitsune score is greater than 1 and:
		//If the character has "blonde","black","red","white", or "silver" hair, +1
		//if (kitsuneCounter > 0 && (InCollection(furColor, KitsuneScene.basicKitsuneHair) || InCollection(furColor, KitsuneScene.elderKitsuneColors)))
		//    kitsuneCounter++;
		//If the character's femininity is 40 or higher, +1
		if (kitsuneCounter > 0 && this.femininity >= 40)
			kitsuneCounter++;
		//If the character has fur, scales, or gooey skin, -1
		//if (this.skinType == SkinType.FUR && !InCollection(furColor, KitsuneScene.basicKitsuneFur) && !InCollection(furColor, KitsuneScene.elderKitsuneColors))
		//    kitsuneCounter--;
		if (this.skinType > SkinType.FUR)
			kitsuneCounter -= this.skinType; // -2 sor scales, -3 for goo
		//If the character has abnormal legs, -1
		if (this.lowerBody != LowerBodyType.HUMAN && this.lowerBody != LowerBodyType.FOX)
			kitsuneCounter--;
		//If the character has a nonhuman face, -1
		if (this.faceType != FaceType.HUMAN && this.faceType != FaceType.FOX)
			kitsuneCounter--;
		//If the character has ears other than fox ears, -1
		if (this.earType != EarType.FOX)
			kitsuneCounter--;
		//If the character has tail(s) other than fox tails, -1
		if (this.tailType != TailType.FOX)
			kitsuneCounter--;

		return kitsuneCounter;

	}

	//Determine Dragon Rating
	dragonScore():number {
		let dragonCounter = 0;
		if (this.faceType == FaceType.DRAGON)
			dragonCounter++;
		if (this.earType == EarType.DRAGON)
			dragonCounter++;
		if (this.tailType == TailType.DRACONIC)
			dragonCounter++;
		if (this.tongueType == TongueType.DRACONIC)
			dragonCounter++;
		if (this.countCocksOfType(CockTypesEnum.DRAGON) > 0)
			dragonCounter++;
		if (this.wingType == WingType.DRACONIC_SMALL || this.wingType == WingType.DRACONIC_LARGE)
			dragonCounter++;
		if (this.lowerBody == LowerBodyType.DRAGON)
			dragonCounter++;
		if (this.horns > 0 && (this.hornType == HornType.DRACONIC_X2 || this.hornType == HornType.DRACONIC_X4_12_INCH_LONG))
			dragonCounter++;
		if (this.skinType == SkinType.SCALES && dragonCounter > 0)
			dragonCounter++;
		if (this.hornType == HornType.DRACONIC_X4_12_INCH_LONG || this.hornType == HornType.DRACONIC_X2)
			dragonCounter++;
		if (this.hasPerk(PerkLib.Dragonfire))
			dragonCounter++;
		return dragonCounter;
	}

	//Goblinscore
	goblinScore():number {
		let horseCounter = 0;
		if (this.earType == EarType.ELFIN)
			horseCounter++;
		if (this.skinTone == "pale yellow" || this.skinTone == "grayish-blue" || this.skinTone == "green" || this.skinTone == "dark green")
			horseCounter++;
		if (horseCounter > 0) {
			if (this.faceType == FaceType.HUMAN)
				horseCounter++;
			if (this.tallness < 48)
				horseCounter++;
			if (this.hasVagina())
				horseCounter++;
			if (this.lowerBody == LowerBodyType.HUMAN)
				horseCounter++;
		}
		return horseCounter;
	}

	//Gooscore
	gooScore():number {
		let gooCounter = 0;
		if (this.hairType == HairType.GOO)
			gooCounter++;
		if (this.skinAdj == "slimy")
			gooCounter++;
		if (this.lowerBody == LowerBodyType.GOO)
			gooCounter++;
		if (this.vaginalCapacity() > 9000)
			gooCounter++;
		if (this.hasStatusEffect(StatusEffects.SlimeCraving))
			gooCounter++;
		return gooCounter;
	}

	//Nagascore
	nagaScore():number {
		let nagaCounter = 0;
		if (this.faceType == FaceType.SNAKE_FANGS)
			nagaCounter++;
		if (this.tongueType == TongueType.SNAKE)
			nagaCounter++;
		if (nagaCounter > 0 && this.antennae == AntennaeType.NONE)
			nagaCounter++;
		if (nagaCounter > 0 && this.wingType == WingType.NONE)
			nagaCounter++;
		return nagaCounter;
	}

	//Bunnyscore
	bunnyScore():number {
		let bunnyCounter = 0;
		if (this.faceType == FaceType.BUNNY)
			bunnyCounter++;
		if (this.tailType == TailType.RABBIT)
			bunnyCounter++;
		if (this.earType == EarType.BUNNY)
			bunnyCounter++;
		if (this.lowerBody == LowerBodyType.BUNNY)
			bunnyCounter++;
		//More than 2 balls reduces bunny score
		if (this.balls > 2 && bunnyCounter > 0)
			bunnyCounter--;
		//Human skin on bunmorph adds
		if (this.skinType == SkinType.PLAIN && bunnyCounter > 1)
			bunnyCounter++;
		//No wings and antennae a plus
		if (bunnyCounter > 0 && this.antennae == AntennaeType.NONE)
			bunnyCounter++;
		if (bunnyCounter > 0 && this.wingType == WingType.NONE)
			bunnyCounter++;
		return bunnyCounter;
	}

	//Harpyscore
	harpyScore():number {
		let harpy = 0;
		if (this.armType == ArmType.HARPY)
			harpy++;
		if (this.hairType == HairType.FEATHER)
			harpy++;
		if (this.wingType == WingType.FEATHERED_LARGE)
			harpy++;
		if (this.tailType == TailType.HARPY)
			harpy++;
		if (this.lowerBody == LowerBodyType.HARPY)
			harpy++;
		if (harpy >= 2 && this.faceType == FaceType.HUMAN)
			harpy++;
		if (harpy >= 2 && (this.earType == EarType.HUMAN || this.earType == EarType.ELFIN))
			harpy++;
		return harpy;
	}

	//Kangascore
	kangaScore():number {
		let kanga = 0;
		if (this.countCocksOfType(CockTypesEnum.KANGAROO) > 0)
			kanga++;
		if (this.earType == EarType.KANGAROO)
			kanga++;
		if (this.tailType == TailType.KANGAROO)
			kanga++;
		if (this.lowerBody == LowerBodyType.KANGAROO)
			kanga++;
		if (this.faceType == FaceType.KANGAROO)
			kanga++;
		if (kanga >= 2 && this.skinType == SkinType.FUR)
			kanga++;
		return kanga;
	}

	//sharkscore
	sharkScore():number {
		let sharkCounter = 0;
		if (this.faceType == FaceType.SHARK_TEETH)
			sharkCounter++;
		if (this.wingType == WingType.SHARK_FIN)
			sharkCounter++;
		if (this.tailType == TailType.SHARK)
			sharkCounter++;
		if (this.skinType == SkinType.PLAIN && (this.skinTone == "rough gray" || player.skinTone == "orange and black striped"))
			sharkCounter++;
		return sharkCounter;
	}

	//Determine Mutant Rating
	mutantScore():number {
		let mutantCounter = 0;
		if (this.faceType > FaceType.HUMAN)
			mutantCounter++;
		if (this.skinType > SkinType.PLAIN)
			mutantCounter++;
		if (this.tailType > TailType.NONE)
			mutantCounter++;
		if (this.cockTotal() > 1)
			mutantCounter++;
		if (this.hasCock() && this.hasVagina())
			mutantCounter++;
		if (this.hasFuckableNipples())
			mutantCounter++;
		if (this.breastRows.length > 1)
			mutantCounter++;
		if (this.faceType == FaceType.HORSE) {
			if (this.skinType == SkinType.FUR)
				mutantCounter--;
			if (this.tailType == TailType.HORSE)
				mutantCounter--;
		}
		if (this.faceType == FaceType.DOG) {
			if (this.skinType == SkinType.FUR)
				mutantCounter--;
			if (this.tailType == TailType.DOG)
				mutantCounter--;
		}
		if (this.faceType == FaceType.CAT) {
			if (this.skinType == SkinType.FUR)
				mutantCounter--;
			if (this.tailType == TailType.CAT)
				mutantCounter--;
		}
		return mutantCounter;
	}

	//Mod-added
	sirenScore():number {
		let sirenCounter = 0;
		if (this.faceType == FaceType.SHARK_TEETH && this.tailType == TailType.SHARK && this.wingType == WingType.FEATHERED_LARGE && this.armType == ArmType.HARPY)
			sirenCounter += 4;
		if (this.hasVagina() && sirenCounter > 0)
			sirenCounter++;
		if (this.hasCock() && this.countCocksOfType(CockTypesEnum.ANEMONE) > 0 && sirenCounter > 0)
			sirenCounter++;
		return sirenCounter;
	}

	pigScore():number {
		let pigCounter = 0;
		if (this.earType == EarType.PIG)
			pigCounter++;
		if (this.tailType == TailType.PIG)
			pigCounter++;
		if (this.faceType == FaceType.PIG || FaceType.BOAR)
			pigCounter++;
		if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED)
			pigCounter += 2;
		if (this.countCocksOfType(CockTypesEnum.PIG) > 0)
			pigCounter++;
		return pigCounter;
	}

	satyrScore():number {
		let satyrCounter = 0;
		if (this.lowerBody == LowerBodyType.HOOFED)
			satyrCounter++;
		if (this.tailType == TailType.GOAT)
			satyrCounter++;
		if (satyrCounter >= 2) {
			if (this.earType == EarType.ELFIN)
				satyrCounter++;
			if (this.faceType == FaceType.HUMAN)
				satyrCounter++;
			if (this.countCocksOfType(CockTypesEnum.HUMAN) > 0)
				satyrCounter++;
			if (this.balls > 0 && this.ballSize >= 3)
				satyrCounter++;
		}
		return satyrCounter;
	}

	rhinoScore():number {
		let rhinoCounter = 0;
		if (this.earType == EarType.RHINO)
			rhinoCounter++;
		if (this.tailType == TailType.RHINO)
			rhinoCounter++;
		if (this.faceType == FaceType.RHINO)
			rhinoCounter++;
		if (this.hornType == HornType.RHINO)
			rhinoCounter++;
		if (rhinoCounter >= 2 && this.skinTone == "gray")
			rhinoCounter++;
		if (rhinoCounter >= 2 && this.hasCock() && this.countCocksOfType(CockTypesEnum.RHINO) > 0)
			rhinoCounter++;
		return rhinoCounter;
	}

	echidnaScore():number {
		let echidnaCounter = 0;
		if (this.earType == EarType.ECHIDNA)
			echidnaCounter++;
		if (this.tailType == TailType.ECHIDNA)
			echidnaCounter++;
		if (this.faceType == FaceType.ECHIDNA)
			echidnaCounter++;
		if (this.tongueType == TongueType.ECHIDNA)
			echidnaCounter++;
		if (this.lowerBody == LowerBodyType.ECHIDNA)
			echidnaCounter++;
		if (echidnaCounter >= 2 && this.skinType == SkinType.FUR)
			echidnaCounter++;
		if (echidnaCounter >= 2 && this.hasCock() && this.countCocksOfType(CockTypesEnum.ECHIDNA) > 0)
			echidnaCounter++;
		return echidnaCounter;
	}

	deerScore():number {
		let deerCounter = 0;
		if (this.earType == EarType.DEER)
			deerCounter++;
		if (this.tailType == TailType.DEER)
			deerCounter++;
		if (this.faceType == FaceType.DEER)
			deerCounter++;
		if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED || this.lowerBody == LowerBodyType.DEERTAUR)
			deerCounter++;
		if (this.hornType == HornType.ANTLERS && this.horns >= 4)
			deerCounter++;
		if (deerCounter >= 2 && this.skinType == SkinType.FUR)
			deerCounter++;
		if (deerCounter >= 3 && this.countCocksOfType(CockTypesEnum.HORSE) > 0)
			deerCounter++;
		return deerCounter;
	}

	//Dragonne
	dragonneScore():number {
		let dragonneCounter = 0;
		if (this.faceType == FaceType.CAT)
			dragonneCounter++;
		if (this.earType == EarType.CAT)
			dragonneCounter++;
		if (this.tailType == TailType.CAT)
			dragonneCounter++;
		if (this.tongueType == TongueType.DRACONIC)
			dragonneCounter++;
		if (this.wingType == WingType.DRACONIC_LARGE || this.wingType == WingType.DRACONIC_SMALL)
			dragonneCounter++;
		if (this.lowerBody == LowerBodyType.CAT)
			dragonneCounter++;
		if (this.skinType == SkinType.SCALES && dragonneCounter > 0)
			dragonneCounter++;
		return dragonneCounter;
	}

	//Manticore
	manticoreScore():number {
		let catCounter = 0;
		if (this.faceType == FaceType.CAT)
			catCounter++;
		if (this.earType == EarType.CAT)
			catCounter++;
		if (this.tailType == TailType.SCORPION)
			catCounter += 2;
		if (this.lowerBody == LowerBodyType.CAT)
			catCounter++;
		if (catCounter >= 4) {
			if (this.hornType == HornType.DEMON || this.hornType == HornType.DRACONIC_X2 || this.hornType == HornType.DRACONIC_X4_12_INCH_LONG)
				catCounter++;
			if (this.wingType == WingType.BAT_LIKE_TINY || this.wingType == WingType.DRACONIC_SMALL)
				catCounter++;
			if (this.wingType == WingType.BAT_LIKE_LARGE || this.wingType == WingType.DRACONIC_LARGE)
				catCounter += 2;
		}
		//Fur only counts if some canine features are present
		if (this.skinType == SkinType.FUR && catCounter >= 6)
			catCounter++;
		return catCounter;
	}

	//APPEARANCE
	bodyType():string {
		let desc = "";
		//OLD STUFF
		//SUPAH THIN
		if (this.thickness < 10) {
			//SUPAH BUFF
			if (this.tone > 90)
				desc += "a lithe body covered in highly visible muscles";
			else if (this.tone > 75)
				desc += "an incredibly thin, well-muscled frame";
			else if (this.tone > 50)
				desc += "a very thin body that has a good bit of muscle definition";
			else if (this.tone > 25)
				desc += "a lithe body and only a little bit of muscle definition";
			else
				desc += "a waif-thin body, and soft, forgiving flesh";
		} else if (this.thickness < 25) {
			//Pretty thin
			if (this.tone > 90)
				desc += "a thin body and incredible muscle definition";
			else if (this.tone > 75)
				desc += "a narrow frame that shows off your muscles";
			else if (this.tone > 50)
				desc += "a somewhat lithe body and a fair amount of definition";
			else if (this.tone > 25)
				desc += "a narrow, soft body that still manages to show off a few muscles";
			else
				desc += "a thin, soft body";
		} else if (this.thickness < 40) {
			//Somewhat thin
			if (this.tone > 90)
				desc += "a fit, somewhat thin body and rippling muscles all over";
			else if (this.tone > 75)
				desc += "a thinner-than-average frame and great muscle definition";
			else if (this.tone > 50)
				desc += "a somewhat narrow body and a decent amount of visible muscle";
			else if (this.tone > 25)
				desc += "a moderately thin body, soft curves, and only a little bit of muscle";
			else
				desc += "a fairly thin form and soft, cuddle-able flesh";
		} else if (this.thickness < 60) {
			//average
			if (this.tone > 90)
				desc += "average thickness and a bevy of perfectly defined muscles";
			else if (this.tone > 75)
				desc += "an average-sized frame and great musculature";
			else if (this.tone > 50)
				desc += "a normal waistline and decently visible muscles";
			else if (this.tone > 25)
				desc += "an average body and soft, unremarkable flesh";
			else
				desc += "an average frame and soft, untoned flesh with a tendency for jiggle";
		} else if (this.thickness < 75) {
			if (this.tone > 90) 
				desc += "a somewhat thick body that's covered in slabs of muscle";
			else if (this.tone > 75)
				desc += "a body that's a little bit wide and has some highly-visible muscles";
			else if (this.tone > 50)
				desc += "a solid build that displays a decent amount of muscle";
			else if (this.tone > 25)
				desc += "a slightly wide frame that displays your curves and has hints of muscle underneath";
			else
				desc += "a soft, plush body with plenty of jiggle";
		} else if (this.thickness < 90) {
			if (this.tone > 90)
				desc += "a thickset frame that gives you the appearance of a wall of muscle";
			else if (this.tone > 75)
				desc += "a burly form and plenty of muscle definition";
			else if (this.tone > 50)
				desc += "a solid, thick frame and a decent amount of muscles";
			else if (this.tone > 25)
				desc += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
			else {
				desc += "a wide, cushiony body";
				if (this.gender >= 2 || this.biggestTitSize() > 3 || this.hipRating > 7 || this.buttRating > 7)
					desc += " and plenty of jiggle on your curves";
			}
		} else {
			//Chunky monkey
			if (this.tone > 90)
				desc += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
			else if (this.tone > 75)
				desc += "a very wide body and enough muscle to make you look like a tank";
			else if (this.tone > 50)
				desc += "an extremely substantial frame packing a decent amount of muscle";
			else if (this.tone > 25) {
				desc += "a very wide body";
				if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
					desc += ", lots of curvy jiggles,";
				desc += " and hints of muscle underneath";
			} else {
				desc += "a thick";
				if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
					desc += ", voluptuous";
				desc += " body and plush, ";
				if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
					desc += " jiggly curves";
				else
					desc += " soft flesh";
			}
		}
		return desc;
	}

	lengthChange(amount:number, ncocks:number) {
		if (amount < 0 && hyperHappy) {
			return;
		}
		//Display the degree of length change.
		if (amount <= 1 && amount > 0) {
			if (this.cocks.length == 1) outputText("Your " + player.cockDescript(0) + " has grown slightly longer.");
			if (this.cocks.length > 1) {
				if (ncocks == 1) outputText("One of your " + player.multiCockDescriptLight() + " grows slightly longer.");
				if (ncocks > 1 && ncocks < this.cocks.length) outputText("Some of your " + player.multiCockDescriptLight() + " grow slightly longer.");
				if (ncocks == this.cocks.length) outputText("Your " + player.multiCockDescriptLight() + " seem to fill up... growing a little bit larger.");
			}
		}
		if (amount > 1 && amount < 3) {
			if (this.cocks.length == 1) outputText("A very pleasurable feeling spreads from your groin as your " + player.cockDescript(0) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.");
			if (this.cocks.length > 1) {
				if (ncocks == this.cocks.length) outputText("A very pleasurable feeling spreads from your groin as your " + player.multiCockDescriptLight() + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.");
				if (ncocks == 1) outputText("A very pleasurable feeling spreads from your groin as one of your " + player.multiCockDescriptLight() + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.");
				if (ncocks > 1 && ncocks < this.cocks.length) outputText("A very pleasurable feeling spreads from your groin as " + num2Text(ncocks) + " of your " + player.multiCockDescriptLight() + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.");
			}
		}
		if (amount >= 3) {
			if (this.cocks.length == 1) outputText("Your " + this.cockDescript(0) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.");
			if (this.cocks.length > 1) {
				if (ncocks == 1) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as one of their number begins to grow inch after inch of length.");
				if (ncocks > 1 && ncocks < this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly number as " + num2Text(ncocks) + " of them begin to grow inch after inch of added length.");
				if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as inch after inch of length pour out from your groin.");
			}
		}
		//Display LengthChange
		if (amount > 0) {
			if (this.cocks[0].cockLength >= 8 && this.cocks[0].cockLength - amount < 8) {
				if (this.cocks.length == 1) outputText("  <b>Most men would be overly proud to have a tool as long as yours.</b>");
				if (this.cocks.length > 1) outputText("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + Appearance.multiCockDescript(this) + ".</b>");
			}
			if (this.cocks[0].cockLength >= 12 && this.cocks[0].cockLength - amount < 12) {
				if (this.cocks.length == 1) outputText("  <b>Your " + this.cockDescript(0) + " is so long it nearly swings to your knee at its full length.</b>");
				if (this.cocks.length > 1) outputText("  <b>Your " + this.multiCockDescriptLight() + " are so long they nearly reach your knees when at full length.</b>");
			}
			if (this.cocks[0].cockLength >= 16 && this.cocks[0].cockLength - amount < 16) {
				if (this.cocks.length == 1) outputText("  <b>Your " + this.cockDescript(0) + " would look more at home on a large horse than you.</b>");
				if (this.cocks.length > 1) outputText("  <b>Your " + this.multiCockDescriptLight() + " would look more at home on a large horse than on your body.</b>");
				if (this.biggestTitSize() >= BREAST_CUP_C) {
					if (this.cocks.length == 1) outputText("  You could easily stuff your " + this.cockDescript(0) + " between your breasts and give yourself the titty-fuck of a lifetime.");
					if (this.cocks.length > 1) outputText("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.");
				}
				else {
					if (this.cocks.length == 1) outputText("  Your " + this.cockDescript(0) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.");
					if (this.cocks.length > 1) outputText("  Your " + this.multiCockDescriptLight() + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.");
				}
			}
			if (this.cocks[0].cockLength >= 20 && this.cocks[0].cockLength - amount < 20) {
				if (this.cocks.length == 1) outputText("  <b>As if the pulsing heat of your " + this.cockDescript(0) + " wasn't enough, the tip of your " + this.cockDescript(0) + " keeps poking its way into your view every time you get hard.</b>");
				if (this.cocks.length > 1) outputText("  <b>As if the pulsing heat of your " + this.multiCockDescriptLight() + " wasn't bad enough, every time you get hard, the tips of your " + this.multiCockDescriptLight() + " wave before you, obscuring the lower portions of your vision.</b>");
				if (this.cor > 40 && this.cor <= 60) {
					if (this.cocks.length > 1) outputText("  You wonder if there is a demon or beast out there that could take the full length of one of your " + this.multiCockDescriptLight() + "?");
					if (this.cocks.length == 1) outputText("  You wonder if there is a demon or beast out there that could handle your full length.");
				}
				if (this.cor > 60 && this.cor <= 80) {
					if (this.cocks.length > 1) outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.multiCockDescriptLight() + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.");
					if (this.cocks.length == 1) outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.cockDescript(0) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.");
				}
				if (this.cor > 80) {
					if (this.cocks.length > 1) outputText("  You find yourself fantasizing about impaling nubile young champions on your " + this.multiCockDescriptLight() + " in a year's time.");
				}
			}
		}
		//Display the degree of length loss.
		if (amount < 0 && amount >= -1) {
			if (this.cocks.length == 1) outputText("Your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.");
			if (this.cocks.length > 1) {
				if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.");
				if (ncocks > 1 && ncocks < this.cocks.length) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.");
				if (ncocks == 1) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.");
			}
		}
		if (amount < -1 && amount > -3) {
			if (this.cocks.length == 1) outputText("Your " + this.multiCockDescriptLight() + " shrinks smaller, flesh vanishing into your groin.");
			if (this.cocks.length > 1) {
				if (ncocks == this.cocks.length) outputText("Your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.");
				if (ncocks == 1) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.");
				if (ncocks > 1 && ncocks < this.cocks.length) outputText("You feel " + num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.");
			}
		}
		if (amount <= -3) {
			if (this.cocks.length == 1) outputText("A large portion of your " + this.multiCockDescriptLight() + "'s length shrinks and vanishes.");
			if (this.cocks.length > 1) {
				if (ncocks == this.cocks.length) outputText("A large portion of your " + this.multiCockDescriptLight() + " receeds towards your groin, receding rapidly in length.");
				if (ncocks == 1) outputText("A single member of your " + this.multiCockDescriptLight() + " vanishes into your groin, receding rapidly in length.");
				if (ncocks > 1 && this.cocks.length > ncocks) outputText("Your " + this.multiCockDescriptLight() + " tingles as " + num2Text(ncocks) + " of your members vanish into your groin, receding rapidly in length.");
			}
		}
	}

	//Armour Descript & Clothed or Naked!
	armorDescript(nakedText:string="gear"):string {
		//Main Function
		let textArray = [];
		let text      = "";
		//if (armor != ArmorLib.NOTHING) text += armorName;
		//Join text.
		if (this.armor.equipmentName != "naked") textArray.push(this.armor.equipmentName);
		//if (upperGarment != UndergarmentLib.NOTHING) textArray.push(upperGarmentName);
		//if (lowerGarment != UndergarmentLib.NOTHING) textArray.push(lowerGarmentName);
		if (textArray.length > 0) text = formatStringArray(textArray);
		//Naked?
		if (this.armor.equipmentName == "naked") text = nakedText;
		//if (upperGarment == UndergarmentLib.NOTHING && lowerGarment == UndergarmentLib.NOTHING && armor == ArmorLib.NOTHING) text = nakedText;
		return text;
	}

	clothedOrNaked(clothedText:string, nakedText:string=""):string {
		return (this.armorDescript() != "nothing" ? clothedText : nakedText);
	}

	clothedOrNakedUpper(clothedText:string, nakedText:string=""):string {
		return (this.armor.equipmentName != "nothing" && this.upperGarment.equipmentName == "nothing" ? clothedText : nakedText);
	}

	clothedOrNakedLower(clothedText:string, nakedText:string=""):string {
		return (this.armor.equipmentName != "nothing" && (this.armor.equipmentName != "lethicite armor" && this.lowerGarment.equipmentName == "nothing") && !this.isTaur() ? clothedText : nakedText);
	}

	clearStatuses() {
		/*while (this.hasStatusEffect(StatusEffects.Web)) {
			this.modStats("spe", this.statusEffectValue(StatusEffects.Web, 1));
			this.removeStatusEffect(StatusEffects.Web);
		}*/
		//if (this.hasStatusEffect(StatusEffects.Shielding)) this.removeStatusEffect(StatusEffects.Shielding);
		//if (this.hasStatusEffect(StatusEffects.HolliConstrict)) this.removeStatusEffect(StatusEffects.HolliConstrict);
		//if (this.hasStatusEffect(StatusEffects.LustStones)) this.removeStatusEffect(StatusEffects.LustStones);
		//if (monster.hasStatusEffect(StatusEffects.Sandstorm)) monster.removeStatusEffect(StatusEffects.Sandstorm);
		//if (this.hasStatusEffect(StatusEffects.Sealed)) this.removeStatusEffect(StatusEffects.Sealed);
		//if (this.hasStatusEffect(StatusEffects.Berzerking)) this.removeStatusEffect(StatusEffects.Berzerking);
		//if (monster.hasStatusEffect(StatusEffects.TailWhip)) monster.removeStatusEffect(StatusEffects.TailWhip);
		//if (this.hasStatusEffect(StatusEffects.UBERWEB)) this.removeStatusEffect(StatusEffects.UBERWEB);
		//if (this.hasStatusEffect(StatusEffects.DriderKiss)) this.removeStatusEffect(StatusEffects.DriderKiss);
		//if (this.hasStatusEffect(StatusEffects.WebSilence)) this.removeStatusEffect(StatusEffects.WebSilence);
		//if (this.hasStatusEffect(StatusEffects.GooArmorSilence)) this.removeStatusEffect(StatusEffects.GooArmorSilence);
		//if (this.hasStatusEffect(StatusEffects.Whispered)) this.removeStatusEffect(StatusEffects.Whispered);
		/*if (this.hasStatusEffect(StatusEffects.AkbalSpeed)) {
			this.modStats("spe", -this.statusEffectValue(StatusEffects.AkbalSpeed, 1));
			this.removeStatusEffect(StatusEffects.AkbalSpeed);
		}*/
		/*if (this.hasStatusEffect(StatusEffects.AmilyVenom)) {
			this.modStats("str", this.statusEffectValue(StatusEffects.AmilyVenom, 1));
			this.modStats("spe", this.statusEffectValue(StatusEffects.AmilyVenom, 2));
			this.removeStatusEffect(StatusEffects.AmilyVenom);
		}*/
		while (this.hasStatusEffect(StatusEffects.Blind)) this.removeStatusEffect(StatusEffects.Blind);
		//if (this.hasStatusEffect(StatusEffects.SheilaOil)) this.removeStatusEffect(StatusEffects.SheilaOil);
		/*if (this.hasStatusEffect(StatusEffects.TwuWuv)) {
			this.modStats("int", this.statusEffectValue(StatusEffects.TwuWuv, 1));
			this.removeStatusEffect(StatusEffects.TuvWuv);
		}*/
		if (this.hasStatusEffect(StatusEffects.Bind)) this.removeStatusEffect(StatusEffects.Bind);
		let s = this.findStatusEffectByType(StatusEffects.Venom);
		if (s) {
			if (s.value1 == VENOM_TYPE_BEE) {
				this.modStats("str", s.value2);
				this.modStats("spe", s.value3);
			}
			this.removeStatusEffect(StatusEffects.Venom);
		}
		if (this.hasStatusEffect(StatusEffects.Silence)) this.removeStatusEffect(StatusEffects.Silence);

		if (this.hasStatusEffect(StatusEffects.StoneLust)) this.removeStatusEffect(StatusEffects.StoneLust);
		//this.removeStatusEffect(StatusEffects.FirstAttack);
		if (this.hasStatusEffect(StatusEffects.TemporaryHeat)) this.removeStatusEffect(StatusEffects.TemporaryHeat);
		if (this.hasStatusEffect(StatusEffects.NoFlee)) this.removeStatusEffect(StatusEffects.NoFlee);
		if (this.hasStatusEffect(StatusEffects.Poison)) this.removeStatusEffect(StatusEffects.Poison);
		//if (this.hasStatusEffect(StatusEffects.IsabellaStunned)) this.removeStatusEffect(StatusEffects.IsabellaStunned);
		if (this.hasStatusEffect(StatusEffects.Stunned)) this.removeStatusEffect(StatusEffects.Stunned);
		if (this.hasStatusEffect(StatusEffects.Confusion)) this.removeStatusEffect(StatusEffects.Confusion);
		//if (this.hasStatusEffect(StatusEffects.ThroatPunch)) this.removeStatusEffect(StatusEffects.ThroatPunch);
		//if (this.hasStatusEffect(StatusEffects.KissOfDeath)) this.removeStatusEffect(StatusEffects.KissOfDeath);
		//if (this.hasStatusEffect(StatusEffects.AcidSlap)) this.removeStatusEffect(StatusEffects.AcidSlap);
		/*if (this.hasStatusEffect(StatusEffects.CalledShot)) {
			this.modStats("spe", this.statusEffectValue(StatusEffects.CalledShot, 1));
			this.removeStatusEffect(StatusEffects.CalledShot);
		}*/
		//if (this.hasStatusEffect(StatusEffects.DemonSeed)) this.removeStatusEffect(StatusEffects.DemonSeed);
		//if (this.hasStatusEffect(StatusEffects.InfestAttempted)) this.removeStatusEffect(StatusEffects.InfestAttempted);
		s = this.findStatusEffectByType(StatusEffects.Might);
		if (s) {
			this.modStats("str", -s.value1);
			this.modStats("tou", -s.value2);
			this.removeStatusEffect(StatusEffects.Might);
		}
		if (this.hasStatusEffect(StatusEffects.ChargeWeapon)) this.removeStatusEffect(StatusEffects.ChargeWeapon);
		/*if (this.hasStatusEffect(StatusEffects.Disarmed)) {
			this.removeStatusEffect(StatusEffects.Disarmed);
		}*/
		/*if (this.hasStatusEffect(StatusEffects.AnemoneVenom)) {
			this.modStats("str", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
			this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 2));
			this.removeStatusEffect(StatusEffects.AnemoneVenom);
		}*/
		/*if (this.hasStatusEffect(StatusEffects.GnollSpear)) {
			this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
			this.removeStatusEffect(StatusEffects.GnollSpear);
		}*/
		//if (this.hasStatusEffect(StatusEffects.BasiliskCompulsion)) this.removeStatusEffect(StatusEffects.BasiliskCompulsion);
		/*if (this.hasStatusEffect(StatusEffects.BasiliskSlow)) {
			this.modStats("spe", this.statusEffectValue(StatusEffects.AnemoneVenom, 1));
			this.removeStatusEffect(StatusEffects.BasiliskSlow);
		}*/
		//if (this.hasStatusEffect(StatusEffects.GiantGrabbed)) this.removeStatusEffect(StatusEffects.GiantGrabbed);
		//if (this.hasStatusEffect(StatusEffects.GiantBoulder)) this.removeStatusEffect(StatusEffects.GiantBoulder);
		/*if (this.hasStatusEffect(StatusEffects.GiantStrLoss)) {
			this.modStats("str", this.statusEffectValue(StatusEffects.GiantStrLoss, 1));
			this.removeStatusEffect(StatusEffects.GiantStrLoss);
		}*/
		/*if (this.hasStatusEffect(StatusEffects.LizanBlowpipe)) {
			this.modStats("str", this.statusEffectValue(StatusEffects.LizanBlowpipe, 1));
			this.modStats("tou", this.statusEffectValue(StatusEffects.LizanBlowpipe, 2));
			this.modStats("spe", this.statusEffectValue(StatusEffects.LizanBlowpipe, 3));
			this.modStats("sen", -this.statusEffectValue(StatusEffects.LizanBlowpipe, 4));
			this.removeStatusEffect(StatusEffects.LizanBlowpipe);
		}*/
		//while (this.hasStatusEffect(StatusEffects.IzmaBleed)) this.removeStatusEffect(StatusEffects.IzmaBleed);
		/*if (this.hasStatusEffect(StatusEffects.GardenerSapSpeed)) {
			this.modStats("spe", this.statusEffectValue(StatusEffects.GardenerSapSpeed, 1));
			this.removeStatusEffect(StatusEffects.GardenerSapSpeed);
		}*/
		//if (this.hasStatusEffect(StatusEffects.KnockedBack)) this.removeStatusEffect(StatusEffects.KnockedBack);
		//if (this.hasStatusEffect(StatusEffects.RemovedArmor)) this.removeStatusEffect(StatusEffects.RemovedArmor);
		//if (this.hasStatusEffect(StatusEffects.JCLustLevel)) this.removeStatusEffect(StatusEffects.JCLustLevel);
		//if (this.hasStatusEffect(StatusEffects.MirroredAttack)) this.removeStatusEffect(StatusEffects.MirroredAttack);
		//if (this.hasStatusEffect(StatusEffects.Tentagrappled)) this.removeStatusEffect(StatusEffects.Tentagrappled);
		//if (this.hasStatusEffect(StatusEffects.TentagrappleCooldown)) this.removeStatusEffect(StatusEffects.TentagrappleCooldown);
		//if (this.hasStatusEffect(StatusEffects.ShowerDotEffect)) this.removeStatusEffect(StatusEffects.ShowerDotEffect);
		//if (this.hasStatusEffect(StatusEffects.VineHealUsed)) this.removeStatusEffect(StatusEffects.VineHealUsed);
	}

	setFurColor(colorArray:string[]) {
		if (this.skinType == SkinType.FUR) {
			this.furColor = randomChoice(colorArray);
		}
	}

	refillHunger(amount:number) {
		this.hunger += amount;
		if (this.hunger > 100) this.hunger = 100;
	}

	damageHunger(amount:number) {
		outputText("You take <b><font color='#daa520'>" + amount + "</font></b> hunger damage.");
		this.hunger -= amount;
		if (this.hunger < 0) this.hunger = 0;
	}

	//ITEMS
	getMaxSlots():number {
		let slots = 3;
		if (this.hasPerk(PerkLib.StrongBack))
			slots++;
		if (this.hasPerk(PerkLib.StrongBack2))
			slots++;
		return slots;
	}

	hasItem(itype:Item, minQuantity:number=1):boolean {
		return this.itemCount(itype) >= minQuantity;
	}

	itemCount(itype:Item):number {
		let count = 0;
		for (let i = 0; i < this.itemSlots.length; i++) {
			if (this.itemSlots[i].itype == itype) count += this.itemSlots[i].quantity;
		}
		return count;
	}

	roomInExistingStack(itype:Item):number {
		for (let i = 0; i < 10; i++) {
			if (this.itemSlots[i].itype == itype && this.itemSlots[i].quantity != 0 && this.itemSlots[i].quantity < 5)
				return i;
		}
		return -1;
	}

	emptySlot():number {
		for (let i = 0; i < this.itemSlots.length; i++) {
			if ((this.itemSlots[i].itype == undefined || this.itemSlots[i].itype == Items.NOTHING) && i < this.getMaxSlots()) return i;
		}
		return -1;
	}

	destroyItems(itype:Item, numOfItemToRemove:number):boolean {
		for (let slotNum = 0; slotNum < this.itemSlots.length; slotNum += 1) {
			if (this.itemSlots[slotNum].itype == itype) {
				while (this.itemSlots[slotNum].quantity > 0 && numOfItemToRemove > 0) {
					this.itemSlots[slotNum].removeOneItem();
					numOfItemToRemove--;
				}
			}
		}
		return numOfItemToRemove <= 0;
	}

	//OTHERS
	changeXP(amount:number) {
		player.XP += amount;
		if (player.XP < 0) player.XP = 0; //Keep from going into negative.
		if (player.XP > 9999) player.XP = 9999;
		refreshStats();
	}

	changeGems(amount:number) {
		player.gems += amount;
		if (player.gems < 0) player.gems = 0; //Keep from going into negative.
		if (player.gems > Number.MAX_VALUE) player.gems = Number.MAX_VALUE;
		refreshStats();
	}

}

let tempStr = 0;
let tempTou = 0;
let tempSpe = 0;
let tempInt = 0;

/*Player.prototype.lustVuln = {
 get lustVuln() {
 let percent = 100;
 //Level-based
 if (this.level < 10)
 percent -= (this.level - 1) * 3;
 else
 percent -= 27;
 //Perk-based
 if (this.hasPerk(PerkLib.Resistance))
 percent -= 10;
 //Apply cap
 if (percent < 25)
 percent = 25;
 return percent / 100;
 }
 }*/



// Eventually, this should contain the entire char appearance.
// At the moment, it's pretty piecemeal.
// TODO remove when we have proper enums for this
namespace Appearance {
	export function inverseMap(x: any): any {
		let result: any = {};
		for (let i in x) {
			result[String(x[i])] = i;
		}
		return result;
	}

	export function hairOrFur(i_creature: Creature): string {
		return i_creature.skinType == SkinType.FUR ? "fur" : "hair";
	}

	export function hairDescription(i_creature: Creature): string {
		let description = "";
		let options;
		//
		// LENGTH ADJECTIVE!
		//
		if (i_creature.hairLength == 0) {
			options     = ["shaved",
				"bald",
				"smooth",
				"hairless",
				"glabrous"];
			description = randomChoice(options) + " head";
			return description;
		}
		if (i_creature.hairLength < 1) {
			options = ["close-cropped, ",
				"trim, ",
				"very short, "];
			description += randomChoice(options);
		}
		if (i_creature.hairLength >= 1 && i_creature.hairLength < 3) description += "short, ";
		if (i_creature.hairLength >= 3 && i_creature.hairLength < 6) description += "shaggy, ";
		if (i_creature.hairLength >= 6 && i_creature.hairLength < 10) description += "moderately long, ";
		if (i_creature.hairLength >= 10 && i_creature.hairLength < 16) {
			if (rand(2) == 0) description += "long, ";
			else description += "shoulder-length, ";
		}
		if (i_creature.hairLength >= 16 && i_creature.hairLength < 26) {
			if (rand(2) == 0) description += "very long, ";
			else description += "flowing locks of ";
		}
		if (i_creature.hairLength >= 26 && i_creature.hairLength < 40) description += "ass-length, ";
		if (i_creature.hairLength >= 40 && i_creature.hairLength < i_creature.tallness) description += "obscenely long, ";
		else if (i_creature.hairLength >= i_creature.tallness) {
			if (rand(2) == 0) description += "floor-length, ";
			else description += "floor-dragging, ";
		}
		//
		// COLORS
		//
		description += i_creature.hairColor + " ";
		//
		// HAIR WORDS
		//
		//If furry and longish hair sometimes call it a mane (50%)
		if (i_creature.skinType == 1 && i_creature.hairLength > 3 && rand(2) == 0) {
			if (i_creature.hairType == HairType.FEATHER) description += "feather-";
			else if (i_creature.hairType == HairType.GHOST) description += "transparent ";
			else if (i_creature.hairType == HairType.GOO) description += "goo-";
			else if (i_creature.hairType == HairType.ANEMONE) description += "tentacle-";
			else if (i_creature.hairType == HairType.QUILL) description += "quill-";
			description += "mane";
			return description;
		}
		//if medium length refer to as locks sometimes
		//CUT - locks is plural and screws up tense.
		/*if (creature.hairLength >= 3 && creature.hairLength < 16 && rand(2) == 0) {
		 descript += "locks of hair";
		 return descript;
		 }*/
		//If nothing else used, use hair!
		if (i_creature.hairType == HairType.FEATHER) description += "feather-";
		else if (i_creature.hairType == HairType.GHOST) description += "transparent ";
		else if (i_creature.hairType == HairType.GOO) description += "goo-";
		else if (i_creature.hairType == HairType.ANEMONE) description += "tentacle-";
		else if (i_creature.hairType == HairType.QUILL) description += "quill-";
		description += "hair";

		return description;
	}

	export function beardDescription(i_creature: Creature): string {
		let description = "";
		let options;
		//
		// LENGTH ADJECTIVE!
		//
		if (i_creature.beardLength == 0) {
			options     = ["shaved",
				"bald",
				"smooth",
				"hairless",
				"glabrous"];
			description = randomChoice(options) + " chin and cheeks";
			return description;
		}
		if (i_creature.beardLength < 0.2) {
			options = ["close-cropped, ",
				"trim, ",
				"very short, "];
			description += randomChoice(options);
		}
		if (i_creature.beardLength >= 0.2 && i_creature.beardLength < 0.5) description += "short, ";
		if (i_creature.beardLength >= 0.5 && i_creature.beardLength < 1.5) description += "medium, ";
		if (i_creature.beardLength >= 1.5 && i_creature.beardLength < 3) description += "moderately long, ";
		if (i_creature.beardLength >= 3 && i_creature.beardLength < 6) {
			if (rand(2) == 0) description += "long, ";
			else description += "neck-length, ";
		}
		if (i_creature.beardLength >= 6) {
			if (rand(2) == 0) description += "very long, ";
			description += "chest-length, ";
		}
		//
		// COLORS
		//
		description += i_creature.hairColor + " ";
		//
		// BEARD WORDS
		// Follows hair type.
		if (i_creature.hairType == 1) description += "";
		else if (i_creature.hairType == 2) description += "transparent ";
		else if (i_creature.hairType == 3) description += "gooey ";
		else if (i_creature.hairType == 4) description += "tentacley ";

		if (i_creature.beardStyle == 0) description += "beard"
		else if (i_creature.beardStyle == 1) description += "goatee"
		else if (i_creature.beardStyle == 2) description += "clean-cut beard"
		else if (i_creature.beardStyle == 3) description += "mountain-man beard"

		return description;
	}

	/**
	 * Describe tongue. Monsters don't have tongues, apparently.
	 * @param    i_character Either Player or NonPlayer
	 * @return    A beautiful description of a tongue.
	 */
	export function tongueDescription(i_character: Creature): string {
		if (i_character.tongueType == 1) return "serpentine tongue";
		else if (i_character.tongueType == 2) return "demonic tongue";
		else if (i_character.tongueType == 3) return "draconic tongue";
		else return "tongue";
	}

	export function breastDescript(size: number, lactation: number=0): string {
		//Main function
		if (size < 1) return "flat breasts";
		let descript = (rand(2) == 0 ? breastSize(size) : ""); //Add a description of the breast size 50% of the time
		switch (rand(10)) {
			case 1:
				if (lactation > 2) return descript + "milk-udders";
				break;
			case 2:
				if (lactation > 1.5) descript += "milky ";
				if (size > 4) return descript + "tits";
				break;
			case 4:
			case 5:
			case 6:
				return descript + "tits";
			case 7:
				if (lactation >= 2.5) return descript + "udders";
				if (lactation >= 1) descript += "milk ";
				return descript + "jugs";
			case 8:
				if (size > 6) return descript + "love-pillows";
				return descript + "boobs";
			case 9:
				if (size > 6) return descript + "tits";
				break;
			default:
				break;
		}
		return descript + "breasts";
	}

	export function nippleDescription(i_creature: Creature, i_rowNum: number): string {
		//DEBUG SHIT!
		if (i_rowNum > (i_creature.breastRows.length - 1)) {
			console.error("<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>");
			return "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>";
		}
		if (i_rowNum < 0) {
			console.error("<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>");
			return "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>";
		}
		let haveDescription = false;
		let description     = "";
		let options;
		let rando           = 0;
		//Size descriptors 33% chance
		let row             = i_creature.breastRows[i_rowNum];
		let nippleLength    = row.nippleLength;
		if (rand(4) == 0) {
			//TINAHHHH
			if (nippleLength < .25) {
				options = ["tiny ",
					"itty-bitty ",
					"teeny-tiny ",
					"dainty "];
				description += randomChoice(options);
			}
			//Prominant
			if (nippleLength >= .4 && nippleLength < 1) {
				options = ["prominent ",
					"pencil eraser-sized ",
					"eye-catching ",
					"pronounced ",
					"striking "];
				description += randomChoice(options);
			}
			//Big 'uns
			if (nippleLength >= 1 && nippleLength < 2) {
				options = ["forwards-jutting ",
					"over-sized ",
					"fleshy ",
					"large protruding "];
				description += randomChoice(options);
			}
			//'Uge
			if (nippleLength >= 2 && nippleLength < 3.2) {
				options = ["elongated ",
					"massive ",
					"awkward ",
					"lavish ",
					"hefty "];
				description += randomChoice(options);
			}
			//Massive
			if (nippleLength >= 3.2) {
				options = ["bulky ",
					"ponderous ",
					"thumb-sized ",
					"cock-sized ",
					"cow-like "];
				description += randomChoice(options);
			}
			haveDescription = true;
		}
		//Milkiness/Arousal/Wetness Descriptors 33% of the time
		if (rand(3) == 0 && !haveDescription) {
			//Fuckable chance first!
			if (i_creature.hasFuckableNipples()) {
				//Fuckable and lactating?
				if (i_creature.biggestLactation() > 1) {
					options = ["milk-lubricated ",
						"lactating ",
						"lactating ",
						"milk-slicked ",
						"milky "];
					description += randomChoice(options);
				}
				//Just fuckable
				else {
					options = ["wet ",
						"mutated ",
						"slimy ",
						"damp ",
						"moist ",
						"slippery ",
						"oozing ",
						"sloppy ",
						"dewy "];
					description += randomChoice(options);
				}
				haveDescription = true;
			}
			//Just lactating!
			else if (i_creature.biggestLactation() > 0) {
				//Light lactation
				if (i_creature.biggestLactation() <= 1) {
					options = ["milk moistened ",
						"slightly lactating ",
						"milk-dampened "];
					description += randomChoice(options);
				}
				//Moderate lactation
				if (i_creature.biggestLactation() > 1 && i_creature.biggestLactation() <= 2) {
					options = ["lactating ",
						"milky ",
						"milk-seeping "];
					description += randomChoice(options);
				}
				//Heavy lactation
				if (i_creature.biggestLactation() > 2) {
					options = ["dripping ",
						"dribbling ",
						"milk-leaking ",
						"drooling "];
					description += randomChoice(options);
				}
				haveDescription = true;
			}
		}
		//Possible arousal descriptors
		else if (rand(3) == 0 && !haveDescription) {
			if (i_creature.lust > 50 && i_creature.lust < 75) {
				options         = ["erect ",
					"perky ",
					"erect ",
					"firm ",
					"tender "];
				description += randomChoice(options);
				haveDescription = true;
			}
			if (i_creature.lust >= 75) {
				options         = ["throbbing ",
					"trembling ",
					"needy ",
					"throbbing "];
				description += randomChoice(options);
				haveDescription = true;
			}
		}
		if (!haveDescription && rand(2) == 0 && i_creature.nipplesPierced > 0 && i_rowNum == 0) {
			if (i_creature.nipplesPierced == 5) description += "chained ";
			else description += "isPierced ";
			haveDescription = true;
		}
		if (!haveDescription && i_creature.skinType == 3) {
			options = ["slime-slick ",
				"goopy ",
				"slippery "];
			description += randomChoice(options);
		}
		if (!haveDescription && i_creature.findStatusEffect(StatusEffects.BlackNipples) >= 0) {
			options = ["black ",
				"ebony ",
				"sable "];
			description += randomChoice(options);
		}

		//Nounsssssssss*BOOM*
		let choice = 0;
		choice     = rand(5);
		if (choice == 0) description += "nipple";
		if (choice == 1) {
			if (nippleLength < .5) description += "perky nipple";
			else description += "cherry-like nub";
		}
		if (choice == 2) {
			if (i_creature.hasFuckableNipples()) description += "fuckable nip";
			else {
				if (i_creature.biggestLactation() >= 1 && nippleLength >= 1) description += "teat";
				else description += "nipple";
			}
		}
		if (choice == 3) {
			if (i_creature.hasFuckableNipples()) description += "nipple-hole";
			else {
				if (i_creature.biggestLactation() >= 1 && nippleLength >= 1) description += "teat";
				else description += "nipple";
			}
		}
		if (choice == 4) {
			if (i_creature.hasFuckableNipples()) description += "nipple-cunt";
			else description += "nipple";
		}
		return description;
	}

	export function hipDescription(i_character: Creature) {
		let description = "";
		let options;
		if (i_character.hipRating <= 1) {
			options     = ["tiny ",
				"narrow ",
				"boyish "];
			description = randomChoice(options);
		}
		else if (i_character.hipRating > 1 && i_character.hipRating < 4) {
			options     = ["slender ",
				"narrow ",
				"thin "];
			description = randomChoice(options);
			if (i_character.thickness < 30) {
				if (rand(2) == 0) description = "slightly-flared ";
				else description = "curved ";
			}
		}
		else if (i_character.hipRating >= 4 && i_character.hipRating < 6) {
			options     = ["well-formed ",
				"pleasant "];
			description = randomChoice(options);
			if (i_character.thickness < 30) {
				if (rand(2) == 0) description = "flared ";
				else description = "curvy ";
			}
		}
		else if (i_character.hipRating >= 6 && i_character.hipRating < 10) {
			options     = ["ample ",
				"noticeable ",
				"girly "];
			description = randomChoice(options);
			if (i_character.thickness < 30) {
				if (rand(2) == 0) description = "flared ";
				else description = "waspish ";
			}
		}
		else if (i_character.hipRating >= 10 && i_character.hipRating < 15) {
			options     = ["flared ",
				"curvy ",
				"wide "];
			description = randomChoice(options);
			if (i_character.thickness < 30) {
				if (rand(2) == 0) description = "flared ";
				else description = "waspish ";
			}
		}
		else if (i_character.hipRating >= 15 && i_character.hipRating < 20) {
			if (i_character.thickness < 40) {
				if (rand(2) == 0) description = "flared, ";
				else description = "waspish, ";
			}
			options = ["fertile ",
				"child-bearing ",
				"voluptuous "];
			description += randomChoice(options);
		}
		else if (i_character.hipRating >= 20) {
			if (i_character.thickness < 40) {
				if (rand(2) == 0) description = "flaring, ";
				else description = "incredibly waspish, ";
			}
			options = ["broodmother-sized ",
				"cow-like ",
				"inhumanly-wide "];
			description += randomChoice(options);
		}
		//Taurs
		if (i_character.isTaur() && rand(3) == 0) description += "flanks";
		//Nagas have sides, right?
		else if (i_character.isNaga() && rand(3) == 0) description += "sides";
		//Non taurs or taurs who didn't roll flanks
		else {
			options = ["hips",
				"thighs"];
			description += randomChoice(options);
		}

		return description;
	}

	export function cockDescript(creature: Creature, cockIndex: number = 0): string {
		//Main function
		if (creature.cocks.length == 0) return "<b>ERROR: CockDescript Called But No Cock Present</b>";
		let cockType = CockTypesEnum.HUMAN;
		if (cockIndex != 99) { //CockIndex 99 forces a human cock description
			if (creature.cocks.length <= cockIndex) return "<b>ERROR: CockDescript called with index of " + cockIndex + " - out of BOUNDS</b>";
			cockType = creature.cocks[cockIndex].cockType;
		}
		let isPierced = (creature.cocks.length == 1) && (creature.cocks[cockIndex].isPierced); //Only describe as isPierced or sock covered if the creature has just one cock
		let hasSock   = (creature.cocks.length == 1) && (creature.cocks[cockIndex].sock != "");
		let isGooey   = (creature.skinType == SkinType.GOO);
		return cockDescription(cockType, creature.cocks[cockIndex].cockLength, creature.cocks[cockIndex].cockThickness, creature.lust, creature.cumQ(), isPierced, hasSock, isGooey);
	}

//This takes all the variables independently so that a creature object is not required for a cockDescription.
//This allows a single cockDescription to produce output for both cockDescript and the old NPCCockDescript.
	export function cockDescription(cockType: CockTypesEnum,
									length: number,
									girth: number,
									lust: number       = 50,
									cumQ: number       = 10,
									isPierced: boolean = false,
									hasSock: boolean   = false,
									isGooey: boolean   = false): string {
		//Now do these!
		if (rand(2) == 0) {
			if (cockType == CockTypesEnum.HUMAN)
				return cockAdjective(cockType, length, girth, lust, cumQ, isPierced, hasSock, isGooey) + " " + cockNoun(cockType);
			else
				return cockAdjective(cockType, length, girth, lust, cumQ, isPierced, hasSock, isGooey) + ", " + cockNoun(cockType);
		}
		return cockNoun(cockType);
	}

	export function cockNoun(cockType: CockTypesEnum): string {
		/*
		 if (cockType is int) {
		 trace("Someone is still calling cockNoun with an integer cock type");
		 trace("Fix this shit already, dammit!")
		 cockType = CockTypesEnum.ParseConstantByIndex(cockType);
		 }
		 */
		if (cockType == CockTypesEnum.HUMAN) {
			// Yeah, this is kind of messy
			// there is no other easy way to preserve the weighting fenoxo did
			return randomChoice("cock",
				"cock",
				"cock",
				"cock",
				"cock",
				"prick",
				"prick",
				"pecker",
				"shaft",
				"shaft",
				"shaft");
		}
		else if (cockType == CockTypesEnum.BEE) {
			return randomChoice("bee prick",
				"bee prick",
				"bee prick",
				"bee prick",
				"insectoid cock",
				"insectoid cock",
				"furred monster");
		}
		else if (cockType == CockTypesEnum.DOG) {
			return randomChoice("dog-shaped dong",
				"canine shaft",
				"pointed prick",
				"knotty dog-shaft",
				"bestial cock",
				"animalistic puppy-pecker",
				"pointed dog-dick",
				"pointed shaft",
				"canine member",
				"canine cock",
				"knotted dog-cock");
		}
		else if (cockType == CockTypesEnum.FOX) {
			return randomChoice("fox-shaped dong",
				"vulpine shaft",
				"pointed prick",
				"knotty fox-shaft",
				"bestial cock",
				"animalistic vixen-pricker",
				"pointed fox-dick",
				"pointed shaft",
				"vulpine member",
				"vulpine cock",
				"knotted fox-cock");
		}
		else if (cockType == CockTypesEnum.HORSE) {
			return randomChoice("flared horse-cock",
				"equine prick",
				"bestial horse-shaft",
				"flat-tipped horse-member",
				"animalistic stallion-prick",
				"equine dong",
				"beast cock",
				"flared stallion-cock");
		}
		else if (cockType == CockTypesEnum.DEMON) {
			return randomChoice("nub-covered demon-dick",
				"nubby shaft",
				"corrupted cock",
				"perverse pecker",
				"bumpy demon-dick",
				"demonic cock",
				"demonic dong",
				"cursed cock",
				"infernal prick",
				"unholy cock",
				"blighted cock");
		}
		else if (cockType == CockTypesEnum.TENTACLE) {
			return randomChoice("twisting tentacle-prick",
				"wriggling plant-shaft",
				"sinuous tentacle-cock",
				"squirming cock-tendril",
				"writhing tentacle-pecker",
				"wriggling plant-prick",
				"penile flora",
				"smooth shaft",
				"undulating tentacle-dick",
				"slithering vine-prick",
				"vine-shaped cock");
		}
		else if (cockType == CockTypesEnum.CAT) {
			return randomChoice("feline dick",
				"spined cat-cock",
				"pink kitty-cock",
				"spiny prick",
				"animalistic kitty-prick",
				"oddly-textured cat-penis",
				"feline member",
				"spined shaft",
				"feline shaft",
				"barbed dick",
				"nubby kitten-prick");
		}
		else if (cockType == CockTypesEnum.LIZARD) {
			return randomChoice("reptilian dick",
				"purple cock",
				"inhuman cock",
				"reptilian prick",
				"purple prick",
				"purple member",
				"serpentine member",
				"serpentine shaft",
				"reptilian shaft",
				"bulbous snake-shaft",
				"bulging snake-dick");
		}
		else if (cockType == CockTypesEnum.ANEMONE) {
			return randomChoice("anemone dick",
				"tentacle-ringed cock",
				"blue member",
				"stinger-laden shaft",
				"pulsating prick",
				"anemone prick",
				"stinger-coated member",
				"blue cock",
				"tentacle-ringed dick",
				"near-transparent shaft",
				"squirming shaft");
		}
		else if (cockType == CockTypesEnum.KANGAROO) {
			return randomChoice("kangaroo-like dick",
				"pointed cock",
				"marsupial member",
				"tapered shaft",
				"curved pecker",
				"pointed prick",
				"squirming kangaroo-cock",
				"marsupial cock",
				"tapered kangaroo-dick",
				"curved kangaroo-cock",
				"squirming shaft");
		}
		else if (cockType == CockTypesEnum.DRAGON) {
			return randomChoice("dragon-like dick",
				"segmented shaft",
				"pointed prick",
				"knotted dragon-cock",
				"mythical mast",
				"segmented tool",
				"draconic dick",
				"draconic cock",
				"tapered dick",
				"unusual endowment",
				"scaly shaft");
		}
		else if (cockType == CockTypesEnum.DISPLACER) {
			return randomChoice("coerl cock",
				"tentacle-tipped phallus",
				"starfish-tipped shaft",
				"alien member",
				"almost-canine dick",
				"bizarre prick",
				"beastly cock",
				"cthulhu-tier cock",
				"coerl cock",
				"animal dong",
				"star-capped tool",
				"knotted erection");
		}
		else if (cockType == CockTypesEnum.AVIAN) {
			return randomChoice("bird cock",
				"bird dick",
				"bird pecker",
				"avian cock",
				"avian dick",
				"avian penis",
				"avian prick",
				"avian pecker",
				"tapered cock",
				"tapered prick");
		}
		else if (cockType == CockTypesEnum.PIG) {
			return randomChoice("pig cock",
				"pig dick",
				"pig penis",
				"pig-like cock",
				"pig-like dick",
				"swine cock",
				"swine penis",
				"corkscrew-tipped cock",
				"hoggish cock",
				"pink pig-cock",
				"pink pecker");
		}
		else if (cockType == CockTypesEnum.RHINO) {
			return randomChoice("oblong cock",
				"oblong dick",
				"oblong prick",
				"rhino cock",
				"rhino dick",
				"rhino penis",
				"rhino pecker",
				"rhino prick",
				"bulged rhino cock",
				"bulged rhino dick");
		}
		else if (cockType == CockTypesEnum.ECHIDNA) {
			return randomChoice("strange echidna dick",
				"strange echidna cock",
				"echidna dick",
				"echidna penis",
				"echidna cock",
				"exotic endowment",
				"four-headed prick",
				"four-headed penis",
				"four-headed cock",
				"four-headed dick");
		}
		return randomChoice("cock",
			"prick",
			"pecker",
			"shaft");
	}

//New cock adjectives.  The old one sucked dicks
//This handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
	export function cockAdjective(cockType: CockTypesEnum,
								  length: number,
								  girth: number,
								  lust: number       = 50,
								  cumQ: number       = 10,
								  isPierced: boolean = false,
								  hasSock: boolean   = false,
								  isGooey: boolean   = false): string {
		//First, the three possible special cases
		if (isPierced && rand(5) == 0) return "isPierced";
		if (hasSock && rand(5) == 0) return randomChoice("sock-sheathed", "garment-wrapped", "smartly dressed", "cloth-shrouded", "fabric swaddled", "covered");
		if (isGooey && rand(4) == 0) return randomChoice("goopey", "gooey", "slimy");
		//Length 1/3 chance
		if (rand(3) == 0) {
			if (length < 3) return randomChoice("little", "toy-sized", "mini", "budding", "tiny");
			if (length < 5) return randomChoice("short", "small");
			if (length < 7) return randomChoice("fair-sized", "nice");
			if (length < 9) {
				if (cockType == CockTypesEnum.HORSE) return randomChoice("sizable", "pony-sized", "colt-like");
				return randomChoice("sizable", "long", "lengthy");
			}
			if (length < 13) {
				if (cockType == CockTypesEnum.DOG) return randomChoice("huge", "foot-long", "mastiff-like");
				return randomChoice("huge", "foot-long", "cucumber-length");
			}
			if (length < 18) return randomChoice("massive", "knee-length", "forearm-length");
			if (length < 30) return randomChoice("enormous", "giant", "arm-like");
			if (cockType == CockTypesEnum.TENTACLE && rand(2) == 0) return "coiled";
			return randomChoice("towering", "freakish", "monstrous", "massive")
		}
		//Hornyness 1/2
		else if (lust > 75 && rand(2) == 0) {
			if (lust > 90) { //Uber horny like a baws!
				if (cumQ < 50) return randomChoice("throbbing", "pulsating"); //Weak as shit cum
				if (cumQ < 200) return randomChoice("dribbling", "leaking", "drooling"); //lots of cum? drippy.
				return randomChoice("very drippy", "pre-gushing", "cum-bubbling", "pre-slicked", "pre-drooling"); //Tons of cum
			}
			else {//A little less lusty, but still lusty.
				if (cumQ < 50) return randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager"); //Weak as shit cum
				if (cumQ < 200) return randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager", "fluid-beading", "slowly-oozing"); //A little drippy
				return randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); //uber drippy
			}
		}
		//Girth - fallback
		if (girth <= 0.75) return randomChoice("thin", "slender", "narrow");
		if (girth <= 1.2) return "ample";
		if (girth <= 1.4) return randomChoice("ample", "big");
		if (girth <= 2) return randomChoice("broad", "meaty", "girthy");
		if (girth <= 3.5) return randomChoice("fat", "distended", "wide");
		return randomChoice("inhumanly distended", "monstrously thick", "bloated");
	}

//Cock adjectives for single cock
	export function cockAdjectives(i_cockLength: number,
								   i_cockThickness: number,
								   i_cockType: CockTypesEnum,
								   i_creature: Creature): string {
		let description = "";
		let rando       = 0;
		let descripts   = 0;
		//length or thickness, usually length.
		if (rand(4) == 0) {
			if (i_cockLength < 3) {
				rando = rand(3);
				if (rando == 0) description = "little";
				else if (rando == 1) description = "toy-sized";
				else description = "tiny";
			}
			else if (i_cockLength < 5) {
				if (rand(2) == 0) description = "short";
				else description = "small";
			}
			else if (i_cockLength < 7) {
				if (rand(2) == 0) description = "fair-sized";
				else description = "nice";
			}
			else if (i_cockLength < 9) {
				rando = rand(3);
				if (rando == 0) description = "long";
				else if (rando == 1) description = "lengthy";
				else if (rando == 2) description = "sizable";
			}
			else if (i_cockLength < 13) {
				if (rand(2) == 0) description = "huge";
				else description = "foot-long";
			}
			else if (i_cockLength < 18) {
				if (rand(2) == 0) description = "massive";
				else description = "forearm-length";
			}
			else if (i_cockLength < 30) {
				if (rand(2) == 0) description = "enormous";
				else description = "monster-length";
			}
			else {
				rando = rand(3);
				if (rando == 0) description = "towering";
				else if (rando == 1) description = "freakish";
				else description = "massive";
			}
			descripts = 1;
		}
		//thickness go!
		else if (rand(4) == 0 && descripts == 0) {
			if (i_cockThickness <= .75) description += "narrow";
			else if (i_cockThickness <= 1.1) description += "nice";
			else if (i_cockThickness <= 1.4) {
				if (rand(2) == 0) description += "ample";
				else description += "big";
			}
			else if (i_cockThickness <= 2) {
				if (rand(2) == 0) description += "broad";
				else description += "girthy";
			}
			else if (i_cockThickness <= 3.5) {
				if (rand(2) == 0) description += "fat";
				else description += "distended";
			}
			else {
				if (rand(2) == 0) description += "inhumanly distended";
				else description += "monstrously thick";
			}
			descripts = 1;
		}
		//Length/Thickness done.  Moving on to special animal characters/lust stuff.
		/*Animal Fillers - turned off due to duplication in noun segment
		 else if (type == 1 && descripts == 0 && rand(2) == 0) {
		 if (rand(2) == 0) descript += "flared ";
		 else descript += "musky ";
		 }
		 else if (type == 2 && descripts == 0 && rand(2) == 0) {
		 descript += "musky ";
		 }*/
		//FINAL FALLBACKS - lust descriptors
		//Lust stuff
		else if (i_creature.lust > 90) {
			//lots of cum? drippy.
			if (i_creature.cumQ() > 50 && i_creature.cumQ() < 200 && rand(2) == 0) {
				//for hroses and dogs
				if (CockGroupMammal.indexOf(i_cockType)>=0) description += "animal-pre leaking";
				else description += "pre-slickened";
				descripts = 1;
			}
			//Tons of cum
			if (i_creature.cumQ() >= 200 && rand(2) == 0) {
				//for horses and dogs
				if (CockGroupMammal.indexOf(i_cockType)>=0) description += "animal-spunk dripping";
				else description += "cum-drooling";
				descripts = 1;
			}
			//Not descripted? Pulsing and twitching
			if (descripts == 0) {
				if (rand(2) == 0) description += "throbbing";
				else description += "pulsating";
				descripts = 1;
			}
		}
		//A little less lusty, but still lusty.
		else if (i_creature.lust > 75) {
			if (descripts == 0 && i_creature.cumQ() > 50 && i_creature.cumQ() < 200 && rand(2) == 0) {
				description += "pre-leaking";
				descripts = 1;
			}
			if (descripts == 0 && i_creature.cumQ() >= 200 && rand(2) == 0) {
				description += "pre-cum dripping";
				descripts = 1;
			}
			if (descripts == 0) {
				if (rand(2) == 0) description += "rock-hard";
				else description += "eager";
				descripts = 1;
			}
		}
		//Not lusty at all, fallback adjective
		else if (i_creature.lust > 50) description += "hard";
		else description += "ready";
		return description;
	}

	export function cockMultiNoun(cockType: CockTypesEnum): string {
		/*
		 if (cockType is int) {
		 trace("Someone is still calling cockNoun with an integer cock type");
		 trace("Fix this shit already, dammit!");
		 cockType = CockTypesEnum.ParseConstantByIndex(cockType);
		 }
		 */
		let options;
		let description = "";
		if (cockType == CockTypesEnum.HUMAN) {
			options = ["cock",
				"cock",
				"cock",
				"cock",
				"cock",
				"prick",
				"prick",
				"pecker",
				"shaft",
				"shaft",
				"shaft"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.BEE) {
			options = ["bee prick",
				"bee prick",
				"bee prick",
				"bee prick",
				"insectoid cock",
				"insectoid cock",
				"furred monster"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.DOG) {
			options = ["doggie dong",
				"canine shaft",
				"pointed prick",
				"dog-shaft",
				"dog-cock",
				"puppy-pecker",
				"dog-dick",
				"pointed shaft",
				"canine cock",
				"canine cock",
				"dog cock"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.HORSE) {
			options = ["horsecock",
				"equine prick",
				"horse-shaft",
				"horse-prick",
				"stallion-prick",
				"equine dong"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.DEMON) {
			options = ["demon-dick",
				"nubby shaft",
				"corrupted cock",
				"perverse pecker",
				"bumpy demon-dick",
				"demonic cock",
				"demonic dong",
				"cursed cock",
				"infernal prick",
				"unholy cock",
				"blighted cock"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.TENTACLE) {
			options = ["tentacle prick",
				"plant-like shaft",
				"tentacle cock",
				"cock-tendril",
				"tentacle pecker",
				"plant prick",
				"penile flora",
				"smooth inhuman shaft",
				"tentacle dick",
				"vine prick",
				"vine-like cock"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.CAT) {
			options = ["feline dick",
				"cat-cock",
				"kitty-cock",
				"spiny prick",
				"pussy-prick",
				"cat-penis",
				"feline member",
				"spined shaft",
				"feline shaft",
				"'barbed' dick",
				"kitten-prick"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.LIZARD) {
			options = ["reptile-dick",
				"purple cock",
				"inhuman cock",
				"reptilian prick",
				"purple prick",
				"purple member",
				"serpentine member",
				"serpentine shaft",
				"reptilian shaft",
				"snake-shaft",
				"snake dick"];
			description += randomChoice(options);
		}
		else if (cockType == CockTypesEnum.RHINO) {
			options = ["oblong cock",
				"rhino dick",
				"rhino cock",
				"bulged rhino cock",
				"rhino penis",
				"rhink dong",
				"oblong penis",
				"oblong dong",
				"oblong dick"];
			description += randomChoice(options);
		}
		else {
			description += randomChoice("cock", "prick", "pecker", "shaft");
		}
		return description;
	}

	/**
	 * Describe creatures balls.
	 * @param    i_forcedSize    Force a description of the size of the balls
	 * @param    i_plural        Show plural forms
	 * @param    i_creature        Monster, Player or NonPlayer
	 * @param    i_withArticle    Show description with article in front
	 * @return    Full description of balls
	 */
	export function ballsDescription(i_forcedSize: boolean,
									 i_plural: boolean,
									 i_creature: Creature,
									 i_withArticle: boolean = false) {
		//Main function
		if (i_creature.balls == 0) return "prostate";

		let haveDescription = false;
		let rando           = 0;
		let description     = "";
		let options;

		if (i_plural && (i_creature.findStatusEffect(StatusEffects.Uniball) < 0)) {
			if (i_creature.balls == 1) {
				if (i_withArticle) {
					options = ["a single",
						"a solitary",
						"a lone",
						"an individual"];
				}
				else {
					options = ["single",
						"solitary",
						"lone",
						"individual"];
				}
				description += randomChoice(options);
			}
			else if (i_creature.balls == 2) {
				if (i_withArticle) {
					options = ["a pair of",
						"two",
						"a duo of"];
				}
				else {
					options = ["pair of",
						"two",
						"duo of"];
				}
				description += randomChoice(options);
			}
			else if (i_creature.balls == 3) {
				options = ["three",
					"triple"];
				(i_withArticle) ? options.push("a trio of") : options.push("trio of");
				description += randomChoice(options);
			}
			else if (i_creature.balls == 4) {
				options = ["four",
					"quadruple"];
				(i_withArticle) ? options.push("a quartette of") : options.push("quartette of");
				description += randomChoice(options);
			}
			else {
				if (i_withArticle) {
					options = ["a multitude of",
						"many",
						"a large handful of"];
				}
				else {
					options = ["multitude of",
						"many",
						"large handful of"];
				}
				description += randomChoice(options);
			}
		}
		//size!
		if (i_creature.ballSize > 1 && (rand(3) <= 1 || i_forcedSize)) {
			if (description) description += " ";

			if (i_creature.ballSize >= 18)
				description += "hideously swollen and oversized";
			else if (i_creature.ballSize >= 15)
				description += "beachball-sized";
			else if (i_creature.ballSize >= 12)
				description += "watermelon-sized";
			else if (i_creature.ballSize >= 9)
				description += "basketball-sized";
			else if (i_creature.ballSize >= 7)
				description += "soccerball-sized";
			else if (i_creature.ballSize >= 5)
				description += "cantaloupe-sized";
			else if (i_creature.ballSize >= 4)
				description += "grapefruit-sized";
			else if (i_creature.ballSize >= 3)
				description += "apple-sized";
			else if (i_creature.ballSize >= 2)
				description += "baseball-sized";
			else if (i_creature.ballSize > 1)
				description += "large";

		}
		//UNIBALL
		if (i_creature.findStatusEffect(StatusEffects.Uniball) >= 0) {
			if (description) description += " ";
			options = ["tightly-compressed",
				"snug",
				"cute",
				"pleasantly squeezed",
				"compressed-together"];
			description += randomChoice(options);

		}
		//Descriptive
		if (i_creature.hoursSinceCum >= 48 && rand(2) == 0 && !i_forcedSize) {
			if (description) description += " ";
			options = ["overflowing",
				"swollen",
				"cum-engorged"];
			description += randomChoice(options);

		}
		//lusty
		if (i_creature.lust > 90 && (description == "") && rand(2) == 0 && !i_forcedSize) {
			options = ["eager",
				"full",
				"needy",
				"desperate",
				"throbbing",
				"heated",
				"trembling",
				"quivering",
				"quaking"];
			description += randomChoice(options);

		}
		//Slimy skin
		if (i_creature.skinType == 3) {
			if (description) description += " ";
			options = ["goopey",
				"gooey",
				"slimy"];
			description += randomChoice(options);

		}
		if (description) description += " ";

		options = ["nut",
			"gonad",
			"teste",
			"testicle",
			"testicle",
			"ball",
			"ball",
			"ball"];

		// I don't know how this was ever supposed to work.
		//if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

		description += randomChoice(options);
		if (i_plural) description += "s";

		if (i_creature.findStatusEffect(StatusEffects.Uniball) >= 0 && rand(2) == 0) {
			if (rand(3) == 0)
				description += " merged into a cute, spherical package";
			else if (rand(2) == 0)
				description += " combined into a round, girlish shape";
			else
				description += " squeezed together into a perky, rounded form";
		}
		return description;
	}

//Returns random description of scrotum
	export function sackDescript(i_creature: Creature) {
		if (i_creature.balls == 0) return "prostate";

		let options;
		let description = "";

		options = ["scrotum",
			"sack",
			"nutsack",
			"ballsack",
			"beanbag",
			"pouch"];

		description += randomChoice(options);

		return description;
	}

	export function vaginaDescript(i_creature: Creature,
								   i_vaginaIndex: number = 0,
								   forceDesc: boolean    = false): string {
		//Defaulting
		if (i_vaginaIndex == undefined) i_vaginaIndex = 0;
		if (forceDesc == undefined) forceDesc = false;
		//Main function
		if (i_vaginaIndex > (i_creature.vaginas.length - 1)) {
			//CoC_Settings.error("<B>Error: Invalid vagina number (" + i_vaginaIndex + ") passed to vaginaDescript()</b>");
			return "<B>Error: Invalid vagina number (" + i_vaginaIndex + ") passed to vaginaDescript()</b>";
		}
		if (i_vaginaIndex < 0) {
			//CoC_Settings.error("<B>Error: Invalid vaginaNum (" + i_vaginaIndex + ") passed to vaginaDescript()</b>");
			return "<B>Error: Invalid vaginaNum (" + i_vaginaIndex + ") passed to vaginaDescript()</b>";
		}
		if (i_creature.vaginas.length <= 0) {
			//CoC_Settings.error("ERROR: Called vaginaDescription with no vaginas");
			return "ERROR: Called vaginaDescription with no vaginas";
		}

		let description     = "";
		let weighting       = 0;
		let haveDescription = false;
		let options;

		//Very confusing way to display values.
		if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) weighting = 61;
		if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4 || i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5) weighting = 10;

		//tightness descript - 40% display rate
		if (forceDesc || rand(100) + weighting > 60) {
			if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) {
				if (i_creature.vaginas[i_vaginaIndex].virgin) description += "virgin";
				else description += "tight";
			}
			if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 2)
				description += "loose";
			if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 3)
				description += "very loose";
			if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4)
				description += "gaping";
			if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5)
				description += "gaping-wide";

		}
		//wetness descript - 30% display rate
		if (forceDesc || rand(100) + weighting > 70) {
			if (description != "") description += ", ";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 0)
				description += "dry";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 1)
				description += "moist";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 2)
				description += "wet";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 3)
				description += "slick";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 4)
				description += "drooling";
			if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 5)
				description += "slavering";
		}
		if (i_creature.vaginas[i_vaginaIndex].labiaPierced > 0 && (forceDesc || rand(3) == 0)) {
			if (description != "") description += ", ";
			description += "isPierced";
		}
		if (description == "" && i_creature.skinType == 3) {
			if (rand(2) == 0) description += "gooey";
			else description += "slimy";
		}
		if (i_creature.vaginaType() == VaginaTypesEnum.BLACK_SAND_TRAP && (forceDesc || Math.floor(Math.random() * 2) == 0)) {
			if (description != "") description += ", ";
			options = ["black",
				"onyx",
				"ebony",
				"dusky",
				"sable",
				"obsidian",
				"midnight-hued",
				"jet black"];
			description += randomChoice(options);
		}

		if (description != "")
			description += " ";

		if (SFWMode) { //Removes something that might offend sensitive people.
			options = ["cooter",
				"entrance"];
		}
		else {
			options = ["vagina",
				"pussy",
				"cooter",
				"twat",
				"cunt",
				"snatch",
				"fuck-hole",
				"muff"];
		}
		description += randomChoice(options);
		//Something that would be nice to have but needs a variable in Creature or Character.
		//if (i_creature.bunnyScore() >= 3) description += "rabbit hole";

		return description;
	}

	export function clitDescription(i_creature: Creature): string {
		let description     = "";
		let options;
		let clitLength      = i_creature.vaginas[0].clitLength;
		let haveDescription = false;
		//Length Adjective - 50% chance
		if (rand(2) == 0) {
			//small clits!
			if (clitLength <= .5) {
				options = ["tiny ",
					"little ",
					"petite ",
					"diminutive ",
					"miniature "];
				description += randomChoice(options);
			}
			//"average".
			if (clitLength > .5 && clitLength < 1.5) {
				//no size comment
			}
			//Biggies!
			if (clitLength >= 1.5 && clitLength < 4) {
				options = ["large ",
					"large ",
					"substantial ",
					"substantial ",
					"considerable "];
				description += randomChoice(options);
			}
			//'Uge
			if (clitLength >= 4) {
				options = ["monster ",
					"tremendous ",
					"colossal ",
					"enormous ",
					"bulky "];
				description += randomChoice(options);
			}
		}
		//Descriptive descriptions - 50% chance of being called
		if (rand(2) == 0) {
			//Doggie descriptors - 50%
			//TODO Conditionals don't make sense, need to introduce a class variable to keep of "something" or move race or Creature/Character
			if (i_creature.skinType == 1 && !haveDescription && rand(2) == 0) {
				description += "bitch-";
				haveDescription = true;
			}
			/*Horse descriptors - 50%
			 if (creature.skinType == 1 > 2 && !descripted && rand(2) == 0) {
			 descripted = true;
			 descript += "mare-";
			 }*/
			//Horny descriptors - 75% chance
			if (i_creature.lust > 70 && rand(4) < 3 && !haveDescription) {
				options         = ["throbbing ",
					"pulsating ",
					"hard "];
				description += randomChoice(options);
				haveDescription = true;
			}
			//High libido - always use if no other descript
			if (i_creature.lib > 50 && rand(2) == 0 && !haveDescription) {
				options         = ["insatiable ",
					"greedy ",
					"demanding ",
					"rapacious"];
				description += randomChoice(options);
				haveDescription = true;
			}
		}
		if (i_creature.hasVagina()) {
			if (!haveDescription && i_creature.vaginas[0].clitPierced > 0) {
				description += "isPierced ";
				haveDescription = true;
			}
		}
		else {
			//CoC_Settings.error("ERROR: CLITDESCRIPT WITH NO CLIT");
			return ("ERROR: CLITDESCRIPT WITH NO CLIT");
		}

		//Clit nouns
		options = ["clit",
			"clitty",
			"button",
			"pleasure-buzzer",
			"clit",
			"clitty",
			"button",
			"clit",
			"clit",
			"button"];
		if (SFWMode) {
			options = ["bump", "button"];
		}
		description += randomChoice(options);

		return description;
	}

	/**
	 * Gives a full description of a Character's butt.
	 * Be aware that it only supports Characters, not all Creatures.
	 * @param    i_character
	 * @return    A full description of a Character's butt.
	 */
	export function buttDescription(i_character: Creature): string {
		let description = "";
		let options;
		if (i_character.buttRating <= 1) {
			if (i_character.tone >= 60)
				description += "incredibly tight, perky ";
			else {
				options     = ["tiny",
					"very small",
					"dainty"];
				description = randomChoice(options);
				//Soft PC's buns!
				if (i_character.tone <= 30 && rand(3) == 0) description += " yet soft";
				description += " ";
			}
		}
		if (i_character.buttRating > 1 && i_character.buttRating < 4) {
			if (i_character.tone >= 65) {
				options     = ["perky, muscular ",
					"tight, toned ",
					"compact, muscular ",
					"tight ",
					"muscular, toned "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["tight ",
					"firm ",
					"compact ",
					"petite "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["small, heart-shaped ",
					"soft, compact ",
					"soft, heart-shaped ",
					"small, cushy ",
					"small ",
					"petite ",
					"snug "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 4 && i_character.buttRating < 6) {
			//TOIGHT LIKE A TIGER
			if (i_character.tone >= 65) {
				options     = ["nicely muscled ",
					"nice, toned ",
					"muscly ",
					"nice toned ",
					"toned ",
					"fair "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["nice ",
					"fair "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["nice, cushiony ",
					"soft ",
					"nicely-rounded, heart-shaped ",
					"cushy ",
					"soft, squeezable "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 6 && i_character.buttRating < 8) {
			//TOIGHT LIKE A TIGER
			if (i_character.tone >= 65) {
				options     = ["full, toned ",
					"muscly handful of ",
					"shapely, toned ",
					"muscular, hand-filling ",
					"shapely, chiseled ",
					"full ",
					"chiseled "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["handful of ",
					"full ",
					"shapely ",
					"hand-filling "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				if (rand(8) == 0) return "supple, handful of ass";
				options     = ["somewhat jiggly ",
					"soft, hand-filling ",
					"cushiony, full ",
					"plush, shapely ",
					"full ",
					"soft, shapely ",
					"rounded, spongy "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 8 && i_character.buttRating < 10) {
			//TOIGHT LIKE A TIGER
			if (i_character.tone >= 65) {
				options     = ["large, muscular ",
					"substantial, toned ",
					"big-but-tight ",
					"squeezable, toned ",
					"large, brawny ",
					"big-but-fit ",
					"powerful, squeezable ",
					"large "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["squeezable ",
					"large ",
					"substantial "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["large, bouncy ",
					"soft, eye-catching ",
					"big, slappable ",
					"soft, pinchable ",
					"large, plush ",
					"squeezable ",
					"cushiony ",
					"plush ",
					"pleasantly plump "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 10 && i_character.buttRating < 13) {
			//TOIGHT LIKE A TIGER
			if (i_character.tone >= 65) {
				options     = ["thick, muscular ",
					"big, burly ",
					"heavy, powerful ",
					"spacious, muscular ",
					"toned, cloth-straining ",
					"thick ",
					"thick, strong "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["jiggling ",
					"spacious ",
					"heavy ",
					"cloth-straining "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["super-soft, jiggling ",
					"spacious, cushy ",
					"plush, cloth-straining ",
					"squeezable, over-sized ",
					"spacious ",
					"heavy, cushiony ",
					"slappable, thick ",
					"jiggling ",
					"spacious ",
					"soft, plump "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 13 && i_character.buttRating < 16) {
			//TOIGHT LIKE A TIGER
			if (i_character.tone >= 65) {
				options     = ["expansive, muscled ",
					"voluminous, rippling ",
					"generous, powerful ",
					"big, burly ",
					"well-built, voluminous ",
					"powerful ",
					"muscular ",
					"powerful, expansive "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["expansive ",
					"generous ",
					"voluminous ",
					"wide "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["pillow-like ",
					"generous, cushiony ",
					"wide, plush ",
					"soft, generous ",
					"expansive, squeezable ",
					"slappable ",
					"thickly-padded ",
					"wide, jiggling ",
					"wide ",
					"voluminous ",
					"soft, padded "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 16 && i_character.buttRating < 20) {
			if (i_character.tone >= 65) {
				options     = ["huge, toned ",
					"vast, muscular ",
					"vast, well-built ",
					"huge, muscular ",
					"strong, immense ",
					"muscle-bound "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				if (rand(5) == 0) return "jiggling expanse of ass";
				if (rand(5) == 0) return "copious ass-flesh";
				options     = ["huge ",
					"vast ",
					"giant "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["vast, cushiony ",
					"huge, plump ",
					"expansive, jiggling ",
					"huge, cushiony ",
					"huge, slappable ",
					"seam-bursting ",
					"plush, vast ",
					"giant, slappable ",
					"giant ",
					"huge ",
					"swollen, pillow-like "];
				description = randomChoice(options);
			}
		}
		if (i_character.buttRating >= 20) {
			if (i_character.tone >= 65) {
				if (rand(7) == 0) return "colossal, muscly ass";
				options     = ["ginormous, muscle-bound ",
					"colossal yet toned ",
					"strong, tremdously large ",
					"tremendous, muscled ",
					"ginormous, toned ",
					"colossal, well-defined "];
				description = randomChoice(options);
			}
			//Nondescript
			else if (i_character.tone >= 30) {
				options     = ["ginormous ",
					"colossal ",
					"tremendous ",
					"gigantic "];
				description = randomChoice(options);
			}
			//FLABBAH
			else {
				options     = ["ginormous, jiggly ",
					"plush, ginormous ",
					"seam-destroying ",
					"tremendous, rounded ",
					"bouncy, colossal ",
					"thong-devouring ",
					"tremendous, thickly padded ",
					"ginormous, slappable ",
					"gigantic, rippling ",
					"gigantic ",
					"ginormous ",
					"colossal ",
					"tremendous "];
				description = randomChoice(options);
			}
		}
		options = ["butt",
			"butt",
			"butt",
			"butt",
			"ass",
			"ass",
			"ass",
			"ass",
			"backside",
			"backside",
			"derriere",
			"rump",
			"bottom"];

		description += randomChoice(options);
		//if (rando == 2) desc += "cheeks";
		return description;
	}

	/**
	 * Gives a short description of a creature's butt.
	 * Different from buttDescription in that it supports all creatures, not just characters.
	 * Warning, very judgemental.
	 * @param  i_creature
	 * @return Short description of a butt.
	 */
	export function buttDescriptionShort(i_creature: Creature): string {
		let description = "";
		let options;
		if (i_creature.buttRating <= 1) {
			options     = ["insignificant ",
				"very small "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating > 1 && i_creature.buttRating < 4) {
			options     = ["tight ",
				"firm ",
				"compact "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 4 && i_creature.buttRating < 6) {
			options     = ["regular ",
				"unremarkable "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 6 && i_creature.buttRating < 8) {
			if (rand(3) == 0) return "handful of ass";
			options     = ["full ",
				"shapely "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 8 && i_creature.buttRating < 10) {
			options     = ["squeezable ",
				"large ",
				"substantial "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 10 && i_creature.buttRating < 13) {
			options     = ["jiggling ",
				"spacious ",
				"heavy "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 13 && i_creature.buttRating < 16) {
			if (rand(3) == 0) return "generous amount of ass";
			options     = ["expansive ",
				"voluminous "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 16 && i_creature.buttRating < 20) {
			if (rand(3) == 2) return "jiggling expanse of ass";
			options     = ["huge ",
				"vast "];
			description = randomChoice(options);
		}
		if (i_creature.buttRating >= 20) {
			options     = ["ginormous ",
				"colossal ",
				"tremendous "];
			description = randomChoice(options);
		}
		options = ["butt ",
			"ass "];
		description += randomChoice(options);
		if (rand(2) == 0) description += "cheeks";
		return description;
	}

	const ANAL_WETNESS_DESCRIPTORS   =
			  createMapFromPairs([
				  [ANAL_WETNESS_DRY, ""],
				  [ANAL_WETNESS_NORMAL, ""],
				  [ANAL_WETNESS_MOIST, "moist "],
				  [ANAL_WETNESS_SLIMY, "slimy "],
				  [ANAL_WETNESS_DROOLING, "drooling "],
				  [ANAL_WETNESS_SLIME_DROOLING, "slime-drooling "],
			  ]);
	const ANAL_TIGHTNESS_DESCRIPTORS =
			  createMapFromPairs([
				  [ANAL_LOOSENESS_VIRGIN, "virgin "],
				  [ANAL_LOOSENESS_TIGHT, "tight "],
				  [ANAL_LOOSENESS_NORMAL, "loose "],
				  [ANAL_LOOSENESS_LOOSE, "roomy "],
				  [ANAL_LOOSENESS_STRETCHED, "stretched "],
				  [ANAL_LOOSENESS_GAPING, "gaping "],
			  ]);

	export function assholeDescript(i_creature: Creature, forceDesc: boolean = false): string {
		//Main function
		let description = "";

		// 66% Wetness Descript
		if (forceDesc || rand(3) <= 1) {
			description += ANAL_WETNESS_DESCRIPTORS[i_creature.ass.analWetness];
		}
		//25% tightness description
		if (forceDesc || rand(4) == 0 || (i_creature.ass.analLooseness <= 1 && rand(4) <= 2)) {
			description += ANAL_TIGHTNESS_DESCRIPTORS[i_creature.ass.analLooseness];
		}

		//asshole descriptor
		if (SFWMode) {
			description += randomChoice("rear end",
				"backdoor");
		} else {
			description += randomChoice("ass",
				"anus",
				"pucker",
				"backdoor",
				"asshole",
				"butthole");
		}
		return description;
	}

	export function wingsDescript(i_creature: Creature) {
		return DEFAULT_WING_NAMES[i_creature.wingType] + " wings";
	}

	const BREAST_CUP_NAMES = [
		"flat",//0
		//				1			2			3			4			5				6			7		8			9
		"A-cup", "B-cup", "C-cup", "D-cup", "DD-cup", "big DD-cup", "E-cup", "big E-cup", "EE-cup",// 1-9
		"big EE-cup", "F-cup", "big F-cup", "FF-cup", "big FF-cup", "G-cup", "big G-cup", "GG-cup", "big GG-cup", "H-cup",//10-19
		"big H-cup", "HH-cup", "big HH-cup", "HHH-cup", "I-cup", "big I-cup", "II-cup", "big II-cup", "J-cup", "big J-cup",//20-29
		"JJ-cup", "big JJ-cup", "K-cup", "big K-cup", "KK-cup", "big KK-cup", "L-cup", "big L-cup", "LL-cup", "big LL-cup",//30-39
		"M-cup", "big M-cup", "MM-cup", "big MM-cup", "MMM-cup", "large MMM-cup", "N-cup", "large N-cup", "NN-cup", "large NN-cup",//40-49
		"O-cup", "large O-cup", "OO-cup", "large OO-cup", "P-cup", "large P-cup", "PP-cup", "large PP-cup", "Q-cup", "large Q-cup",//50-59
		"QQ-cup", "large QQ-cup", "R-cup", "large R-cup", "RR-cup", "large RR-cup", "S-cup", "large S-cup", "SS-cup", "large SS-cup",//60-69
		"T-cup", "large T-cup", "TT-cup", "large TT-cup", "U-cup", "large U-cup", "UU-cup", "large UU-cup", "V-cup", "large V-cup",//70-79
		"VV-cup", "large VV-cup", "W-cup", "large W-cup", "WW-cup", "large WW-cup", "X-cup", "large X-cup", "XX-cup", "large XX-cup",//80-89
		"Y-cup", "large Y-cup", "YY-cup", "large YY-cup", "Z-cup", "large Z-cup", "ZZ-cup", "large ZZ-cup", "ZZZ-cup", "large ZZZ-cup"//90-99
	];

	export function breastCup(size:number):string {
		return BREAST_CUP_NAMES[Math.min(Math.floor(size), BREAST_CUP_NAMES.length - 1)];
	}

	/**
	 * Returns breast size from cup name.
	 * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BREAST_CUP_NAMES array
	 */
	export function breastCupInverse(name:string, defaultValue:number=0):number {
		//Main function
		if (name.length == 0) return defaultValue;
		if (name == "flat") return 0;
		let big = name.charAt(name.length - 1) == "+";
		if (big) name = name.substr(0, name.length - 1);
		for (let i = 0; i < BREAST_CUP_NAMES.length; i++) {
			if (name == BREAST_CUP_NAMES[i]) return i;
			if (BREAST_CUP_NAMES[i].indexOf(name) == 0) return i + (big ? 1 : 0);
		}
		return defaultValue;
	}


	const DEFAULT_GENDER_NAMES     = createMapFromPairs(
		[
			[Gender.NONE, "genderless"],
			[Gender.MALE, "male"],
			[Gender.FEMALE, "female"],
			[Gender.HERM, "hermaphrodite"]
		]
	);
	const DEFAULT_SKIN_NAMES       = createMapFromPairs(
		[
			[SkinType.PLAIN, "skin"],
			[SkinType.FUR, "fur"],
			[SkinType.SCALES, "scales"],
			[SkinType.GOO, "goo"],
			[SkinType.UNDEFINED, "undefined flesh"]
		]
	);
	const DEFAULT_SKIN_DESCS       = createMapFromPairs(
		[
			[SkinType.PLAIN, "skin"],
			[SkinType.FUR, "fur"],
			[SkinType.SCALES, "scales"],
			[SkinType.GOO, "skin"],
			[SkinType.UNDEFINED, "skin"]
		]
	);
	const DEFAULT_HAIR_NAMES       = createMapFromPairs(
		[
			[HairType.NORMAL, "normal"],
			[HairType.FEATHER, "feather"],
			[HairType.GHOST, "transparent"],
			[HairType.GOO, "goopy"],
			[HairType.ANEMONE, "tentacle"],
			[HairType.QUILL, "quill"]
		]
	);
	const DEFAULT_BEARD_NAMES      = createMapFromPairs(
		[
			[BeardStyle.NORMAL, "normal"],
			[BeardStyle.GOATEE, "goatee"]
		]
	);
	const DEFAULT_FACE_NAMES       = createMapFromPairs(
		[
			[FaceType.HUMAN, "human"],
			[FaceType.HORSE, "horse"],
			[FaceType.DOG, "dog"],
			[FaceType.COW_MINOTAUR, "cow"],
			[FaceType.SHARK_TEETH, "shark"],
			[FaceType.SNAKE_FANGS, "snake"],
			[FaceType.CAT, "cat"],
			[FaceType.LIZARD, "lizard"],
			[FaceType.BUNNY, "bunny"],
			[FaceType.KANGAROO, "kangaroo"],
			[FaceType.SPIDER_FANGS, "spider"],
			[FaceType.FOX, "fox"],
			[FaceType.DRAGON, "dragon"],
			[FaceType.RACCOON_MASK, "raccoon mask"],
			[FaceType.RACCOON, "racoon"],
			[FaceType.BUCKTEETH, "buckteeth"],
			[FaceType.MOUSE, "mouse"],
			[FaceType.FERRET_MASK, "ferret mask"],
			[FaceType.FERRET, "ferret"],
			[FaceType.PIG, "pig"],
			[FaceType.BOAR, "boar"],
			[FaceType.RHINO, "rhino"],
			[FaceType.ECHIDNA, "echidna"],
			[FaceType.DEER, "deer"]
		]
	);
	const DEFAULT_TONGUE_NAMES     = createMapFromPairs(
		[
			[TongueType.HUMAN, "human"],
			[TongueType.SNAKE, "snake"],
			[TongueType.DEMONIC, "demonic"],
			[TongueType.DRACONIC, "draconic"],
			[TongueType.ECHIDNA, "echidna"]
		]
	);
	const DEFAULT_EYES_NAMES       = createMapFromPairs(
		[
			[EyeType.HUMAN, "human"],
			[EyeType.FOUR_SPIDER_EYES, "4 spider"],
			[EyeType.BLACK_EYES_SAND_TRAP, "sandtrap black"]
		]
	);
	const DEFAULT_EARS_NAMES       = createMapFromPairs(
		[
			[EarType.HUMAN, "human"],
			[EarType.HORSE, "horse"],
			[EarType.DOG, "dog"],
			[EarType.COW, "cow"],
			[EarType.ELFIN, "elfin"],
			[EarType.CAT, "cat"],
			[EarType.LIZARD, "lizard"],
			[EarType.BUNNY, "bunny"],
			[EarType.KANGAROO, "kangaroo"],
			[EarType.FOX, "fox"],
			[EarType.DRAGON, "dragon"],
			[EarType.RACCOON, "raccoon"],
			[EarType.MOUSE, "mouse"],
			[EarType.FERRET, "ferret"],
			[EarType.PIG, "pig"],
			[EarType.RHINO, "rhino"],
			[EarType.ECHIDNA, "echidna"],
			[EarType.DEER, "deer"]
		]
	);
	const DEFAULT_HORNS_NAMES      = createMapFromPairs(
		[
			[HornType.NONE, "non-existant"],
			[HornType.DEMON, "demon"],
			[HornType.COW_MINOTAUR, "cow"],
			[HornType.DRACONIC_X2, "2 draconic"],
			[HornType.DRACONIC_X4_12_INCH_LONG, "four 12\" long draconic"],
			[HornType.ANTLERS, "deer"],
			[HornType.GOAT, "goat"],
			[HornType.RHINO, "rhino"]
		]
	);
	const DEFAULT_ANTENNAE_NAMES   = createMapFromPairs(
		[
			[AntennaeType.NONE, "non-existant"],
			[AntennaeType.BEE, "bee"]
		]
	);
	const DEFAULT_ARM_NAMES        = createMapFromPairs(
		[
			[ArmType.HUMAN, "human"],
			[ArmType.HARPY, "harpy"],
			[ArmType.SPIDER, "spider"]
		]
	);
	const DEFAULT_TAIL_NAMES       = createMapFromPairs(
		[
			[TailType.NONE, "non-existant"],
			[TailType.HORSE, "horse"],
			[TailType.DOG, "dog"],
			[TailType.DEMONIC, "demonic"],
			[TailType.COW, "cow"],
			[TailType.SPIDER_ADBOMEN, "spider abdomen"],
			[TailType.BEE_ABDOMEN, "bee abdomen"],
			[TailType.SHARK, "shark"],
			[TailType.CAT, "cat"],
			[TailType.LIZARD, "lizard"],
			[TailType.RABBIT, "rabbit"],
			[TailType.HARPY, "harpy"],
			[TailType.KANGAROO, "kangaroo"],
			[TailType.FOX, "fox"],
			[TailType.DRACONIC, "draconic"],
			[TailType.RACCOON, "raccoon"],
			[TailType.MOUSE, "mouse"],
			[TailType.BEHEMOTH, "behemoth"],
			[TailType.PIG, "pig"],
			[TailType.SCORPION, "scorpion"],
			[TailType.GOAT, "goat"],
			[TailType.RHINO, "rhino"],
			[TailType.ECHIDNA, "echidna"],
			[TailType.DEER, "deer"]
		]
	);
	const DEFAULT_WING_NAMES       = createMapFromPairs(
		[
			[WingType.NONE, "non-existant"],
			[WingType.BEE_LIKE_SMALL, "small bee-like"],
			[WingType.BEE_LIKE_LARGE, "large bee-like"],
			[WingType.HARPY, "harpy"],
			[WingType.IMP, "imp"],
			[WingType.BAT_LIKE_TINY, "tiny bat-like"],
			[WingType.BAT_LIKE_LARGE, "large bat-like"],
			[WingType.SHARK_FIN, "shark fin"],
			[WingType.FEATHERED_LARGE, "large feathered"],
			[WingType.DRACONIC_SMALL, "small draconic"],
			[WingType.DRACONIC_LARGE, "large draconic"],
			[WingType.GIANT_DRAGONFLY, "giant dragonfly"]
		]
	);
	const DEFAULT_WING_DESCS       = createMapFromPairs(
		[
			[WingType.NONE, "non-existant"],
			[WingType.BEE_LIKE_SMALL, "small bee-like"],
			[WingType.BEE_LIKE_LARGE, "large bee-like"],
			[WingType.HARPY, "large feathery"],
			[WingType.IMP, "small"],
			[WingType.BAT_LIKE_TINY, "tiny, bat-like"],
			[WingType.BAT_LIKE_LARGE, "large, bat-like"],
			[WingType.SHARK_FIN, ""],
			[WingType.FEATHERED_LARGE, "large, feathered"],
			[WingType.DRACONIC_SMALL, "small, draconic"],
			[WingType.DRACONIC_LARGE, "large, draconic"],
			[WingType.GIANT_DRAGONFLY, "giant dragonfly"]
		]
	);
	const DEFAULT_LOWER_BODY_NAMES = createMapFromPairs(
		[
			[LowerBodyType.HUMAN, "human"],
			[LowerBodyType.HOOFED, "hoofed"],
			[LowerBodyType.DOG, "dog"],
			[LowerBodyType.NAGA, "naga"],
			[LowerBodyType.CENTAUR, "centaur"],
			[LowerBodyType.DEMONIC_HIGH_HEELS, "demonic high-heels"],
			[LowerBodyType.DEMONIC_CLAWS, "demonic claws"],
			[LowerBodyType.BEE, "bee"],
			[LowerBodyType.GOO, "goo"],
			[LowerBodyType.CAT, "cat"],
			[LowerBodyType.LIZARD, "lizard"],
			[LowerBodyType.PONY, "pony"],
			[LowerBodyType.BUNNY, "bunny"],
			[LowerBodyType.HARPY, "harpy"],
			[LowerBodyType.KANGAROO, "kangaroo"],
			[LowerBodyType.CHITINOUS_SPIDER_LEGS, "chitinous spider legs"],
			[LowerBodyType.DRIDER_LOWER_BODY, "drider"],
			[LowerBodyType.FOX, "fox"],
			[LowerBodyType.DRAGON, "dragon"],
			[LowerBodyType.RACCOON, "raccoon"],
			[LowerBodyType.FERRET, "ferret"],
			[LowerBodyType.CLOVEN_HOOFED, "cloven-hoofed"],
			[LowerBodyType.ECHIDNA, "echidna"],
			[LowerBodyType.ECHIDNA, "deertaur"]
		]
	);
	const DEFAULT_PIERCING_NAMES   = createMapFromPairs(
		[
			[PiercingType.NONE, "none"],
			[PiercingType.STUD, "stud"],
			[PiercingType.RING, "ring"],
			[PiercingType.LADDER, "ladder"],
			[PiercingType.HOOP, "hoop"],
			[PiercingType.CHAIN, "chain"]
		]
	);
	/*const DEFAULT_VAGINA_TYPE_NAMES = createMapFromPairs(
	 [
	 [VAGINA_TYPE_HUMAN, "human"],
	 [VAGINA_TYPE_EQUINE, "equine"],
	 [VAGINA_TYPE_BLACK_SAND_TRAP, "black sandtrap"]
	 ]
	 );*/
	const DEFAULT_VAGINA_WETNESS_SCALES   = [
		[VAGINA_WETNESS_DRY, "dry"],
		[VAGINA_WETNESS_NORMAL, "normal"],
		[VAGINA_WETNESS_WET, "wet"],
		[VAGINA_WETNESS_SLICK, "slick"],
		[VAGINA_WETNESS_DROOLING, "drooling"],
		[VAGINA_WETNESS_SLAVERING, "slavering"]
	];
	const DEFAULT_VAGINA_LOOSENESS_SCALES = [
		[VAGINA_LOOSENESS_TIGHT, "tight"],
		[VAGINA_LOOSENESS_NORMAL, "normal"],
		[VAGINA_LOOSENESS_LOOSE, "loose"],
		[VAGINA_LOOSENESS_GAPING, "gaping"],
		[VAGINA_LOOSENESS_GAPING_WIDE, "gaping wide"],
		[VAGINA_LOOSENESS_CLOWN_CAR, "clown-car level"]
	];
	const DEFAULT_ANAL_WETNESS_SCALES     = [
		[ANAL_WETNESS_DRY, "dry"],
		[ANAL_WETNESS_NORMAL, "normal"],
		[ANAL_WETNESS_MOIST, "moist"],
		[ANAL_WETNESS_SLIMY, "slimym"],
		[ANAL_WETNESS_DROOLING, "drooling"],
		[ANAL_WETNESS_SLIME_DROOLING, "slime-drooling"]
	];
	const DEFAULT_ANAL_LOOSENESS_SCALES   = [
		[ANAL_LOOSENESS_VIRGIN, "virgin"],
		[ANAL_LOOSENESS_TIGHT, "tight"],
		[ANAL_LOOSENESS_NORMAL, "normal"],
		[ANAL_LOOSENESS_LOOSE, "loose"],
		[ANAL_LOOSENESS_STRETCHED, "stretched"],
		[ANAL_LOOSENESS_GAPING, "gaping"]
	];
	const DEFAULT_HIP_RATING_SCALES       = [
		[HIP_RATING_BOYISH, "boyish"],
		[HIP_RATING_SLENDER, "slender"],
		[HIP_RATING_AVERAGE, "average"],
		[HIP_RATING_AMPLE, "ample"],
		[HIP_RATING_CURVY, "curvy"],
		[HIP_RATING_FERTILE, "fertile"],
		[HIP_RATING_INHUMANLY_WIDE, "inhumanly wide"]
	];
	const DEFAULT_BUTT_RATING_SCALES      = [
		[BUTT_RATING_BUTTLESS, "buttless"],
		[BUTT_RATING_TIGHT, "tight"],
		[BUTT_RATING_AVERAGE, "average"],
		[BUTT_RATING_NOTICEABLE, "noticeable"],
		[BUTT_RATING_LARGE, "large"],
		[BUTT_RATING_JIGGLY, "jiggly"],
		[BUTT_RATING_EXPANSIVE, "expansive"],
		[BUTT_RATING_HUGE, "huge"],
		[BUTT_RATING_INCONCEIVABLE, "inconceivably big"]
	];

	/**
	 * Assume scale = [[0,"small"],[5,"average"],[10,"big"]]
	 *      value < 0   ->   "less than small"
	 *      value = 0   ->   "small"
	 *  0 < value < 5   ->   "between small and average"
	 *      value = 5   ->   "average"
	 *  5 < value < 10  ->   "between average and big"
	 *      value = 10  ->   "big"
	 *      value > 10  ->   "more than big"
	 */
	export function describeByScale(value:number, scale:[number,string][], lessThan:string="less than", moreThan:string="more than"):string {
		//Main function
		if (scale.length == 0) return "undescribeable";
		if (scale.length == 1) return "about " + scale[0][1];
		if (value < scale[0][0]) return lessThan + " " + scale[0][1];
		if (value == scale[0][0]) return scale[0][1];
		for (let i = 1; i < scale.length; i++) {
			if (value < scale[i][0]) return "between " + scale[i - 1][1] + " and " + scale[i][1];
			if (value == scale[i][0]) return scale[i][1];
		}
		return moreThan + " " + scale[scale.length - 1][1];
	}

	/**
	 * numberOfThings(0,"brain") = "no brains"
	 * numberOfThings(1,"head") = "one head"
	 * numberOfThings(2,"tail") = "2 tails"
	 * numberOfThings(3,"hoof","hooves") = "3 hooves"
	 */
	export function numberOfThings(n:number, name:string, pluralForm:string=name+"s"):string {
		if (n == 0) return "no " + pluralForm;
		if (n == 1) return "one " + name;
		return n + " " + pluralForm;
	}

	/**
	 * 13 -> 2'1"
	 * 5.5 -> 5.5"
	 * Positive only!
	 */
	export function feetsAndInches(n:number):string {
		let feet   = Math.floor(n / 12);
		let inches = n - feet * 12;
		if (feet > 0) return feet + "'" + inches + "\"";
		else return inches + "\"";
	}

	/**
	 * 13 -> 13" (2'1")
	 */
	export function inchesAndFeetsAndInches(n:number):string {
		if (n < 12) return n + "\"";
		return n + "\" (" + feetsAndInches(n) + ")";
	}

	export function allBreastsDescript(creature:Creature):string {
		let storage = "";
		if (creature.breastRows.length == 0) return "unremarkable chest muscles ";
		if (creature.breastRows.length == 2) {
			//if (creature.totalBreasts() == 4) storage += "quartet of ";
			storage += "two rows of ";
		}
		if (creature.breastRows.length == 3) {
			if (rand(2) == 0) storage += "three rows of ";
			else storage += "multi-layered ";
		}
		if (creature.breastRows.length == 4) {
			if (rand(2) == 0) storage += "four rows of ";
			else storage += "four-tiered ";
		}
		if (creature.breastRows.length == 5) {
			if (rand(2) == 0) storage += "five rows of ";
			else storage += "five-tiered ";
		}
		storage += biggestBreastSizeDescript(creature);
		return storage;

	}

	export function tailDescript(i_creature: Creature) {
		if (i_creature.tailType == TailType.NONE) {
			console.warn("WARNING: Creature has no tails to describe.");
			return "<b>!Creature has no tails to describe!</b>";
		}

		let descript = "";

		if (i_creature.tailType == TailType.FOX && i_creature.tailCount >= 1) {
			// Kitsune tails, we're using tailVenom to track tail count
			if (i_creature.tailCount > 1) {
				if (i_creature.tailCount == 2) descript += "pair ";
				else if (i_creature.tailCount == 3) descript += "trio ";
				else if (i_creature.tailCount == 4) descript += "quartet ";
				else if (i_creature.tailCount == 5) descript += "quintet ";
				else if (i_creature.tailCount > 5) descript += "bundle ";

				descript += "of kitsune tails";
			}
			else descript += "kitsune tail";
		}
		else {
			descript += DEFAULT_TAIL_NAMES[i_creature.tailType];
			descript += " tail";
		}

		return descript;
	}

	export function oneTailDescript(i_creature: Creature) {
		if (i_creature.tailType == TailType.NONE) {
			console.warn("WARNING: Creature has no tails to describe.");
			return "<b>!Creature has no tails to describe!</b>";
		}

		let descript = "";

		if (i_creature.tailType == TailType.FOX && i_creature.tailCount >= 1) {
			if (i_creature.tailCount == 1) {
				descript += "your kitsune tail";
			}
			else {
				descript += "one of your kitsune tails";
			}
		}
		else {
			descript += "your " + DEFAULT_TAIL_NAMES[i_creature.tailType] + " tail";
		}

		return descript;
	}

	export function biggestBreastSizeDescript(creature:Creature):string {
		let temp14   = Math.random() * 3;
		let descript = "";
		let temp142  = creature.biggestTitRow();
		//ERROR PREVENTION
		if (creature.breastRows.length - 1 < temp142) {
			return "<b>ERROR, biggestBreastSizeDescript() working with invalid breastRow</b>";
		}
		else if (temp142 < 0) {
			return "ERROR SHIT SON!  BIGGESTBREASTSIZEDESCRIPT PASSED NEGATIVE!";
		}
		if (creature.breastRows[temp142].breastRating < 1) return "flat breasts";
		//50% of the time size-descript them
		if (rand(2) == 0) descript += breastSize(creature.breastRows[temp142].breastRating);
		//Nouns!
		temp14 = rand(10);
		if (temp14 == 0) descript += "breasts";
		if (temp14 == 1) {
			if (creature.breastRows[temp142].lactationMultiplier > 2) descript += "milk-udders";
			else descript += "breasts";
		}
		if (temp14 == 2) {
			if (creature.breastRows[temp142].lactationMultiplier > 1.5) descript += "milky ";
			if (creature.breastRows[temp142].breastRating > 4) descript += "tits";
			else descript += "breasts";
		}
		if (temp14 == 3) {
			//if (creature.breastRows[temp142].breastRating > 6) descript += "rack";
			descript += "breasts";
		}
		if (temp14 == 4) descript += "tits";
		if (temp14 == 5) descript += "tits";
		if (temp14 == 6) descript += "tits";
		if (temp14 == 7) {
			if (creature.breastRows[temp142].lactationMultiplier >= 1 && creature.breastRows[temp142].lactationMultiplier < 2.5) descript += "milk jugs";
			if (creature.breastRows[temp142].lactationMultiplier >= 2.5) descript += "udders";
			if (creature.breastRows[temp142].lactationMultiplier < 1) descript += "jugs";
		}
		if (temp14 == 8) {
			if (creature.breastRows[temp142].breastRating > 6) descript += "love-pillows";
			else descript += "boobs";
		}
		if (temp14 == 9) {
			if (creature.breastRows[temp142].breastRating > 6) descript += "tits";
			else descript += "breasts";
		}
		return descript;
	}

	export function breastSize(val:number):string {
		let descript = "";
		//Catch all for dudes.
		if (val < 1) return "manly ";
		//Small - A->B
		if (val <= 2) {
			descript += randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
		}
		//C-D
		else if (val <= 4) {
			descript += randomChoice("nice ", "hand-filling ", "well-rounded ", "supple ", "softball-sized ");
		}
		//DD->big EE
		else if (val < 11) {
			descript += randomChoice("big ", "large ", "pillowy ", "jiggly ", "volleyball-sized ");
		}
		//F->big FF
		else if (val < 15) {
			descript += randomChoice("soccerball-sized ", "hand-overflowing ", "generous ", "jiggling ");
		}
		//G -> HHH
		else if (val < 24) {
			descript += randomChoice("basketball-sized ", "whorish ", "cushiony ", "wobbling ");
		}
		//I -> KK
		else if (val < 35) {
			descript += randomChoice("massive motherly ", "luscious ", "smothering ", "prodigious ");
		}
		//K- > MMM+
		else {
			descript += randomChoice("mountainous ", "monumental ", "back-breaking ", "exercise-ball-sized ", "immense ");
		}
		return descript;
	}

	/* Moved to Creature.as
	 chestDesc(creature)
	 {
	 if (creature.biggestTitSize() < 1) return "chest";
	 else return biggestBreastSizeDescript(creature);
	 }
	 */

	export function assholeOrPussy(creature:Creature):string {
		if (creature.hasVagina()) return vaginaDescript(creature, 0);
		return assholeDescript(creature);
	}


	export function multiCockDescriptLight(creature:Creature):string {
		if (creature.cocks.length < 1) {
			return "<B>Error: multiCockDescriptLight() called with no penises present.</B>";
		}
		//Get cock counts
		let descript         = "";
		let currCock         = 0;
		let totCock          = creature.cocks.length;
		let dogCocks         = 0;
		let horseCocks       = 0;
		let normalCocks      = 0;
		let normalCockKey    = 0;
		let dogCockKey       = 0;
		let horseCockKey     = 0;
		let averageLength    = 0;
		let averageThickness = 0;
		let same             = true;
		//For temp14 random values
		let rando            = 0;
		let descripted       = false;
		//If one, return normal cock descript
		if (totCock == 1) return cockDescript(creature,0);
		//Count cocks & Prep average totals
		while (currCock <= totCock - 1) {
			if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
				normalCocks++;
				normalCockKey = currCock;
			}
			if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
				horseCocks++;
				horseCockKey = currCock;
			}
			if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
				dogCocks++;
				dogCockKey = currCock;
			}
			averageLength += creature.cocks[currCock].cockLength;
			averageThickness += creature.cocks[currCock].cockThickness;
			//If cocks are matched make sure they still are
			if (same && currCock > 0 && creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType) same = false;
			currCock++;
		}
		//Crunch averages
		averageLength /= currCock;
		averageThickness /= currCock;
		//Quantity descriptors
		if (creature.cockTotal() == 1) {
			if (dogCocks == 1) return cockNoun(CockTypesEnum.DOG);
			if (horseCocks == 1) return cockNoun(CockTypesEnum.HORSE);
			if (normalCocks == 1) return creature.cockDescript(0);
			//Failsafe
			return creature.cockDescript(0);
		}
		if (currCock == 2) {
			//For cocks that are the same
			if (same) {
				descript += randomChoice("pair of ", "two ", "brace of ", "matching ", "twin ");
				descript += creature.cockAdjective();
				if (normalCocks == 2) descript += " " + cockNoun(CockTypesEnum.HUMAN) + "s";
				if (horseCocks == 2) descript += ", " + cockNoun(CockTypesEnum.HORSE) + "s";
				if (dogCocks == 2) descript += ", " + cockNoun(CockTypesEnum.DOG) + "s";
				//Failsafe
				if (creature.cocks[0].cockType > 2) descript += ", " + cockNoun(creature.cocks[0].cockType) + "s";
			}
			//Nonidentical
			else {
				descript += randomChoice("pair of ", "two ", "brace of ");
				descript += creature.cockAdjective() + ", ";
				descript += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
			}
		}
		if (currCock == 3) {
			//For samecocks
			if (same) {
				descript += randomChoice("three ", "group of ", "<i>ménage à trois</i> of ", "triad of ", "triumvirate of ");
				descript += creature.cockAdjective();
				if (normalCocks == 3) descript += " " + cockNoun(CockTypesEnum.HUMAN) + "s";
				if (horseCocks == 3) descript += ", " + cockNoun(CockTypesEnum.HORSE) + "s";
				if (dogCocks == 3) descript += ", " + cockNoun(CockTypesEnum.DOG) + "s";
				//Tentacles
				if (creature.cocks[0].cockType > 2) descript += ", " + cockNoun(creature.cocks[0].cockType) + "s";
			}
			else {
				descript += randomChoice("three ", "group of ");
				descript += creature.cockAdjective() + ", ";
				descript += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
			}
		}
		//Large numbers of cocks!
		if (currCock > 3) {
			descript += randomChoice("bundle of ", "obscene group of ", "cluster of ", "wriggling bunch of ");
			//Cock adjectives and nouns
			descripted = false;
			//Same
			if (same) {
				if (currCock == normalCocks) {
					descript += creature.cockAdjective() + " ";
					descript += cockNoun(CockTypesEnum.HUMAN) + "s";
					descripted = true;
				}
				if (currCock == dogCocks) {
					descript += creature.cockAdjective() + ", ";
					descript += cockNoun(CockTypesEnum.DOG) + "s";
					descripted = true;
				}
				if (currCock == horseCocks) {
					descript += creature.cockAdjective() + ", ";
					descript += cockNoun(CockTypesEnum.HORSE) + "s";
					descripted = true;
				}
				if (creature.cocks[0].cockType > 2) {
					descript += creature.cockAdjective() + ", ";
					descript += cockNoun(creature.cocks[0].cockType) + "s";
					descripted = true;
				}
			}
			//If mixed
			if (!descripted) {
				descript += creature.cockAdjective() + ", ";
				descript += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
			}
		}
		return descript;
	}

	export function multiCockDescript(creature:Creature):string {
		if (creature.cocks.length < 1) {
			return "<B>Error: multiCockDescript() called with no penises present.</B>";
		}
		//Get cock counts
		let descript         = "";
		let currCock         = 0;
		let totCock          = creature.cocks.length;
		let dogCocks         = 0;
		let horseCocks       = 0;
		let normalCocks      = 0;
		let normalCockKey    = 0;
		let dogCockKey       = 0;
		let horseCockKey     = 0;
		let averageLength    = 0;
		let averageThickness = 0;
		let same             = true;
		//For temp14 random values
		let rando            = 0;
		let descripted       = false;
		//Count cocks & Prep average totals
		while (currCock <= totCock - 1) {
			//trace("Counting cocks!");
			if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
				normalCocks++;
				normalCockKey = currCock;
			}
			if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
				horseCocks++;
				horseCockKey = currCock;
			}
			if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
				dogCocks++;
				dogCockKey = currCock;
			}
			averageLength += creature.cocks[currCock].cockLength;
			averageThickness += creature.cocks[currCock].cockThickness;
			//If cocks are matched make sure they still are
			if (same && currCock > 0 && creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType) same = false;
			currCock++;
		}
		//Crunch averages
		averageLength /= currCock;
		averageThickness /= currCock;
		//Quantity descriptors
		if (currCock == 1) {
			if (dogCocks == 1) return cockNoun(CockTypesEnum.DOG);
			if (horseCocks == 1) return cockNoun(CockTypesEnum.HORSE);
			if (normalCocks == 1) return cockDescript(creature, 0);
			//Catch-all for when I add more cocks.  Let cock descript do the sorting.
			if (creature.cocks.length == 1) return cockDescript(creature, 0);
		}
		if (currCock == 2) {
			//For cocks that are the same
			if (same) {
				descript += randomChoice("a pair of ", "two ", "a brace of ", "matching ", "twin ");
				descript += cockAdjectives(averageLength, averageThickness, creature.cocks[0].cockType, creature);
				if (normalCocks == 2) descript += " " + cockNoun(CockTypesEnum.HUMAN) + "s";
				if (horseCocks == 2) descript += ", " + cockNoun(CockTypesEnum.HORSE) + "s";
				if (dogCocks == 2) descript += ", " + cockNoun(CockTypesEnum.DOG) + "s";
				//Tentacles
				if (creature.cocks[0].cockType > 2)
					descript += ", " + cockNoun(creature.cocks[0].cockType) + "s";
			}
			//Nonidentical
			else {
				descript += randomChoice("a pair of ", "two ", "a brace of ");
				descript += cockAdjectives(averageLength, averageThickness, creature.cocks[0].cockType, creature) + ", ";
				descript += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
			}
		}
		if (currCock == 3) {
			//For samecocks
			if (same) {
				descript += randomChoice("three ", "a group of ", "a <i>ménage à trois</i> of ", "a triad of ", "a triumvirate of ");
				descript += cockAdjectives(averageLength, averageThickness, creature.cocks[currCock - 1].cockType, creature);
				if (normalCocks == 3)
					descript += " " + cockNoun(CockTypesEnum.HUMAN) + "s";
				if (horseCocks == 3)
					descript += ", " + cockNoun(CockTypesEnum.HORSE) + "s";
				if (dogCocks == 3)
					descript += ", " + cockNoun(CockTypesEnum.DOG) + "s";
				//Tentacles
				if (creature.cocks[0].cockType > 2) descript += ", " + cockNoun(creature.cocks[0].cockType) + "s";   // Not sure what's going on here, referencing index *may* be a bug.

			}
			else {
				descript += randomChoice("three ", "a group of ");
				descript += cockAdjectives(averageLength, averageThickness, creature.cocks[0].cockType, creature);
				descript += randomChoice(", mutated cocks", ", mutated dicks", ", mixed cocks", ", mismatched dicks");
			}
		}
		//Large numbers of cocks!
		if (currCock > 3) {
			descript += randomChoice("a bundle of ", "an obscene group of ", "a cluster of ", "a wriggling group of ");
			//Cock adjectives and nouns
			descripted = false;
			//If same types...
			if (same) {
				if (creature.cocks[0].cockType == CockTypesEnum.HUMAN) {
					descript += cockAdjectives(averageLength, averageThickness, CockTypesEnum.HUMAN, creature) + " ";
					descript += cockNoun(CockTypesEnum.HUMAN) + "s";
					descripted = true;
				}
				if (creature.cocks[0].cockType == CockTypesEnum.DOG) {
					descript += cockAdjectives(averageLength, averageThickness, CockTypesEnum.DOG, creature) + ", ";
					descript += cockNoun(CockTypesEnum.DOG) + "s";
					descripted = true;
				}
				if (creature.cocks[0].cockType == CockTypesEnum.HORSE) {
					descript += cockAdjectives(averageLength, averageThickness, CockTypesEnum.HORSE, creature) + ", ";
					descript += cockNoun(CockTypesEnum.HORSE) + "s";
					descripted = true;
				}
				//TODO More group cock type descriptions!
				if (creature.cocks[0].cockType > 2) {
					descript += cockAdjectives(averageLength, averageThickness, CockTypesEnum.HUMAN, creature) + ", ";
					descript += cockNoun(creature.cocks[0].cockType) + "s";
					descripted = true;
				}
			}
			//If mixed
			if (!descripted) {
				descript += cockAdjectives(averageLength, averageThickness, creature.cocks[0].cockType, creature) + ", ";
				rando = rand(4);
				descript += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");
			}
		}
		return descript;
	}
}



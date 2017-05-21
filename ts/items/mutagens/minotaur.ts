/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		//Minoblood only. Minotaur Cum is in consumableEffects.js
		function minotaurTFs(): void {
			player.slimeFeed();
			//Changes done
			let changes     = 0;
			//Change limit
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (rand(3) == 0) changeLimit++;
			if (rand(3) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			if (changeLimit == 1) changeLimit = 2;
			//Temporary storage
			let temp  = 0;
			let temp2 = 0;
			let temp3 = 0;
			//Set up output
			clearOutput();
			outputText("You drink the bubbling red fluid, tasting the tangy iron after-taste.");
			//STATS
			//Strength h
			if (rand(3) == 0 && changes < changeLimit) {
				//weaker characters gain more
				if (player.str <= 50) {
					outputText("<br><br>Painful aches ripple through your body, flooding you with pain as your muscles flex and bulge, growing much stronger and more well-defined.");
					//very weak players gain more
					if (player.str <= 20) player.dynStats("str", 3);
					else player.dynStats("str", 2);
				}
				//stronger characters gain less
				else {
					//small growth if over 75
					if (player.str >= 75) player.dynStats("str", .5);
					//faster from 50-75
					else player.dynStats("str", 1);
					outputText("<br><br>Your muscles grow tighter, bulging outwards powerfully as you get even stronger!");
				}
				//Chance of speed drop
				if (rand(2) == 0 && player.str > 50) {
					outputText("<br><br>You begin to feel that the size of your muscles is starting to slow you down.");
					player.dynStats("spe", -1);
				}
				changes++;
			}
			//Toughness (chance of - sensitivity)
			if (rand(3) == 0 && changes < changeLimit) {
				//weaker characters gain more
				if (player.tou <= 50) {
					outputText("<br><br>Your hide... skin... whatever... you can feel it getting tougher as it thickens perceptibly.");
					//very weak players gain more
					if (player.tou <= 20) player.dynStats("tou", 3);
					else player.dynStats("tou", 2);
				}
				//stronger characters gain less
				else {
					//small growth if over 75
					if (player.tou >= 75) player.dynStats("tou", .5);
					//faster from 50-75
					else player.dynStats("tou", 1);
					outputText("<br><br>Your tough hide grows slightly thicker.");
				}
				//chance of less sensitivity
				if (rand(2) == 0 && player.sens > 10) {
					if (player.tou > 75) {
						outputText("<br><br>It becomes much harder to feel anything through your leathery skin.");
						player.dynStats("sens", -3);
					}
					if (player.tou <= 75 && player.tou > 50) {
						outputText("<br><br>The level of sensation from your skin diminishes noticeably.");
						player.dynStats("sens", -2);
					}
					if (player.tou <= 50) {
						outputText("<br><br>Your sense of touch diminishes due to your tougher hide.");
						player.dynStats("sens", -3);
					}
				}
				changes++;
			}
			//SEXUAL
			//Boosts ball size MORE than equinum :D:D:D:D:D:D:
			if (changes < changeLimit && rand(2) == 0 && player.ballSize <= 5 && player.countCocksOfType(CockTypesEnum.HORSE) > 0) {
				//Chance of ball growth if not 3" yet
				if (player.balls == 0) {
					player.balls    = 2;
					player.ballSize = 1;
					outputText("<br><br>A nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
					player.dynStats("lib", 2);
					player.changeLust(5);
				}
				else {
					player.ballSize++;
					if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.");
					if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ".  Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.");
					player.dynStats("lib", 1);
					player.changeLust(3);
				}
				changes++;
			}
			//Ovipositing Check
			if (rand(5) == 0 && changes >= changeLimit && player.hasPerk(PerkLib.Oviposition) && player.lizardScore() < 8) {
				outputText("<br><br>Another change in your uterus ripples through your reproductive systems. Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
				outputText("(<b>Perk Lost: Oviposition</b>)<br>");
				player.removePerk(PerkLib.Oviposition)
			}
			//Restore arms to become human arms again
			if (rand(4) == 0) Mutations.restoreArms("minotaurTf");
			//+hooves
			if (player.lowerBody != LowerBodyType.HOOFED) {
				if (changes < changeLimit && rand(3) == 0) {
					changes++;
					if (player.lowerBody == LowerBodyType.HUMAN) outputText("<br><br>You stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					if (player.lowerBody == LowerBodyType.DOG) outputText("<br><br>You stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					if (player.lowerBody == LowerBodyType.NAGA) outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
					//Catch-all
					if (player.lowerBody > LowerBodyType.NAGA) outputText("<br><br>You stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					if (player.skinType != SkinType.FUR) outputText("  A fine coat of fur grows out below your waist, itching briefly as it fills in.");
					outputText("<b>  You now have hooves in place of your feet!</b>");
					player.lowerBody = LowerBodyType.HOOFED;
					player.legCount  = 2;
					player.dynStats("spe", 1);
					changes++;
				}
			}
			if (!gameFlags[HYPER_HAPPY]) {
				//Kills vagina size (and eventually the whole vagina)
				if (player.vaginas.length > 0) {
					if (player.vaginas[0].vaginalLooseness > VAGINA_LOOSENESS_TIGHT) {
						//tighten that bitch up!
						outputText("<br><br>Your " + player.vaginaDescript(0) + " clenches up painfully as it tightens up, becoming smaller and tighter.");
						player.vaginas[0].vaginalLooseness--;
					}
					else {
						outputText("<br><br>A tightness in your groin is the only warning you get before your <b>" + player.vaginaDescript(0) + " disappears forever</b>!");
						//Goodbye womanhood!
						player.removeVagina(0, 1);
						if (player.cocks.length == 0) {
							outputText("  Strangely, your clit seems to have resisted the change, and is growing larger by the moment... shifting into the shape of a small ribbed minotaur-like penis!  <b>You now have a horse-cock!</b>");
							player.createCock();
							player.cocks[0].cockLength    = player.clitLength + 2;
							player.cocks[0].cockThickness = 1;
							player.cocks[0].cockType      = CockTypesEnum.HORSE;
							player.clitLength             = .25;
						}
						player.genderCheck();
					}
					changes++;
				}
				//-Remove extra breast rows
				if (changes < changeLimit && player.bRows() > 1 && rand(3) == 0) {
					changes++;
					outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
					if (player.bRows() >= 3) outputText("abdomen");
					else outputText("chest");
					outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
					if (player.skinType == SkinType.FUR) outputText(player.hairColor + " " + player.skinDesc);
					else outputText(player.skinTone + " " + player.skinDesc);
					outputText(" remains. <b>You've lost a row of breasts!</b>");
					player.dynStats("sens", -5);
					player.removeBreastRow(player.breastRows.length - 1, 1);
				}
				//Shrink boobages till they are normal
				else if (rand(2) == 0 && changes < changeLimit && player.breastRows.length > 0) {
					//Single row
					if (player.breastRows.length == 1) {
						//Shrink if bigger than B cups
						if (player.breastRows[0].breastRating >= 1) {
							temp = 1;
							player.breastRows[0].breastRating--;
							//Shrink again if huuuuge
							if (player.breastRows[0].breastRating > 8) {
								temp++;
								player.breastRows[0].breastRating--;
							}
							//Talk about shrinkage
							if (temp == 1) outputText("<br><br>You feel a weight lifted from you, and realize your " + player.breastDescript(0) + " have shrunk to " + player.breastCup(0) + "s.");
							if (temp == 2) outputText("<br><br>You feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + player.breastCup(0) + "s.");
							changes++;
						}
						
					}
					//multiple
					else {
						//temp2 = amount changed
						//temp3 = counter
						temp  = 0;
						temp2 = 0;
						temp3 = 0;
						if (player.biggestTitSize() >= 1) outputText("<br>");
						while (temp3 < player.breastRows.length) {
							if (player.breastRows[temp3].breastRating >= 1) {
								player.breastRows[temp3].breastRating--;
								temp2++;
								outputText("<br>");
								//If this isn't the first change...
								if (temp2 > 1) outputText("...and y");
								else outputText("Y");
								outputText("our " + player.breastDescript(temp3) + " shrink, dropping to " + player.breastCup(temp3) + "s.");
							}
							temp3++;
						}
						if (temp2 == 2) outputText("<br>You feel so much lighter after the change.");
						if (temp2 == 3) outputText("<br>Without the extra weight you feel particularly limber.");
						if (temp2 >= 4) outputText("<br>It feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
						if (temp2 > 0) changes++;
					}
				}
			}
			//Boosts cock size up to 36"x5".
			if (changes < changeLimit && rand(2) == 0 && player.cocks.length > 0) {
				let selectedCock = -1;
				for (let i = 0; i < player.cocks.length; i++) {
					if (player.cocks[i].cockType == CockTypesEnum.HORSE && (player.cocks[i].cockLength < 36 || player.cocks[i].cockThickness < 5)) {
						selectedCock = i;
						break;
					}
				}
				
				//Length first
				if (selectedCock != -1) {
					//Thickness too if small enough
					if (player.cocks[selectedCock].cockThickness < 5) {
						//Increase by 2 + rand(8), and store the actual amount in temp
						temp = player.cocks[selectedCock].increaseCock(2 + rand(8));
						temp += player.cocks[selectedCock].thickenCock(1);
						//Comment on length changes
						if (temp > 6) outputText("<br><br>Gasping in sudden pleasure, your " + player.cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
						if (temp <= 6 && temp >= 3) outputText("<br><br>You pant in delight as a few inches of " + player.cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
						if (temp < 3) outputText("<br><br>Groaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
						//Add a blurb about thickness...
						outputText("  To your delight and surprise, you discover it has grown slightly thicker as well!");
					}
					//Just length...
					else {
						//Increase by 2 + rand(8), and store the actual amount in temp
						temp = player.cocks[selectedCock].increaseCock(2 + rand(8));
						//Comment on length changes
						if (temp > 6) outputText("<br><br>Gasping in sudden pleasure, your " + player.cockDescript(selectedCock) + " surges free of its sheath, emerging with over half a foot of new dick-flesh.");
						if (temp <= 6 && temp >= 3) outputText("<br><br>You pant in delight as a few inches of " + player.cockDescript(selectedCock) + " pop free from your sheath, the thick new horse-flesh still slick and sensitive.");
						if (temp < 3) outputText("<br><br>Groaning softly, you feel a pleasurable change in your groin.  Looking down, you see [oneCock] grow slightly longer.");
					}
					changes++;
				}
			}
			//Morph dick to horsediiiiick
			if (player.cocks.length > 0 && rand(2) == 0 && changes < changeLimit) {
				let selectedCockValue = -1; //Changed as selectedCock and i caused duplicate var warnings
				for (let indexI = 0; indexI < player.cocks.length; indexI++) {
					if (player.cocks[indexI].cockType != CockTypesEnum.HORSE) {
						selectedCockValue = indexI;
						break;
					}
				}
				
				if (selectedCockValue != -1) {
					//Text for humandicks or others
					//TODO Figure out the Index stuff for this if statement
					if (player.cocks[selectedCockValue].cockType == CockTypesEnum.HUMAN /* || player.cocks[selectedCockValue].cockType.Index > 2 */) outputText("<br><br>Your " + player.cockDescript(selectedCockValue) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
					//Text for dogdicks
					if (player.cocks[selectedCockValue].cockType == CockTypesEnum.DOG) outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " begins to feel odd...  You pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + Appearance.cockNoun(CockTypesEnum.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond its traditional size.  You notice your knot vanishing, the extra flesh pushing more fresh horsecock out from your sheath.  <b>Your hands are drawn to the strange new " + Appearance.cockNoun(CockTypesEnum.HORSE) + "</b>, and you jerk yourself off, splattering thick ropes of cum with intense force.");
					player.cocks[selectedCockValue].cockType = CockTypesEnum.HORSE;
					player.cocks[selectedCockValue].increaseCock(4);
					player.dynStats(["lib", 5], ["sens", 4]);
					player.changeLust(35);
					outputText("<b>  You now have a");
					if (player.countCocksOfType(CockTypesEnum.HORSE) > 1) outputText("nother");
					outputText(" horse-penis.</b>");
					changes++;
				}
			}
			
			//Males go into rut
			if (rand(4) == 0) {
				player.goIntoRut(true);
			}
			
			//Anti-masturbation status
			if (rand(4) == 0 && changes < changeLimit && !player.hasStatusEffect(StatusEffects.Dysfunction)) {
				if (player.cocks.length > 0) outputText("<br><br>Your " + player.cockDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
				else if (player.hasVagina()) outputText("<br><br>Your " + player.vaginaDescript(0) + " tingles abruptly, then stops.  Worried, you reach down to check it, only to discover that it feels... numb.  It will be very hard to masturbate like this.");
				if (player.cocks.length > 0 || player.hasVagina()) {
					player.createStatusEffect(StatusEffects.Dysfunction, 96, 0, 0, 0);
					changes++;
				}
			}
			//Appearance shit:
			//Tail, Ears, Hooves, Horns, Height (no prereq), Face
			//+height up to 9 foot
			if (changes < changeLimit && rand(1.7) == 0 && player.tallness < 108) {
				temp = rand(5) + 3;
				//Slow rate of growth near ceiling
				if (player.tallness > 90) temp = Math.floor(temp / 2);
				//Never 0
				if (temp == 0) temp = 1;
				//Flavor texts.  Flavored like 1950's cigarettes. Yum.
				if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
				if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
				if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
				player.tallness += temp;
				changes++;
			}
			//Face change, requires Ears + Height + Hooves
			if (player.earType == EarType.COW && player.lowerBody == LowerBodyType.HOOFED && player.tallness >= 90
				&& changes < changeLimit && rand(3) == 0) {
				if (player.faceType != FaceType.COW_MINOTAUR) {
					outputText("<br><br>Bones shift and twist painfully as your visage twists and morphs to resemble that of the beast whose blood you now drink.  <b>You now have a minotaur-like face.</b>");
					changes++;
					player.faceType = FaceType.COW_MINOTAUR;
				}
			}
			//+mino horns require ears/tail
			if (changes < changeLimit && rand(3) == 0 && player.earType == EarType.COW && player.tailType == TailType.COW) {
				temp = 1;
				//New horns or expanding mino horns
				if (player.hornType == HornType.COW_MINOTAUR || player.hornType == HornType.NONE) {
					//Get bigger if player has horns
					if (player.hornType == HornType.COW_MINOTAUR) {
						//Fems horns don't get bigger.
						if (player.vaginas.length > 0) {
							if (player.horns > 4) {
								outputText("<br><br>You feel a pressure in your head around your horns, but they don't grow any larger.  ");
								outputText("Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
								player.hoursSinceCum += 200;
								player.changeLust(20);
							}
							else {
								outputText("<br><br>Your small horns get a bit bigger, stopping as medium sized nubs.");
								player.horns += 3;
							}
							changes++;
						}
						//Males horns get 'uge.
						else {
							temp = 1 + rand(3);
							player.horns += temp;
							if (temp == 0) changes--;
							if (temp == 1) outputText("<br><br>An aching pressure builds in your temples as you feel your horns push another inch of length from your skull.  ");
							if (temp == 2) outputText("<br><br>A powerful headache momentarily doubles you over.  With painful slowness, you feel your horns push another two inches of length out from your brow, gradually thickening as they grow.  ");
							if (temp == 3) outputText("<br><br>Agony overwhelms you as a headache of terrifying intensity sweeps through your skull.  You squeeze your eyes shut from the pain, but it does little to help.  The torture intensifies before finally diminishing as you feel an inch or two of new horn force its way out of your forehead.  The headache remains despite this, and desperate for relief, you grab hold of your horns and tug, pulling another inch of new horn free.  At last the pain fades, leaving you with significantly enhanced head-spikes.  ");
							if (player.horns < 3) outputText("They are the size of tiny nubs.");
							if (player.horns >= 3 && player.horns < 6) outputText("They are similar to what you would see on a young bull.");
							if (player.horns >= 6 && player.horns < 12) outputText("They look like the horns on a grown bull, big enough and dangerous enough to do some damage.");
							if (player.horns >= 12 && player.horns < 20) outputText("They are large and wicked looking.");
							if (player.horns >= 20) outputText("They are huge, heavy, and tipped with dangerous points.");
							//boys get a cum refill sometimes
							if (rand(2) == 0 && changes < changeLimit) {
								outputText("  Your headache clears as lust washes through you unnaturally.  You feel as if you haven't cum in months.");
								player.hoursSinceCum += 200;
								player.dynStats("lust", 20);
							}
							changes++;
						}
					}
					//If no horns yet..
					else {
						outputText("<br><br>With painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
						player.hornType = HornType.COW_MINOTAUR;
						player.horns    = 2;
						changes++;
					}
				}
				//Not mino horns, change to cow-horns
				if (player.hornType == HornType.DEMON || player.hornType > HornType.COW_MINOTAUR) {
					outputText("<br><br>Your horns vibrate and shift as if made of clay, reforming into two horns with a bovine-like shape.");
					player.hornType = HornType.COW_MINOTAUR;
					changes++;
				}
			}
			//+cow ears	- requires tail
			if (player.earType != EarType.COW && changes < changeLimit && player.tailType == TailType.COW && rand(2) == 0) {
				outputText("<br><br>You feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
				player.earType = EarType.COW;
				changes++;
			}
			//+cow tail
			if (changes < changeLimit && rand(2) == 0 && player.tailType != TailType.COW) {
				if (player.tailType == TailType.NONE) outputText("<br><br>You feel the flesh above your " + player.buttDescript() + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
				else {
					if (player.tailType < TailType.SPIDER_ADBOMEN || player.tailType > TailType.BEE_ABDOMEN) {
						outputText("<br><br>Your tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
					}
					//insect
					if (player.tailType == TailType.SPIDER_ADBOMEN || player.tailType == TailType.BEE_ABDOMEN) {
						outputText("<br><br>Your insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
					}
				}
				player.tailType = TailType.COW;
				changes++;
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && !player.hasPerk(PerkLib.MaraesGiftButtslut)) || player.ass.analWetness > 1)) {
				outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
				player.ass.analWetness--;
				if (player.ass.analLooseness > 1) player.ass.analLooseness--;
				changes++;
			}
			//Give you that mino build!
			if (rand(4) == 0) outputText(player.modFem(5, 10));
			if (rand(4) == 0) outputText(player.modTone(85, 3));
			if (rand(4) == 0) outputText(player.modThickness(70, 4));
			//Default
			if (changes == 0) {
				outputText("<br><br>Minotaur-like vitality surges through your body, invigorating and arousing you!<br>");
				if (player.balls > 0) {
					outputText("Your balls feel as if they've grown heavier with the weight of more sperm.<br>");
					player.hoursSinceCum += 200;
				}
				player.changeHP(50, true);
				player.changeLust(50);
			}
			player.refillHunger(25);
		}
		
		export const MinotaurBlood  = new Item("M.Blood", "MinoBlood", "a vial of Minotaur blood", ITEM_TYPE_CONSUMABLE);
		MinotaurBlood.description   = "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.";
		MinotaurBlood.consumeEffect = minotaurTFs;
		
	}
}

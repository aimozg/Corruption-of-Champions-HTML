/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		function canineTFs(type: number): void {
			let temp2       = 0;
			let temp3       = 0;
			const crit      = (rand(10) / 10) + 0.5;
			//Set up changes and changeLimit
			let changes     = 0;
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//Initial outputs & crit level
			switch (type) {
				case 0: //Normal
					if (crit)
						outputText("The pepper tastes particularly potent, searingly hot and spicy.");
					else
						outputText("The pepper is strangely spicy but very tasty.");
					break;
				case 1: //Oversized
					outputText("The pepper is so large and thick that you have to eat it in several large bites. It is not as spicy as the normal ones, but is delicious and flavorful.");
					break;
				case 2: //Double
					outputText("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.");
					break;
				case 3: //Black (Corruptive)
					outputText("This black pepper tastes sweet, but has a bit of a tangy aftertaste.");
					break;
				case 4: //Knotty
					outputText("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it. It's extra spicy!");
					break;
				case 5: //Bulbous
					outputText("You eat the pepper, even the two orb-like growths that have grown out from the base. It's delicious!");
					break;
			}
			player.refillHunger(15);
			//------------
			// BAD END
			//------------
			/*if (type <= 0 && crit > 1 && player.skinType == SkinType.FUR && player.faceType == FaceType.DOG && player.earType == EarType.DOG && player.lowerBody == LowerBodyType.DOG && player.tailType == TailType.DOG && rand(2) == 0 && player.findStatusAffect(StatusAffects.DogWarning) >= 0 && !player.hasPerk(PerkLib.TransformationResistance)) {
			 temp = rand(2);
			 if (temp == 0) {
			 outputText("<br><br>As you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ");
			 if (player.hasPerk(PerkLib.MarblesMilk)) outputText("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.");
			 else outputText("All you know is that there is a scent on the wind, and it is time to hunt.");
			 }
			 if (temp == 1) outputText("<br><br>You devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + player.hairColor + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.");
			 gameOver();
			 return;
			 }
			 //WARNING, overdose VERY close!
			 if (type <= 0 && player.skinType == SkinType.FUR && player.faceType == FaceType.DOG && player.tailType == TailType.DOG && player.earType == EarType.DOG && player.lowerBody == LowerBodyType.DOG && player.findStatusAffect(StatusAffects.DogWarning) >= 0 && rand(3) == 0) {
			 outputText("<b><br><br>Eating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
			 }
			 //WARNING, overdose is close!
			 if (type <= 0 && player.skinType == SkinType.FUR && player.faceType == FaceType.DOG && player.tailType == TailType.DOG && player.earType == EarType.DOG && player.lowerBody == LowerBodyType.DOG && player.findStatusAffect(StatusAffects.DogWarning) < 0) {
			 player.createStatusAffect(StatusAffects.DogWarning, 0, 0, 0, 0);
			 outputText("<b><br><br>Eating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
			 }*/
			//------------
			// STATS CHANGES
			//------------
			if (type == 3) {
				player.dynStats(["lib", 2 + rand(4)], ["lust", 5 + rand(5)], ["cor", 2 + rand(4)]);
				outputText("<br><br>You feel yourself relaxing as gentle warmth spreads through your body. Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.");
				if (player.cor < 50) outputText(" You shake your head, blushing hotly. Where did that thought come from?");
			}
			if (player.str < 50 && rand(3) == 0) {
				player.dynStats("str", (crit));
				if (crit > 1) outputText("<br><br>Your muscles ripple and grow, bulging outwards.");
				else outputText("<br><br>Your muscles feel more toned.");
				changes++;
			}
			if (player.spe < 30 && rand(3) == 0 && changes < changeLimit) {
				player.dynStats("spe", (crit));
				if (crit > 1) outputText("<br><br>You find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.");
				else outputText("<br><br>You feel quicker.");
				changes++;
			}
			if (player.inte > 30 && rand(3) == 0 && changes < changeLimit && type != 3) {
				player.dynStats("inte", (-1 * crit));
				outputText("<br><br>You feel ");
				if (crit > 1) outputText("MUCH ");
				outputText("dumber.");
				changes++;
			}
			//------------
			// NORMALIZATION
			//------------
			//-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
			if (changes < changeLimit && player.armType == ArmType.HARPY && rand(4) == 0) {
				outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating. The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
				player.armType = ArmType.HUMAN;
				changes++;
			}
			//-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
			if (changes < changeLimit && player.armType == ArmType.SPIDER && rand(4) == 0) {
				outputText("<br><br>You scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch. Glancing down in irritation, you discover that your arms' chitinous covering is flaking away. The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
				player.armType = ArmType.HUMAN;
				changes++;
			}
			//-Remove feathery hair (copy for equinum, canine peppers, Labova)
			if (changes < changeLimit && player.hairType == 1 && rand(4) == 0) {
				//(long):
				if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye. Before you can blow the offending down away, you realize the feather is collapsing in on itself. It continues to curl inward until all that remains is a normal strand of hair. <b>Your hair is no longer feathery!</b>");
				//(short)
				else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested. While your hand is up there, it detects a change in the texture of your feathers. They're completely disappearing, merging down into strands of regular hair. <b>Your hair is no longer feathery!</b>");
				changes++;
				player.hairType = HairType.NORMAL;
			}
			//Remove odd eyes
			if (changes < changeLimit && rand(5) == 0 && player.eyeType > EyeType.HUMAN) {
				if (player.eyeType == EyeType.BLACK_EYES_SAND_TRAP) {
					outputText("<br><br>You feel a twinge in your eyes and you blink. It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
				}
				else {
					outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you. As you steady and open your eyes, you realize something seems different. Your vision is changed somehow.");
					if (player.eyeType == EyeType.FOUR_SPIDER_EYES) outputText(" Your multiple, arachnid eyes are gone!</b>");
					outputText(" <b>You have normal, humanoid eyes again.</b>");
				}
				player.eyeType = EyeType.HUMAN;
				changes++;
			}
			//------------
			// SEXUAL TFs
			//------------
			//Double Pepper!
			//Xforms/grows dicks to make you have two dogcocks
			if (type == 2) {
				//If already doubled up, GROWTH
				if (player.countCocksOfType(CockTypesEnum.DOG) >= 2) {
					type = 1;
				}
				//If player doesnt have 2 dogdicks
				else {
					//If player has NO dogdicks
					if (player.countCocksOfType(CockTypesEnum.DOG) == 0) {
						//Dickless - grow two dogpeckers
						if (player.cockTotal() == 0) {
							player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
							player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
							outputText("<br><br>" + player.clothedOrNakedLower("A painful lump forms on your groin, nearly doubling you over as it presses against your " + player.armor.equipmentName + ". You rip open your gear and", "An erecting sensation forms in your groin. You") + " watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points. A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening. The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free. You now have two nice thick dog-cocks, with decent sized knots. Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control. ");
							player.cocks[0].knotMultiplier = 1.7;
							player.cocks[0].cockType       = CockTypesEnum.DOG;
							player.cocks[1].knotMultiplier = 1.7;
							player.cocks[1].cockType       = CockTypesEnum.DOG;
							player.changeLust(50, true);
						}
						//1 dick - grow 1 and convert 1
						else if (player.cockTotal() == 1) {
							outputText("<br><br>Your " + player.cockDescript(0) + " vibrates, the veins clearly visible as it reddens and distorts. The head narrows into a pointed tip while a gradually widening bulge forms around the base. Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath. ");
							player.cocks[0].cockType       = CockTypesEnum.DOG;
							player.cocks[0].knotMultiplier = 1.5;
							outputText("You feel something slippery wiggling inside the new sheath, and another red point peeks out. In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free. The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal. ");
							player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
							player.cocks[1].knotMultiplier = 1.7;
							player.cocks[1].cockType       = CockTypesEnum.DOG;
							player.dynStats("lib", 2);
							player.changeLust(50, true);
						}
						//2 dicks+ - convert first 2 to doggie-dom
						else {
							outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(0) + " and " + player.cockDescript(1) + " both warp and twist, becoming red and pointed, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
							player.cocks[0].cockType       = CockTypesEnum.DOG;
							player.cocks[1].cockType       = CockTypesEnum.DOG;
							player.cocks[0].knotMultiplier = 1.4;
							player.cocks[1].knotMultiplier = 1.4;
							player.dynStats("lib", 2);
							player.changeLust(50, true);
						}
					}
					//If player has 1 dogdicks
					else {
						//if player has 1 total
						if (player.cockTotal() == 1) {
							outputText("<br><br>You feel something slippery wiggling inside your sheath, and another red point peeks out. In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free. The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal. ");
							player.createCock(7 + rand(7), 1.5 + rand(10) / 10);
							player.cocks[1].cockType       = CockTypesEnum.DOG;
							player.cocks[1].knotMultiplier = 1.4;
							player.dynStats("lib", 2);
							player.changeLust(50, true);
						}
						//if player has more
						if (player.cockTotal() >= 1) {
							//if first dick is already doggi'ed
							if (player.cocks[0].cockType == CockTypesEnum.DOG) {
								outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(1) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
								player.cocks[1].cockType       = CockTypesEnum.DOG;
								player.cocks[1].knotMultiplier = 1.4;
							}
							//first dick is not dog
							else {
								outputText("<br><br>Your crotch twitches, and you pull open your " + player.armor.equipmentName + " to get a better look. You watch in horror and arousal as your " + player.cockDescript(0) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base. When it stops you have two dog-cocks and an animal-like sheath. The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed. ");
								player.cocks[0].cockType       = CockTypesEnum.DOG;
								player.cocks[0].knotMultiplier = 1.4;
							}
							player.dynStats("lib", 2);
							player.changeLust(50, true);
						}
					}
				}
				player.genderCheck();
			}
			//Knotty knot pepper!
			if (type == 4) {
				//Cocks only!
				if (player.cockTotal() > 0) {
					//biggify knots
					if (player.countCocksOfType(CockTypesEnum.DOG) > 0) {
						let temp = 0;
						//set temp2 to first dogdick for initialization
						while (temp < player.cocks.length) {
							if (player.cocks[temp].cockType == CockTypesEnum.DOG) {
								temp2 = temp;
								break;
							}
							else temp++;
						}
						//Reset temp for nex tcheck
						temp = player.cocks.length;
						//Find smallest knot
						while (temp > 0) {
							temp--;
							if (player.cocks[temp].cockType == CockTypesEnum.DOG && player.cocks[temp].knotMultiplier < player.cocks[temp2].knotMultiplier) temp2 = temp;
						}
						//Have smallest knotted cock selected.
						temp3 = (rand(2) + 5) / 20 * crit;
						if (player.cocks[temp2].knotMultiplier >= 1.5) temp3 /= 2;
						if (player.cocks[temp2].knotMultiplier >= 1.75) temp3 /= 2;
						if (player.cocks[temp2].knotMultiplier >= 2) temp3 /= 5;
						player.cocks[temp2].knotMultiplier += (temp3);
						outputText("<br><br>");
						if (temp3 < .06) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " feels unusually tight in your sheath as your knot grows.");
						if (temp3 >= .06 && temp3 <= .12) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.");
						if (temp3 > .12) outputText("Your " + Appearance.cockNoun(CockTypesEnum.DOG) + " surges free of your sheath, swelling thicker with each passing second. Your knot bulges out at the base, growing far beyond normal.");
						player.dynStats(["sens", .5], ["lust", 5 * crit]);
					}
					//Grow dogdick with big knot
					else {
						outputText("<br><br>Your " + player.cockDescript(0) + " twitches, reshaping itself. The crown tapers down to a point while the base begins swelling. It isn't painful in the slightest, actually kind of pleasant. Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest. You touch and shiver with pleasure, oozing pre-cum.");
						player.cocks[0].cockType       = CockTypesEnum.DOG;
						player.cocks[0].knotMultiplier = 2.1;
					}
				}
				//You wasted knot pepper!
				else outputText("<br><br>A slight wave of nausea passes through you. It seems this pepper does not quite agree with your body.");
			}
			//GROW BALLS
			if (type == 5) {
				if (player.balls <= 1) {
					outputText("<br><br>A spike of pain doubles you up, nearly making you vomit. You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you. You look down and realize you now have a small sack, complete with two relatively small balls.");
					player.balls    = 2;
					player.ballSize = 1;
					player.dynStats(["lib", 2], ["lust", -10]);
				}
				else {
					//Makes your balls biggah!
					player.ballSize++;
					//They grow slower as they get bigger...
					if (player.ballSize > 10) player.ballSize -= .5;
					//Texts
					if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.");
					if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ". Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.");
					player.dynStats(["lib", 1], ["lust", 3]);
				}
			}
			//Sexual Stuff Now
			//------------------
			//Man-Parts
			//3 Changes,
			//1. Cock Xform
			//2. Knot Size++
			//3. cumMultiplier++ (to max of 1.5)
			if (player.cocks.length > 0) {
				let temp: number;
				//Grow knot on smallest knotted dog cock
				if (type != 4 && player.countCocksOfType(CockTypesEnum.DOG) > 0 && ((changes < changeLimit && rand(1.4) == 0) || type == 1)) {
					temp = 0;
					//set temp2 to first dogdick for initialization
					while (temp < player.cocks.length) {
						if (player.cocks[temp].cockType == CockTypesEnum.DOG) {
							temp2 = temp;
							break;
						}
						else temp++;
					}
					//Reset temp for nex tcheck
					temp = player.cocks.length;
					//Find smallest knot
					while (temp > 0) {
						temp--;
						if (player.cocks[temp].cockType == CockTypesEnum.DOG && player.cocks[temp].knotMultiplier < player.cocks[temp2].knotMultiplier) temp2 = temp;
					}
					//Have smallest knotted cock selected.
					temp3 = (rand(2) + 1) / 20 * crit;
					if (player.cocks[temp2].knotMultiplier >= 1.5) temp3 /= 2;
					if (player.cocks[temp2].knotMultiplier >= 1.75) temp3 /= 2;
					if (player.cocks[temp2].knotMultiplier >= 2) temp3 /= 5;
					player.cocks[temp2].knotMultiplier += (temp3);
					if (temp3 < .06) outputText("<br><br>Your " + player.cockDescript(temp2) + " feels unusually tight in your sheath as your knot grows.");
					if (temp3 >= .06 && temp3 <= .12) outputText("<br><br>Your " + player.cockDescript(temp2) + " pops free of your sheath, thickening nicely into a bigger knot.");
					if (temp3 > .12) outputText("<br><br>Your " + player.cockDescript(temp2) + " surges free of your sheath, swelling thicker with each passing second. Your knot bulges out at the base, growing far beyond normal.");
					player.dynStats(["sens", .5], ["lust", 5 * crit]);
					changes++;
				}
				//Cock Xform if player has free cocks.
				if (player.countCocksOfType(CockTypesEnum.DOG) < player.cocks.length && ((changes < changeLimit && rand(1.6)) || type == 1) == 0) {
					//Select first human cock
					let temp = player.cocks.length;
					temp2    = 0;
					while (temp > 0 && temp2 == 0) {
						temp--;
						//Store cock index if not a dogCock and exit loop.
						if (player.cocks[temp].cockType != CockTypesEnum.DOG) {
							temp3 = temp;
							//kicking out of tah loop!
							temp2 = 1000;
						}
					}
					//Talk about it
					//Hooooman
					if (player.cocks[temp3].cockType == CockTypesEnum.HUMAN) {
						outputText("<br><br>Your " + player.cockDescript(temp3) + " clenches painfully, becoming achingly, throbbingly erect. A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath. You shudder as the crown of your " + player.cockDescript(temp3) + " reshapes into a point, the sensations nearly too much for you. You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockTypesEnum.DOG) + " much thicker than it ever was before. <b>You now have a dog-cock.</b>");
						player.dynStats(["sens", 10], ["lust", 5 * crit]);
					}
					//Horse
					if (player.cocks[temp3].cockType == CockTypesEnum.HORSE) {
						outputText("<br><br>Your " + Appearance.cockNoun(CockTypesEnum.HORSE) + " shrinks, the extra equine length seeming to shift into girth. The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath. <b>You now have a dog-cock.</b>");
						//Tweak length/thickness.
						if (player.cocks[temp3].cockLength > 6) player.cocks[temp3].cockLength -= 2;
						else player.cocks[temp3].cockLength -= .5;
						player.cocks[temp3].cockThickness += .5;
						
						player.dynStats(["sens", 4], ["lust", 5 * crit]);
					}
					//Tentacular Tuesday!
					if (player.cocks[temp3].cockType == CockTypesEnum.TENTACLE) {
						outputText("<br><br>Your " + player.cockDescript(temp3) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot. Your skin bunches painfully around the base, forming into a sheath. <b>You now have a dog-cock.</b>");
						player.dynStats(["sens", 4], ["lust", 5 * crit]);
					}
					//Misc
					if (player.cocks[temp3].cockType > 4) { //TODO Was cockType.Index. Forgot what replaces that.
						outputText("<br><br>Your " + player.cockDescript(temp3) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base. <b>You now have a dog-cock.</b>");
						player.dynStats(["sens", 4], ["lust", 5 * crit]);
					}
					temp = 0;
					//Demon
					if (player.cocks[temp3].cockType == CockTypesEnum.DEMON) {
						outputText("<br><br>Your " + player.cockDescript(temp3) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.");
						player.dynStats(["sens", 1], ["lust", 2 * crit]);
						temp = 1;
					}
					//Xform it!
					player.cocks[temp3].cockType       = CockTypesEnum.DOG;
					player.cocks[temp3].knotMultiplier = 1.1;
					player.cocks[temp3].thickenCock(2);
					if (temp == 1) {
						player.cocks[temp3].cockType = CockTypesEnum.DEMON;
					}
					changes++;
					
				}
				//Cum Multiplier Xform
				if (player.cumMultiplier < 2 && rand(2) == 0 && changes < changeLimit) {
					temp = 1.5;
					//Lots of cum raises cum multiplier cap to 2 instead of 1.5
					if (player.hasPerk(PerkLib.MessyOrgasms)) temp = 2;
					if (temp < player.cumMultiplier + .05 * crit) {
						changes--;
					}
					else {
						player.cumMultiplier += .05 * crit;
						//Flavor text
						if (player.balls == 0) outputText("<br><br>You feel a churning inside your gut as something inside you changes.");
						if (player.balls > 0) outputText("<br><br>You feel a churning in your " + player.ballsDescriptLight() + ". It quickly settles, leaving them feeling somewhat more dense.");
						if (crit > 1) outputText(" A bit of milky pre dribbles from your " + player.multiCockDescriptLight() + ", pushed out by the change.");
					}
					changes++;
				}
				//Oversized pepper
				if (type == 1) {
					//GET LONGER
					//single cock
					if (player.cocks.length == 1) {
						temp2 = player.cocks[0].increaseCock(rand(4) + 3);
						temp  = 0;
						player.dynStats(["sens", 1], ["lust", 10]);
					}
					//Multicock
					else {
						//Find smallest cock
						//Temp2 = smallness size
						//temp = current smallest
						temp3 = player.cocks.length;
						temp  = 0;
						while (temp3 > 0) {
							temp3--;
							//If current cock is smaller than saved, switch values.
							if (player.cocks[temp].cockLength > player.cocks[temp3].cockLength) {
								temp2 = player.cocks[temp3].cockLength;
								temp  = temp3;
							}
						}
						//Grow smallest cock!
						//temp2 changes to growth amount
						temp2 = player.cocks[temp].increaseCock(rand(4) + 3);
						player.dynStats(["sens", 1], ["lust", 10]);
						if (player.cocks[temp].cockThickness <= 2) player.cocks[temp].thickenCock(1);
					}
					if (temp2 > 2) outputText("<br><br>Your " + player.cockDescript(temp) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer. Thick pre forms at the pointed tip, drawn out from the pleasure of the change.");
					if (temp2 > 1 && temp2 <= 2) outputText("<br><br>Aching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out. A dollop of pre beads on the head of your enlarged " + player.cockDescript(temp) + " from the pleasure of the growth.");
					if (temp2 <= 1) outputText("<br><br>A slight pressure builds and releases as your " + player.cockDescript(temp) + " pushes a bit further out of your crotch.");
				}
			}
			//Female Stuff
			//Multiboobages
			if (player.breastRows.length > 0) {
				//if bigger than A cup
				if (player.breastRows[0].breastRating > 0 && player.vaginas.length > 0) {
					//Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
					if (player.breastRows.length < 3 && rand(2) == 0 && changes < changeLimit) {
						player.createBreastRow();
						//Store temp to the index of the newest row
						let temp = player.breastRows.length - 1;
						//Breasts are too small to grow a new row, so they get bigger first
						//But ONLY if player has a vagina (dont want dudes weirded out)
						if (player.vaginas.length > 0 && player.breastRows[0].breastRating <= player.breastRows.length) {
							outputText("<br><br>Your " + player.breastDescript(0) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ");
							player.breastRows[0].breastRating += 2;
							outputText(player.breastCup(0) + " size. But it doesn't stop there, you feel a tightness beginning lower on your torso...");
							changes++;
						}
						//Had 1 row to start
						if (player.breastRows.length == 2) {
							//1 size below primary breast row!
							player.breastRows[temp].breastRating = player.breastRows[0].breastRating - 1;
							if (player.breastRows[0].breastRating - 1 == 0) outputText("<br><br>A second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.");
							else outputText("<br><br>A second set of breasts bulges forth under your current pair, stopping as they reach " + player.breastCup(temp) + "s.");
							outputText(" A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
							player.dynStats(["sens", 6], ["lust", 5]);
							changes++;
						}
						//Many breast Rows - requires larger primary tits...
						if (player.breastRows.length > 2 && player.breastRows[0].breastRating > player.breastRows.length) {
							player.dynStats(["sens", 6], ["lust", 5]);
							//New row's size = the size of the row above -1
							player.breastRows[temp].breastRating = player.breastRows[temp - 1].breastRating - 1;
							//If second row are super small but primary row is huge it could go negative.
							//This corrects that problem.
							if (player.breastRows[temp].breastRating < 0) player.breastRows[temp].breastRating = 0;
							if (player.breastRows[temp - 1].breastRating < 0) player.breastRows[temp - 1].breastRating = 0;
							if (player.breastRows[temp].breastRating == 0) outputText("<br><br>Your abdomen tingles and twitches as a new row of breasts sprouts below the others. Your new breasts stay flat and masculine, not growing any larger.");
							else outputText("<br><br>Your abdomen tingles and twitches as a new row of " + player.breastCup(temp) + " " + player.breastDescript(temp) + " sprouts below your others.");
							outputText(" A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
							changes++;
						}
						//Extra sensitive if crit
						if (crit > 1) {
							if (crit > 2) {
								outputText(" You heft your new chest experimentally, exploring the new flesh with tender touches. Your eyes nearly roll back in your head from the intense feelings.");
								player.dynStats(["sens", 6], ["lust", 15], ["cor", 0])
							}
							else {
								outputText(" You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure. You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.");
								player.dynStats(["sens", 3], ["lust", 10]);
							}
						}
						
					}
					//If already has max doggie breasts!
					else if (rand(2) == 0) {
						//Check for size mismatches, and move closer to spec!
						let temp   = player.breastRows.length;
						temp2      = 0;
						let evened = false;
						//Check each row, and if the row above or below it is
						while (temp > 1 && temp2 == 0) {
							temp--;
							//Gimme a sec
							if (player.breastRows[temp].breastRating + 1 < player.breastRows[temp - 1].breastRating) {
								if (!evened) {
									evened = true;
									outputText("<br>");
								}
								outputText("<br>Your ");
								if (temp == 0) outputText("first ");
								if (temp == 1) outputText("second ");
								if (temp == 2) outputText("third ");
								if (temp == 3) outputText("fourth ");
								if (temp == 4) outputText("fifth ");
								if (temp > 4) outputText("");
								outputText("row of " + player.breastDescript(temp) + " grows larger, as if jealous of the jiggling flesh above.");
								temp2 = (player.breastRows[temp - 1].breastRating) - player.breastRows[temp].breastRating - 1;
								if (temp2 > 5) temp2 = 5;
								if (temp2 < 1) temp2 = 1;
								player.breastRows[temp].breastRating += temp2;
							}
						}
					}
				}
			}
			//Grow tits if have NO breasts/nipples AT ALL
			else if (rand(2) == 0 && changes < changeLimit) {
				outputText("<br><br>Your chest tingles uncomfortably as your center of balance shifts. <b>You now have a pair of B-cup breasts.</b>");
				outputText(" A sensitive nub grows on the summit of each tit, becoming a new nipple.");
				player.createBreastRow();
				player.breastRows[0].breastRating = 2;
				player.breastRows[0].breasts      = 2;
				player.dynStats(["sens", 4], ["lust", 6]);
				changes++;
			}
			//Go into heat
			if (rand(2) == 0 && changes < changeLimit) {
				if (player.goIntoHeat(true)) {
					changes++;
				}
			}
			//------------
			// BODY TFs
			//------------
			if (changes < changeLimit && player.dogScore() >= 3 && rand(4) == 0) {
				changes++;
				outputText("<br><br>Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ");
				//cawk fantasies
				if (player.gender <= 1 || (player.gender == 3 && rand(2) == 0)) {
					outputText("bounding through the woods, hunting with your master. Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you. You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.");
					player.dynStats("lust", 5 + player.lib / 20);
					//break1
					if (player.cor < 33 || !player.hasCock()) outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
					else {
						outputText(" Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent. Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + Appearance.cockNoun(CockTypesEnum.DOG) + " growing harder as you near your quarry. You burst through a bush, spotting a white-furred female. She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + Appearance.cockNoun(CockTypesEnum.DOG) + ".");
						player.dynStats("lust", 5 + player.lib / 20);
						//Break 2
						if (player.cor < 66) outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
						else {
							outputText(" Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.");
							player.dynStats("lust", 5 + player.lib / 20);
							//break3
							if (player.cor < 80) {
								if (player.vaginas.length > 0) outputText("<br>You reluctantly pry your hand from your aching " + player.vaginaDescript(0) + " as you drag yourself out of your fantasy.");
								else outputText("<br>You reluctantly pry your hand from your aching " + player.cockDescript(0) + " as you drag yourself out of your fantasy.");
							}
							else {
								outputText(" At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal. The scents of your mating reach a peak as the velvet vice around your " + Appearance.cockNoun(CockTypesEnum.DOG) + " quivers in the most indescribably pleasant way. You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex. Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge. Your " + player.legs() + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
								player.dynStats("lust", 5 + player.lib / 20);
							}
						}
					}
				}
				//Pure female fantasies
				else if (player.hasVagina()) {
					outputText("wagging your dripping " + player.vaginaDescript(0) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.");
					player.dynStats("lust", 5 + player.lib / 20);
					//BREAK 1
					if (player.cor < 33) {
						outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
					}
					else {
						outputText(" In moments they begin their advance, plunging their pointed beast-dicks into you, one after another. You yip and howl with pleasure as each one takes his turn knotting you.");
						player.dynStats("lust", 5 + player.lib / 20);
						//BREAK 2
						if (player.cor <= 66) {
							outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
						}
						else {
							outputText(" The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot. You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.");
							player.dynStats("lust", 5 + player.lib / 20);
							//break3
							if (player.cor < 80) {
								outputText("<br>You reluctantly pry your hand from your aching " + player.vaginaDescript(0) + " as you drag yourself out of your fantasy.");
							}
							else {
								outputText(" You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers. With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
								player.dynStats("lust", 5 + player.lib / 20);
							}
						}
					}
				}
				else {
					outputText("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
					player.dynStats("lust", 5 + player.lib / 20);
					//BREAK 1
					if (player.cor < 33) {
						outputText("<br>You shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
					}
					else {
						outputText(" In moments they begin their advance, plunging their pointed beast-dicks into you, one after another. You yip and howl with pleasure as each one takes his turn knotting you.");
						player.dynStats("lust", 5 + player.lib / 20);
						//BREAK 2
						if (player.cor <= 66) {
							outputText("<br>You blink a few times, the fantasy fading as you master yourself. That daydream was so strange, yet so hot.");
						}
						else {
							outputText(" The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot. You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.");
							player.dynStats("lust", 5 + player.lib / 20);
							//break3
							if (player.cor < 80) {
								outputText("<br>You reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.");
							}
							else {
								outputText(" You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters. With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
								player.dynStats("lust", 5 + player.lib / 20);
							}
						}
					}
				}
			}
			//------------
			// BODY TFs
			//------------
			//Master Furry Appearance Order:
			//Tail -> Ears -> Paws -> Fur -> Face
			//Dog-face requires fur & paws  Should be last morph to take place
			if (rand(5) == 0 && changes < changeLimit &&
				player.faceType != FaceType.DOG && player.skinType == SkinType.FUR &&
				player.lowerBody == LowerBodyType.DOG) {
				if (player.faceType == FaceType.HORSE) outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your horse-like features rearrange to take on many canine aspects.</b>");
				else outputText("<br><br>Your face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>");
				player.faceType = FaceType.DOG;
				changes++;
			}
			if (type == 3 && player.hairColor != "midnight black") {
				if (player.skinType == SkinType.FUR) outputText("<b><br><br>Your fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>");
				else outputText("<b><br><br>Your " + player.skinDesc + " itches like crazy as fur grows out from it, coating your body. It's incredibly dense and black as the middle of a moonless night.</b>");
				player.skinType  = SkinType.FUR;
				player.skinAdj   = "thick";
				player.skinDesc  = "fur";
				player.hairColor = "midnight black";
				player.furColor  = player.hairColor;
			}
			//Become furred - requires paws and tail
			if (rand(4) == 0 && changes < changeLimit && player.lowerBody == LowerBodyType.DOG && player.tailType == TailType.DOG && player.skinType != SkinType.FUR) {
				if (player.skinType == SkinType.PLAIN) outputText("<br><br>Your skin itches intensely. You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur. <b>You are now covered in " + player.furColor + " fur from head to toe.</b>");
				if (player.skinType == SkinType.SCALES) outputText("<br><br>Your scales itch incessantly. You scratch, feeling them flake off to reveal a coat of " + player.furColor + " fur growing out from below! <b>You are now covered in " + player.furColor + " fur from head to toe.</b>");
				player.skinType = SkinType.FUR;
				player.skinDesc = "fur";
				player.setFurColor(["brown", "chocolate", "auburn", "caramel", "orange", "black", "dark gray", "gray", "light gray", "silver", "white", "orange and white", "brown and white", "black and white"]);
				changes++;
			}
			//Change to paws - requires tail and ears
			if (rand(3) == 0 && player.lowerBody != LowerBodyType.DOG && player.tailType == TailType.DOG && player.earType == EarType.DOG && changes < changeLimit) {
				//Feet -> paws
				if (player.lowerBody == LowerBodyType.HUMAN) outputText("<br><br>You scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.");
				//Hooves -> Paws
				else if (player.lowerBody == LowerBodyType.HOOFED) outputText("<br><br>You feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred paws.");
				else outputText("<br><br>Your lower body is wracked by pain! Once it passes, you discover that you're standing on fur-covered paws! <b>You now have paws</b>.");
				player.lowerBody = LowerBodyType.DOG;
				player.legCount  = 2;
				changes++;
			}
			//Change to dog-ears!  Requires dog-tail
			if (rand(2) == 0 && player.earType != EarType.DOG && player.tailType == TailType.DOG && changes < changeLimit) {
				if (player.earType == -1) outputText("<br><br>Two painful nubs begin sprouting from your head, growing and opening into canine ears. ");
				if (player.earType == EarType.HUMAN) outputText("<br><br>The skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate, becoming canine in nature. ");
				if (player.earType == EarType.HORSE) outputText("<br><br>Your equine ears twist as they transform into canine versions. ");
				if (player.earType > EarType.DOG) outputText("<br><br>Your ears transform, becoming more canine in appearance. ");
				player.earType = EarType.DOG;
				outputText("<b>You now have dog ears.</b>");
				changes++;
			}
			//Grow tail if not dog-tailed
			if (rand(3) == 0 && changes < changeLimit && player.tailType != TailType.DOG) {
				if (player.tailType == TailType.NONE) outputText("<br><br>A pressure builds on your backside. You feel under your clothes and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. ");
				if (player.tailType == TailType.HORSE) outputText("<br><br>You feel a tightness in your rump, matched by the tightness with which the strands of your tail clump together. In seconds they fuse into a single tail, rapidly sprouting thick fur. ");
				if (player.tailType == TailType.DEMONIC) outputText("<br><br>The tip of your tail feels strange. As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail. ");
				//Generic message for now
				if (player.tailType >= TailType.COW) outputText("<br><br>You feel your backside shift and change, flesh molding and displacing into a long puffy tail! ");
				changes++;
				player.tailType = TailType.DOG;
				outputText("<b>You now have a dog-tail.</b>");
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			if (player.skinType == SkinType.FUR && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>You become more... solid. Sinewy. A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace. You imagine that must have felt something like this.");
				player.dynStats(["tou", 4], ["sens", -3]);
				changes++;
			}
			//If no changes yay
			if (changes == 0) {
				outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
				player.changeHP(20, true);
				player.dynStats("lust", 3);
			}
			gameFlags[TIMES_TRANSFORMED]++;
		}
		
		export const CaninePepper  = new Item("CanineP", "Canine Pp", "a canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepper.description   = "The pepper is shiny and red, bulbous at the base but long and narrow at the tip. It smells spicy.";
		CaninePepper.consumeEffect = createCallBackFunction(canineTFs, 0);
		
		export const CaninePepperLarge  = new Item("Large P", "Large Pp", "an overly large canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperLarge.description   = "This large canine pepper is much bigger than any normal peppers you've seen.";
		CaninePepperLarge.consumeEffect = createCallBackFunction(canineTFs, 1);
		CaninePepperLarge.value         = 10;
		
		export const CaninePepperDouble  = new Item("DoubleP", "Double Pp", "a double canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperDouble.description   = "This canine pepper is actually two that have grown together due to some freak coincidence.";
		CaninePepperDouble.consumeEffect = createCallBackFunction(canineTFs, 2);
		CaninePepperDouble.value         = 10;
		
		export const CaninePepperBlack  = new Item("Black P", "Black Pp", "a solid black canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperBlack.description   = "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...";
		CaninePepperBlack.consumeEffect = createCallBackFunction(canineTFs, 3);
		CaninePepperBlack.value         = 10;
		
		export const CaninePepperKnotty  = new Item("KnottyP", "Knotty Pp", "a knotty canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperKnotty.description   = "This knotted pepper is very swollen, with a massive, distended knot near the base.";
		CaninePepperKnotty.consumeEffect = createCallBackFunction(canineTFs, 4);
		CaninePepperKnotty.value         = 10;
		
		export const CaninePepperBulby  = new Item("Bulby P", "Bulby Pp", "a bulbous canine pepper", ITEM_TYPE_CONSUMABLE);
		CaninePepperBulby.description   = "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.";
		CaninePepperBulby.consumeEffect = createCallBackFunction(canineTFs, 5);
		CaninePepperBulby.value         = 10;
	}
}
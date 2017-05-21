/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		function cowTFs(tainted: boolean, enhanced: boolean) {
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
			if (enhanced) changeLimit += 2;
			//Temporary storage
			let temp  = 0;
			let temp2 = 0;
			let temp3 = 0;
			
			//ItemUseText:
			clearOutput();
			outputText("You drink the ");
			if (enhanced) outputText("Pro Bova");
			else outputText("La Bova");
			outputText(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.");
			//Possible Item Effects:
			//STATS
			//Increase player str:
			if (changes < changeLimit && rand(3) == 0) {
				temp = 60 - player.str;
				if (temp <= 0) temp = 0;
				else {
					if (rand(2) == 0) outputText("<br><br>There is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.");
					else outputText("<br><br>You feel your muscles tighten and clench as they become slightly more pronounced.");
					player.dynStats("str", temp / 10);
					changes++;
				}
			}
			//Increase player tou:
			if (changes < changeLimit && rand(3) == 0) {
				temp = 60 - player.tou;
				if (temp <= 0) temp = 0;
				else {
					if (rand(2) == 0) outputText("<br><br>You feel your insides toughening up; it feels like you could stand up to almost any blow.");
					else outputText("<br><br>Your bones and joints feel sore for a moment, and before long you realize they've gotten more durable.");
					player.dynStats("tou", temp / 10);
					changes++;
					
				}
			}
			//Decrease player spd if it is over 30:
			if (changes < changeLimit && rand(3) == 0) {
				if (player.spe > 30) {
					outputText("<br><br>The body mass you've gained is making your movements more sluggish.");
					changes++;
					temp = (player.spe - 30) / 10;
					player.dynStats("spe", -temp);
				}
			}
			//Increase Corr, up to a max of 50.
			if (tainted) {
				temp = 50 - player.cor;
				if (temp < 0) temp = 0;
				player.dynStats("cor", temp / 10);
			}
			//Sex bits - Duderiffic
			if (player.cocks.length > 0 && rand(2) == 0 && !gameFlags[HYPER_HAPPY]) {
				//If the player has at least one dick, decrease the size of each slightly,
				outputText("<br><br>");
				temp  = 0;
				temp2 = player.cocks.length;
				temp3 = 0;
				//Find biggest cock
				while (temp2 > 0) {
					temp2--;
					if (player.cocks[temp].cockLength <= player.cocks[temp2].cockLength) temp = temp2;
				}
				//Shrink said cock
				if (player.cocks[temp].cockLength < 6 && player.cocks[temp].cockLength >= 2.9) {
					player.cocks[temp].cockLength -= .5;
					temp3 -= .5;
				}
				temp3 += player.cocks[temp].increaseCock((rand(3) + 1) * -1);
				player.lengthChange(temp3, 1);
				if (player.cocks[temp].cockLength < 2) {
					outputText("  ");
					if (player.cockTotal() == 1 && !player.hasVagina()) {
						outputText("Your " + player.cockDescript(0) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.");
						if (player.balls > 0) outputText("  At the same time, your " + player.ballsDescriptLight() + " fall victim to the same sensation; eagerly swallowed whole by your crotch.");
						outputText("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>");
						player.balls    = 0;
						player.ballSize = 1;
						player.createVagina();
						player.clitLength = .25;
						player.removeCock(0, 1);
					}
					else {
						player.removeCock(1);
						player.genderCheck();
					}
				}
				//if the last of the player's dicks are eliminated this way, they gain a virgin vagina;
				if (player.cocks.length == 0 && !player.hasVagina()) {
					player.createVagina();
					player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_TIGHT;
					player.vaginas[0].vaginalWetness   = VAGINA_WETNESS_NORMAL;
					player.vaginas[0].virgin           = true;
					player.clitLength                  = .25;
					outputText("<br><br>An itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + player.vaginaDescript(0) + "</b>!");
					
					changes++;
					player.genderCheck();
					player.changeLust(10);
				}
			}
			//Sex bits - girly
			let boobsGrew = false;
			//Increase player's breast size, if they are HH or bigger
			//do not increase size, but do the other actions:
			if (((tainted && player.biggestTitSize() <= 11) || (!tainted && player.biggestTitSize() <= 5)) && changes < changeLimit && (rand(3) == 0 || enhanced)) {
				if (rand(2) == 0) outputText("<br><br>Your " + player.breastDescript(0) + " tingle for a moment before becoming larger.");
				else outputText("<br><br>You feel a little weight added to your chest as your " + player.breastDescript(0) + " seem to inflate and settle in a larger size.");
				player.growTits(1 + rand(3), 1, false, 3);
				changes++;
				player.dynStats("sens", .5);
				boobsGrew = true;
			}
			//Remove feathery hair
			if (changes < changeLimit && player.hairType == HairType.FEATHER && rand(4) == 0) {
				//(long):
				if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal strand of hair.  <b>Your hair is no longer feathery!</b>");
				//(short)
				else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into strands of regular hair.  <b>Your hair is no longer feathery!</b>");
				player.hairType = HairType.NORMAL;
				changes++;
			}
			//If breasts are D or bigger and are not lactating, they also start lactating:
			if (player.biggestTitSize() >= 4 && player.breastRows[0].lactationMultiplier < 1 && changes < changeLimit && (rand(3) == 0 || boobsGrew || enhanced)) {
				outputText("<br><br>You gasp as your " + player.breastDescript(0) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + player.breastDescript(0) + "; <b> you are now lactating</b>.");
				player.breastRows[0].lactationMultiplier = 1.25;
				changes++;
				player.dynStats("sens", .5);
			}
			//Quad nipples and other 'special enhanced things.
			if (enhanced) {
				//QUAD DAMAGE!
				if (player.breastRows[0].nipplesPerBreast == 1) {
					changes++;
					player.breastRows[0].nipplesPerBreast = 4;
					outputText("<br><br>Your " + player.nippleDescript(0) + "s tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>");
					if (player.breastRows.length >= 2 && player.breastRows[1].nipplesPerBreast == 1) {
						outputText("A moment later your second row of " + player.breastDescript(1) + " does the same.  <b>You have sixteen nipples now!</b>");
						player.breastRows[1].nipplesPerBreast = 4;
					}
					if (player.breastRows.length >= 3 && player.breastRows[2].nipplesPerBreast == 1) {
						outputText("Finally, your ");
						if (player.bRows() == 3) outputText("third row of " + player.breastDescript(2) + " mutates along with its sisters, sprouting into a wonderland of nipples.");
						else if (player.bRows() >= 4) {
							outputText("everything from the third row down mutates, sprouting into a wonderland of nipples.");
							player.breastRows[3].nipplesPerBreast = 4;
							if (player.bRows() >= 5) player.breastRows[4].nipplesPerBreast = 4;
							if (player.bRows() >= 6) player.breastRows[5].nipplesPerBreast = 4;
							if (player.bRows() >= 7) player.breastRows[6].nipplesPerBreast = 4;
							if (player.bRows() >= 8) player.breastRows[7].nipplesPerBreast = 4;
							if (player.bRows() >= 9) player.breastRows[8].nipplesPerBreast = 4;
						}
						player.breastRows[2].nipplesPerBreast = 4;
						outputText("  <b>You have a total of " + num2Text(player.totalNipples()) + " nipples.</b>");
					}
				}
				//QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
				else if (player.breastRows.length > 1 && player.breastRows[1].nipplesPerBreast == 1) {
					if (player.breastRows[1].nipplesPerBreast == 1) {
						outputText("<br><br>Your second row of " + player.breastDescript(1) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(1) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.");
						player.breastRows[1].nipplesPerBreast = 4;
					}
				}
				else if (player.breastRows.length > 2 && player.breastRows[2].nipplesPerBreast == 1) {
					if (player.breastRows[2].nipplesPerBreast == 1) {
						outputText("<br><br>Your third row of " + player.breastDescript(2) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(2) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.");
						player.breastRows[2].nipplesPerBreast = 4;
					}
				}
				else if (player.breastRows.length > 3 && player.breastRows[3].nipplesPerBreast == 1) {
					if (player.breastRows[3].nipplesPerBreast == 1) {
						outputText("<br><br>Your fourth row of " + player.breastDescript(3) + " tingle and itch.  You pull back your " + player.armor.equipmentName + " and watch in shock as your " + player.nippleDescript(3) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.");
						player.breastRows[3].nipplesPerBreast = 4;
					}
				}
				else if (player.biggestLactation() > 1) {
					if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start leaking milk from a massive jump in production.");
					else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.");
					player.boostLactation(2.5);
					if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
						outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.");
						player.nippleLength += .25;
						player.dynStats("sens", .5);
					}
					changes++;
				}
			}
			//If breasts are already lactating and the player is not lactating beyond a reasonable level, they start lactating more:
			else {
				if (tainted && player.breastRows[0].lactationMultiplier > 1 && player.breastRows[0].lactationMultiplier < 5 && changes < changeLimit && (rand(3) == 0 || enhanced)) {
					if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start producing more milk.");
					else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.");
					player.boostLactation(0.75);
					if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
						outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.");
						player.nippleLength += .25;
						player.dynStats("sens", .5);
					}
					changes++;
				}
				if (!tainted) {
					if (player.breastRows[0].lactationMultiplier > 1 && player.breastRows[0].lactationMultiplier < 3.2 && changes < changeLimit && rand(3) == 0) {
						if (rand(2) == 0) outputText("<br><br>A wave of pleasure passes through your chest as your " + player.breastDescript(0) + " start producing more milk.");
						else outputText("<br><br>Something shifts inside your " + player.breastDescript(0) + " and they feel fuller and riper.  You know that you've started producing more milk.");
						player.boostLactation(0.75);
						if ((player.nippleLength < 1.5 && tainted) || (!tainted && player.nippleLength < 1)) {
							outputText("  Your " + player.nippleDescript(0) + "s swell up, growing larger to accommodate your increased milk flow.");
							player.nippleLength += .25;
							player.dynStats("sens", .5);
						}
						changes++;
					}
					if ((player.breastRows[0].lactationMultiplier > 2 && player.hasStatusEffect(StatusEffects.Feeder)) || player.breastRows[0].lactationMultiplier > 5) {
						if (rand(2) == 0) outputText("<br><br>Your breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.");
						else outputText("<br><br>The insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.");
						changes++;
						player.dynStats("sens", .5);
						player.boostLactation(-1);
					}
				}
			}
			//If breasts are lactating at a fair level
			//and the player has not received this status,
			//apply an effect where the player really wants
			//to give their milk to other creatures
			//(capable of getting them addicted):
			if (!player.hasStatusEffect(StatusEffects.Feeder) && player.biggestLactation() >= 3 && rand(2) == 0 && player.biggestTitSize() >= 5 && player.cor >= 35) {
				outputText("<br><br>You start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.<br><br><b>(You have gained the 'Feeder' perk!)</b>");
				player.createStatusEffect(StatusEffects.Feeder, 0, 0, 0, 0);
				player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);
				changes++;
			}
			//UNFINISHED
			//If player has addictive quality and drinks pure version, removes addictive quality.
			//if the player has a vagina and it is tight, it loosens.
			if (player.hasVagina()) {
				if (player.vaginas[0].vaginalLooseness < VAGINA_LOOSENESS_LOOSE && changes < changeLimit && rand(2) == 0) {
					outputText("<br><br>You feel a relaxing sensation in your groin.  On further inspection you discover your " + player.vaginaDescript(0) + " has somehow relaxed, permanently loosening.");
					player.vaginas[0].vaginalLooseness++;
					//Cunt Stretched used to determine how long since last enlargement
					let s = player.findStatusEffectByType(StatusEffects.CuntStretched);
					if (!s) player.createStatusEffect(StatusEffects.CuntStretched, 0, 0, 0, 0);
					else s.value1 = 0; //Reset the timer on it to 0 when restretched.
					player.vaginas[0].vaginalLooseness++;
					changes++;
					player.changeLust(10);
				}
			}
			// Folding in Oviposition perk update code
			if (tainted && rand(5) == 0) {
				if (player.hasPerk(PerkLib.Oviposition) && player.lizardScore() < 8) {
					outputText("<br><br>Another change in your uterus ripples through your reproductive systems."
							   + "  Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
					outputText("(<b>Perk Lost: Oviposition</b>)<br>");
					player.removePerk(PerkLib.Oviposition);
				}
			}
			//General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
			//Give the player a bovine tail, same as the minotaur
			if (tainted && player.tailType != TailType.COW && changes < changeLimit && rand(3) == 0) {
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
			//Give the player bovine ears, same as the minotaur
			if (tainted && player.earType != EarType.COW && changes < changeLimit && rand(4) == 0 && player.tailType == TailType.COW) {
				outputText("<br><br>You feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
				player.earType = EarType.COW;
				changes++;
			}
			//If the player is under 7 feet in height, increase their height, similar to the minotaur
			if (((enhanced && player.tallness < 96) || player.tallness < 84) && changes < changeLimit && rand(2) == 0) {
				temp = rand(5) + 3;
				//Slow rate of growth near ceiling
				if (player.tallness > 74) temp = Math.floor(temp / 2);
				//Never 0
				if (temp == 0) temp = 1;
				//Flavor texts.  Flavored like 1950's cigarettes. Yum.
				if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
				if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
				if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
				player.tallness += temp;
				changes++;
			}
			//Give the player hoofs, if the player already has hoofs STRIP FUR
			if (tainted && player.lowerBody != LowerBodyType.HOOFED && player.earType == EarType.COW) {
				if (changes < changeLimit && rand(3) == 0) {
					changes++;
					if (player.lowerBody == LowerBodyType.HUMAN) outputText("<br><br>You stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					if (player.lowerBody == LowerBodyType.DOG) outputText("<br><br>You stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					if (player.lowerBody == LowerBodyType.NAGA) outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
					//Catch-all
					if (player.lowerBody > LowerBodyType.NAGA) outputText("<br><br>You stagger as your " + player.feet() + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
					outputText("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>");
					player.lowerBody = LowerBodyType.HOOFED;
					player.legCount  = 2;
					player.dynStats("cor", 0); // Why is this even here?
					changes++;
				}
			}
			//If the player's face is non-human, they gain a human face
			if (!enhanced && player.lowerBody == LowerBodyType.HOOFED && player.faceType != FaceType.HUMAN && changes < changeLimit && rand(4) == 0) {
				//Remove face before fur!
				outputText("<br><br>Your visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>");
				player.faceType = FaceType.HUMAN;
				changes++;
			}
			//enhanced get shitty fur
			if (enhanced && (player.skinDesc != "fur" || player.furColor != "black and white spotted")) {
				if (player.skinDesc != "fur") outputText("<br><br>Your " + player.skinDesc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>");
				else outputText("<br><br>A ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>");
				player.skinDesc  = "fur";
				player.skinAdj   = "";
				player.skinType  = SkinType.FUR;
				player.hairColor = "black and white spotted";
				player.furColor  = player.hairColor;
			}
			//if enhanced to probova give a shitty cow face
			else if (enhanced && player.faceType != FaceType.COW_MINOTAUR) {
				outputText("<br><br>Your visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>");
				player.faceType = FaceType.COW_MINOTAUR;
				changes++;
			}
			//Give the player bovine horns, or increase their size, same as the minotaur
			//New horns or expanding mino horns
			if (tainted && changes < changeLimit && rand(3) == 0 && player.faceType == FaceType.HUMAN) {
				//Get bigger or change horns
				if (player.hornType == HornType.COW_MINOTAUR || player.hornType == HornType.NONE) {
					//Get bigger if player has horns
					if (player.hornType == HornType.COW_MINOTAUR) {
						if (player.horns < 5) {
							//Fems horns don't get bigger.
							outputText("<br><br>Your small horns get a bit bigger, stopping as medium sized nubs.");
							player.horns += 1 + rand(2);
							changes++;
						}
					}
					//If no horns yet..
					if (player.hornType == HornType.NONE || player.horns == 0) {
						outputText("<br><br>With painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
						player.hornType = HornType.COW_MINOTAUR;
						player.horns    = 1;
						changes++;
					}
				}
				//TF other horns
				else if (player.horns > 0) {
					outputText("<br><br>Your horns twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.");
					player.hornType = HornType.COW_MINOTAUR;
				}
				//Not mino horns, change to cow-horns
				if (player.hornType == HornType.DEMON || player.hornType > HornType.COW_MINOTAUR) {
					outputText("<br><br>Your horns vibrate and shift as if made of clay, reforming into two small bovine nubs.");
					player.hornType = HornType.COW_MINOTAUR;
					player.horns    = 2;
					changes++;
				}
			}
			//Increase the size of the player's hips, if they are not already childbearing or larger
			if (rand(2) == 0 && player.hipRating < 15 && changes < changeLimit) {
				if (!tainted && player.hipRating < 8 || tainted) {
					outputText("<br><br>You stumble as you feel the bones in your hips grinding, expanding your hips noticeably.");
					player.hipRating += 1 + rand(4);
					changes++;
				}
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			//Increase the size of the player's ass (less likely then hips), if it is not already somewhat big
			if (rand(2) == 0 && player.buttRating < 13 && changes < changeLimit) {
				if (!tainted && player.buttRating < 8 || tainted) {
					outputText("<br><br>A sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!");
					player.buttRating += 1 + rand(2);
					changes++;
				}
			}
			//Nipples Turn Back:
			if (gameFlags[HAS_BLACK_NIPPLES] == 1 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
				changes++;
				gameFlags[HAS_BLACK_NIPPLES] = 0;
			}
			//Debugcunt
			if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
				outputText("<br><br>Something invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
				player.vaginaType(0);
				changes++;
			}
			if (rand(3) == 0) outputText(player.modFem(79, 3));
			if (rand(3) == 0) outputText(player.modThickness(70, 4));
			if (rand(5) == 0) outputText(player.modTone(10, 5));
			player.refillHunger(20);
		}
		
		export const LaBova  = new Item("LaBova", "La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", ITEM_TYPE_CONSUMABLE);
		LaBova.description   = "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.";
		LaBova.consumeEffect = () => cowTFs(true, false);
	}
}
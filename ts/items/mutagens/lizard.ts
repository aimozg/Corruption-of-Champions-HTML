/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function lizardTFs(): void {
			player.slimeFeed();
			//init variables
			let changes     = 0;
			let changeLimit = 1;
			let temp2       = 0;
			//Randomly choose affects limit
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (rand(4) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//clear screen
			clearOutput();
			outputText("You uncork the vial of fluid and drink it down.  The taste is sour, like a dry wine with an aftertaste not entirely dissimilar to alcohol.  Instead of the warmth you'd expect, it leaves your throat feeling cold and a little numb.");
			
			//Statistical changes:
			//-Reduces speed down to 50.
			if (player.spe > 50 && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>You start to feel sluggish and cold.  Lying down to bask in the sun might make you feel better.");
				player.dynStats("spe", -1);
				changes++;
			}
			//-Reduces sensitivity.
			if (player.sens > 20 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>The sensation of prickly pins and needles moves over your body, leaving your senses a little dulled in its wake.");
				player.dynStats("sens", -1);
				changes++;
			}
			//Raises libido greatly to 50, then somewhat to 75, then slowly to 100.
			if (player.lib < 100 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>A knot of fire in your gut doubles you over but passes after a few moments.  As you straighten you can feel the heat seeping into you, ");
				//(DICK)
				if (player.cocks.length > 0 && (player.gender != 3 || rand(2) == 0)) {
					outputText("filling ");
					if (player.cocks.length > 1) outputText("each of ");
					outputText("your " + player.multiCockDescriptLight() + " with the desire to breed.  You get a bit hornier when you realize your sex-drive has gotten a boost.");
				}
				//(COOCH)
				else if (player.hasVagina()) outputText("puddling in your " + player.vaginaDescript(0) + ".  An instinctive desire to mate and lay eggs spreads through you, increasing your lust and boosting your sex-drive.");
				//(TARDS)
				else outputText("puddling in your featureless crotch for a split-second before it slides into your " + player.assDescript() + ".  You want to be fucked, filled, and perhaps even gain a proper gender again.  Through the lust you realize your sex-drive has been permanently increased.");
				//+3 lib if less than 50
				if (player.lib < 50) player.dynStats("lib", 3);
				//+2 lib if less than 75
				if (player.lib < 75) player.dynStats("lib", 2);
				//+1 if above 75.
				player.dynStats("lib", 1);
				changes++;
			}
			//-Raises toughness to 70
			//(+3 to 40, +2 to 55, +1 to 70)
			if (player.tou < 70 && changes < changeLimit && rand(3) == 0) {
				//(+3)
				if (player.tou < 40) {
					outputText("<br><br>Your body and skin both thicken noticeably.  You pinch your " + player.skinDesc + " experimentally and marvel at how much tougher your hide has gotten.");
					player.dynStats("tou", 3);
				}
				//(+2)
				else if (player.tou < 55) {
					outputText("<br><br>You grin as you feel your form getting a little more solid.  It seems like your whole body is toughening up quite nicely, and by the time the sensation goes away, you feel ready to take a hit.");
					player.dynStats("tou", 2);
				}
				//(+1)
				else {
					outputText("<br><br>You snarl happily as you feel yourself getting even tougher.  It's a barely discernible difference, but you can feel your " + player.skinDesc + " getting tough enough to make you feel invincible.");
					player.dynStats("tou", 1);
				}
				changes++;
			}
			
			//Sexual Changes:
			//-Lizard dick - first one
			if (player.countCocksOfType(CockTypesEnum.LIZARD) == 0 && player.cockTotal() > 0 && changes < changeLimit && rand(4) == 0) {
				//Find the first non-lizzy dick
				for (temp2 = 0; temp2 < player.cocks.length; temp2++) {
					//Stop loopahn when dick be found
					if (player.cocks[temp2].cockType != CockTypesEnum.LIZARD) break;
				}
				outputText("<br><br>A slow tingle warms your groin.  Before it can progress any further, you yank back your " + player.armor.equipmentName + " to investigate.  Your " + player.cockDescript(temp2) + " is changing!  It ripples loosely from ");
				if (player.hasSheath()) outputText("sheath ");
				else outputText("base ");
				outputText("to tip, undulating and convulsing as its color lightens, darkens, and finally settles on a purplish hue.  Your " + Appearance.cockNoun(CockTypesEnum.HUMAN) + " resolves itself into a bulbous form, with a slightly pointed tip.  The 'bulbs' throughout its shape look like they would provide an interesting ride for your sexual partners, but the perverse, alien pecker ");
				if (player.cor < 33) outputText("horrifies you.");
				else if (player.cor < 66) outputText("is a little strange for your tastes.");
				else {
					outputText("looks like it might be more fun to receive than use on others.  ");
					if (player.hasVagina()) outputText("Maybe you could find someone else with one to ride?");
					else outputText("Maybe you should test it out on someone and ask them exactly how it feels?");
				}
				outputText("  <b>You now have a bulbous, lizard-like cock.</b>");
				//Actually xform it nau
				if (player.hasSheath()) {
					player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
					if (!player.hasSheath()) outputText("<br><br>Your sheath tightens and starts to smooth out, revealing ever greater amounts of your " + player.cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>");
				}
				else player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
				changes++;
				player.dynStats(["lib", 3], ["lust", 10]);
			}
			//(CHANGE OTHER DICK)
			//Requires 1 lizard cock, multiple cocks
			if (player.cockTotal() > 1 && player.countCocksOfType(CockTypesEnum.LIZARD) > 0 && player.cockTotal() > player.countCocksOfType(CockTypesEnum.LIZARD) && rand(4) == 0 && changes < changeLimit) {
				outputText("<br><br>A familiar tingle starts in your crotch, and before you can miss the show, you pull open your " + player.armor.equipmentName + ".  As if operating on a cue, ");
				for (temp2 = 0; temp2 < player.cocks.length; temp2++) {
					//Stop loopahn when dick be found
					if (player.cocks[temp2].cockType != CockTypesEnum.LIZARD) break;
				}
				if (player.cockTotal() == 2) outputText("your other dick");
				else outputText("another one of your dicks");
				outputText(" starts to change into the strange reptilian shape you've grown familiar with.  It warps visibly, trembling and radiating pleasurable feelings back to you as the transformation progresses.  ");
				if (player.cumQ() < 50) outputText("pre-cum oozes from the tip");
				else if (player.cumQ() < 700) outputText("Thick pre-cum rains from the tip");
				else outputText("A wave of pre-cum splatters on the ground");
				outputText(" from the pleasure of the change.  In moments <b>you have a bulbous, lizard-like cock.</b>");
				//(REMOVE SHEATH IF NECESSARY)
				if (player.hasSheath()) {
					player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
					if (!player.hasSheath()) outputText("<br><br>Your sheath tightens and starts to smooth out, revealing ever greater amounts of your " + player.cockDescript(temp2) + "'s lower portions.  After a few moments <b>your groin is no longer so animalistic – the sheath is gone.</b>");
				}
				else player.cocks[temp2].cockType = CockTypesEnum.LIZARD;
				changes++;
				player.dynStats(["lib", 3], ["lust", 10]);
			}
			//-Grows second lizard dick if only 1 dick
			if (player.countCocksOfType(CockTypesEnum.LIZARD) == 1 && player.cocks.length == 1 && rand(4) == 0 && changes < changeLimit) {
				outputText("<br><br>A knot of pressure forms in your groin, forcing you off your " + player.feet() + " as you try to endure it.  You examine the affected area and see a lump starting to bulge under your " + player.skinDesc + ", adjacent to your " + player.cockDescript(0) + ".  The flesh darkens, turning purple");
				if (player.skinType == SkinType.FUR || player.skinType == SkinType.SCALES)
					outputText(" and shedding " + player.skinDesc);
				outputText(" as the bulge lengthens, pushing out from your body.  Too surprised to react, you can only pant in pain and watch as the fleshy lump starts to take on a penis-like appearance.  <b>You're growing a second lizard-cock!</b>  It doesn't stop growing until it's just as long as its brother and the same shade of shiny purple.  A dribble of cum oozes from its tip, and you feel relief at last.");
				
				player.createCock();
				player.cocks[1].cockType      = CockTypesEnum.LIZARD;
				player.cocks[1].cockLength    = player.cocks[0].cockLength;
				player.cocks[1].cockThickness = player.cocks[0].cockThickness;
				changes++;
				player.dynStats(["lib", 3], ["lust", 10]);
			}
			//--Worms leave if 100% lizard dicks?
			//Require mammals?
			if (player.countCocksOfType(CockTypesEnum.LIZARD) == player.cockTotal() && changes < changeLimit && player.hasStatusEffect(StatusEffects.Infested)) {
				outputText("<br><br>Like rats from a sinking ship, worms escape from your body in a steady stream.  Surprisingly, the sensation is remarkably pleasant, similar to the pleasure of sexual release in a way.  Though they seem inexhaustible, the tiny, cum-slimed invertebrates slow to a trickle.  The larger worm-kin inside you stirs as if disturbed from a nap, coming loose from whatever moorings it had attached itself to in the interior of your form.  It slowly works its way up your urethra, stretching to an almost painful degree with every lurching motion.  Your dick bloats out around the base, stretched like the ovipositor on a bee-girl in order to handle the parasitic creature, but thankfully, the ordeal is a brief one.");
				if (player.balls > 1) outputText("  The remaining " + num2Text(player.balls - 1) + " slither out the pre-stretched holes with ease, though the last one hangs from your tip for a moment before dropping to the ground.");
				outputText("  The white creature joins its kin on the ground and slowly slithers away.  Perhaps they prefer mammals? In any event, <b>you are no longer infected with worms</b>.");
				player.removeStatusEffect(StatusEffects.Infested);
				changes++;
			}
			//-Breasts vanish to 0 rating if male
			if (player.biggestTitSize() >= 1 && player.gender == 1 && changes < changeLimit && rand(3) == 0) {
				//(HUEG)
				if (player.biggestTitSize() > 8) {
					outputText("<br><br>The flesh on your chest tightens up, losing nearly half its mass in the span of a few seconds.  With your center of balance shifted so suddenly, you stagger about trying not to fall on your ass.  You catch yourself and marvel at the massive change in breast size.");
					//Half tit size
				}
				//(NOT HUEG < 4)
				else outputText("<br><br>In an instant, your chest compacts in on itself, consuming every ounce of breast-flesh.  You're left with a  smooth, masculine torso, though your nipples remain.");
				//(BOTH – no new PG)
				outputText("  With the change in weight and gravity, you find it's gotten much easier to move about.");
				//Loop through behind the scenes and adjust all tits.
				for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
					if (player.breastRows[temp2].breastRating > 8) player.breastRows[temp2].breastRating /= 2;
					else player.breastRows[temp2].breastRating = 0;
				}
				//(+2 speed)
				player.dynStats("lib", 2);
				changes++;
			}
			//-Lactation stoppage.
			if (player.biggestLactation() >= 1 && changes < changeLimit && rand(4) == 0) {
				if (player.totalNipples() == 2) outputText("<br><br>Both of your");
				else outputText("<br><br>All of your many");
				outputText(" nipples relax.  It's a strange feeling, and you pull back your top to touch one.  It feels fine, though there doesn't seem to be any milk leaking out.  You give it a squeeze and marvel when nothing ");
				if (player.hasFuckableNipples()) outputText("but sexual fluid ");
				outputText("escapes it.  <b>You are no longer lactating.</b>  That makes sense, only mammals lactate!  Smiling, you muse at how much time this will save you when cleaning your gear.");
				if (player.hasPerk(PerkLib.Feeder) || player.hasStatusEffect(StatusEffects.Feeder)) {
					outputText("<br><br>(<b>Feeder perk lost!</b>)");
					player.removePerk(PerkLib.Feeder);
					player.removeStatusEffect(StatusEffects.Feeder);
				}
				changes++;
				//Loop through and reset lactation
				for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
					player.breastRows[temp2].lactationMultiplier = 0;
				}
			}
			//-Nipples reduction to 1 per tit.
			if (player.averageNipplesPerBreast() > 1 && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>A chill runs over your " + player.allBreastsDescript() + " and vanishes.  You stick a hand under your " + player.armor.equipmentName + " and discover that your extra nipples are missing!  You're down to just one per ");
				if (player.biggestTitSize() < 1) outputText("'breast'.");
				else outputText("breast.");
				changes++;
				//Loop through and reset nipples
				for (temp2 = 0; temp2 < player.breastRows.length; temp2++) {
					player.breastRows[temp2].nipplesPerBreast = 1;
				}
			}
			//-VAGs
			if (player.hasVagina() && !player.hasPerk(PerkLib.Oviposition) && changes < changeLimit && rand(5) == 0 && player.lizardScore() > 3) {
				outputText("<br><br>Deep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.<br>");
				outputText("(<b>Perk Gained: Oviposition</b>)");
				player.createPerk(PerkLib.Oviposition, 0, 0, 0, 0);
				changes++;
			}
			
			//Physical changes:
			//-Existing horns become draconic, max of 4, max length of 1'
			if (player.hornType != HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && rand(5) == 0) {
				//No dragon horns yet.
				if (player.hornType != HornType.DRACONIC_X2) {
					//Already have horns
					if (player.horns > 0) {
						//High quantity demon horns
						if (player.hornType == HornType.DEMON && player.horns > 4) {
							outputText("<br><br>Your horns condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.");
							player.horns    = 12;
							player.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
						}
						else {
							outputText("<br><br>You feel your horns changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns the dragons in your village's legends always had.");
							player.hornType = HornType.DRACONIC_X2;
							if (player.horns > 13) {
								outputText("  The change seems to have shrunken the horns, they're about a foot long now.");
								player.horns = 12;
							}
							
						}
						changes++;
					}
					//No horns
					else {
						//-If no horns, grow a pair
						outputText("<br><br>With painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>");
						player.horns    = 4;
						player.hornType = HornType.DRACONIC_X2;
						
						changes++;
					}
				}
				//ALREADY DRAGON
				else {
					if (player.hornType == HornType.DRACONIC_X2) {
						if (player.horns < 12) {
							if (rand(2) == 0) {
								outputText("<br><br>You get a headache as an inch of fresh horn escapes from your pounding skull.");
								player.horns += 1;
							}
							else {
								outputText("<br><br>Your head aches as your horns grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.");
								player.horns += 2 + rand(4);
							}
							if (player.horns >= 12) outputText("  <b>Your horns settle down quickly, as if they're reached their full size.</b>");
							changes++;
						}
						//maxxed out, new row
						else {
							//--Next horn growth adds second row and brings length up to 12\"
							outputText("<br><br>A second row of horns erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns as a lizan can grow.</b>");
							player.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
							changes++;
						}
					}
				}
			}
			//-Hair stops growing!
			if (gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] == 0 && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Your scalp tingles oddly.  In a panic, you reach up to your " + player.hairDescript() + ", but thankfully it appears unchanged.<br><br>");
				outputText("(<b>Your hair has stopped growing.</b>)");
				changes++;
				gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD]++;
			}
			//Remove beard!
			if (player.hasBeard() && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>Your " + player.beardDescript() + " feels looser and looser until finally, your beard falls out.  ");
				outputText("(<b>You no longer have a beard!</b>)");
				player.beardLength = 0;
				player.beardStyle  = 0;
			}
			//Big physical changes:
			//-Legs – Draconic, clawed feet
			if (player.lowerBody != LowerBodyType.LIZARD && changes < changeLimit && rand(5) == 0) {
				//Hooves -
				if (player.lowerBody == LowerBodyType.HOOFED) outputText("<br><br>You scream in agony as you feel your hooves crack and break apart, beginning to rearrange.  Your legs change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
				//TAURS -
				else if (player.isTaur()) outputText("<br><br>Your lower body is wracked by pain!  Once it passes, you discover that you're standing on digitigrade legs with lizard-like claws.");
				//feet types -
				else if (player.lowerBody == LowerBodyType.HUMAN || player.lowerBody == LowerBodyType.DOG || player.lowerBody == LowerBodyType.DEMONIC_HIGH_HEELS || player.lowerBody == LowerBodyType.DEMONIC_CLAWS || player.lowerBody == LowerBodyType.BEE || player.lowerBody == LowerBodyType.CAT) outputText("<br><br>You scream in agony as you feel the bones in your legs break and begin to rearrange. They change to a digitigrade shape while your feet grow claws and shift to have three toes on the front and a smaller toe on the heel.");
				//Else –
				else outputText("<br><br>Pain rips through your " + player.legs() + ", morphing and twisting them until the bones rearrange into a digitigrade configuration.  The strange legs have three-toed, clawed feet, complete with a small vestigial claw-toe on the back for added grip.");
				outputText("  <b>You have reptilian legs and claws!</b>");
				player.lowerBody = LowerBodyType.LIZARD;
				player.legCount  = 2;
				changes++;
			}
			//-Tail – sinuous lizard tail
			if (player.tailType != TailType.LIZARD && player.lowerBody == LowerBodyType.LIZARD && changes < changeLimit && rand(5) == 0) {
				//No tail
				if (player.tailType == TailType.NONE) outputText("<br><br>You drop onto the ground as your spine twists and grows, forcing the flesh above your " + player.assDescript() + " to bulge out.  New bones form, one after another, building a tapered, prehensile tail onto the back of your body.  <b>You now have a reptilian tail!</b>");
				//Yes tail
				else outputText("<br><br>You drop to the ground as your tail twists and grows, changing its shape in order to gradually taper to a point.  It flicks back and forth, prehensile and totally under your control.  <b>You now have a reptilian tail.</b>");
				player.tailType = TailType.LIZARD;
				changes++;
			}
			//Remove odd eyes
			if (changes < changeLimit && rand(5) == 0 && player.eyeType > EyeType.HUMAN) {
				if (player.eyeType == EyeType.BLACK_EYES_SAND_TRAP) {
					outputText("<br><br>You feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
				}
				else {
					outputText("<br><br>You blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
					if (player.eyeType == EyeType.FOUR_SPIDER_EYES) outputText("  Your multiple, arachnid eyes are gone!</b>");
					outputText("  <b>You have normal, humanoid eyes again.</b>");
				}
				player.eyeType = EyeType.HUMAN;
				changes++;
			}
			//-Ears become smaller nub-like openings?
			if (player.earType != EarType.LIZARD && player.tailType == TailType.LIZARD && player.lowerBody == LowerBodyType.LIZARD && changes < changeLimit && rand(5) == 0) {
				outputText("<br><br>Tightness centers on your scalp, pulling your ears down from their normal, fleshy shape into small, scaley bumps with holes in their centers.  <b>You have reptilian ears!</b>");
				player.earType = EarType.LIZARD;
				changes++;
			}
			//-Scales – color changes to red, green, white, blue, or black.  Rarely: purple or silver.
			if (player.skinType != SkinType.SCALES && player.earType == EarType.LIZARD && player.tailType == TailType.LIZARD && player.lowerBody == LowerBodyType.LIZARD && changes < changeLimit && rand(5) == 0) {
				//(fur)
				if (player.skinType == SkinType.FUR) {
					//set new skinTone
					if (rand(10) == 0) {
						if (rand(2) == 0) player.skinTone = "purple";
						else player.skinTone = "silver";
					}
					//non rare skinTone
					else {
						let temp = rand(5);
						if (temp == 0) player.skinTone = "red";
						else if (temp == 1) player.skinTone = "green";
						else if (temp == 2) player.skinTone = "white";
						else if (temp == 3) player.skinTone = "blue";
						else player.skinTone = "black";
					}
					outputText("<br><br>You scratch yourself, and come away with a large clump of " + player.furColor + " fur.  Panicked, you look down and realize that your fur is falling out in huge clumps.  It itches like mad, and you scratch your body relentlessly, shedding the remaining fur with alarming speed.  Underneath the fur your skin feels incredibly smooth, and as more and more of the stuff comes off, you discover a seamless layer of " + player.skinTone + " scales covering most of your body.  The rest of the fur is easy to remove.  <b>You're now covered in scales from head to toe.</b>");
				}
				//(no fur)
				else {
					outputText("<br><br>You idly reach back to scratch yourself and nearly jump out of your " + player.armor.equipmentName + " when you hit something hard.  A quick glance down reveals that scales are growing out of your " + player.skinTone + " skin with alarming speed.  As you watch, the surface of your skin is covered in smooth scales.  They interlink together so well that they may as well be seamless.  You peel back your " + player.armor.equipmentName + " and the transformation has already finished on the rest of your body.  <b>You're covered from head to toe in shiny ");
					//set new skinTone
					if (rand(10) == 0) {
						if (rand(2) == 0) player.skinTone = "purple";
						else player.skinTone = "silver";
					}
					//non rare skinTone
					else {
						let temp = rand(5);
						if (temp == 0) player.skinTone = "red";
						else if (temp == 1) player.skinTone = "green";
						else if (temp == 2) player.skinTone = "white";
						else if (temp == 3) player.skinTone = "blue";
						else player.skinTone = "black";
					}
					outputText(player.skinTone + " scales.</b>");
				}
				player.skinType = SkinType.SCALES;
				player.skinDesc = "scales";
				changes++;
			}
			//-Lizard-like face.
			if (player.faceType != FaceType.LIZARD && player.skinType == SkinType.SCALES && player.earType == EarType.LIZARD && player.tailType == TailType.LIZARD && player.lowerBody == LowerBodyType.LIZARD && changes < changeLimit && rand(5) == 0) {
				outputText("<br><br>Terrible agony wracks your " + player.face() + " as bones crack and shift.  Your jawbone rearranges while your cranium shortens.  The changes seem to last forever; once they've finished, no time seems to have passed.  Your fingers brush against your toothy snout as you get used to your new face.  It seems <b>you have a toothy, reptilian visage now.</b>");
				player.faceType = FaceType.LIZARD;
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			//FAILSAFE CHANGE
			if (changes == 0) {
				outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
				player.changeHP(50, true);
				player.changeLust(3);
			}
			player.refillHunger(20);
			gameFlags[TIMES_TRANSFORMED] += changes;
		}
		
		export const Reptilum  = new Item("Reptilum", "Reptilum", "a vial of Reptilum", ITEM_TYPE_CONSUMABLE);
		Reptilum.description   = "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.";
		Reptilum.consumeEffect = lizardTFs;
		
	}
}

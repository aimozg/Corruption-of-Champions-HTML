/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function humanTFs(): void {
			let changes     = 0;
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//Text go!
			clearOutput();
			outputText("You crack open the small clay jar to reveal a lightly colored paste that smells surprisingly delicious. You begin eating it with your fingers, wishing all the while for some crackers... ");
			player.slimeFeed();
			player.refillHunger(20);
			if (player.humanScore() > 4) {
				outputText("<br><br>You blink and the world twists around you. You feel more like yourself than you have in a while, but exactly how isn't immediately apparent. Maybe you should take a look at yourself?");
			}
			else {
				outputText("<br><br>You cry out as the world spins around you. You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing. You nearly black out, and then it's over. Maybe you had best have a look at yourself and see what changed?");
			}
			//------------
			// MAJOR TFs
			//------------
			//1st priority: Change lower body to bipedal.
			//(Centaurs -> Normal Human Legs) (copy from elsewhere)
			if (player.isTaur() && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Your quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side. Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow. When it finally stops, <b>you look down to behold your new pair of human legs</b>!");
				player.lowerBody = LowerBodyType.HUMAN;
				player.legCount  = 2;
				changes++;
			}
			//(Goo -> Normal Human Legs) (copy from elsewhere)
			if (player.isGoo() && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Your lower body rushes inward, molding into two leg-like shapes that gradually stiffen up. In moments they solidify into normal-looking legs, complete with regular, human feet. <b>You now have normal feet!</b>");
				player.lowerBody = LowerBodyType.HUMAN;
				player.legCount  = 2;
				changes++;
			}
			//(Naga -> Normal Human Legs) (copy from elsewhere)
			if (player.isNaga() && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>You collapse as your sinuous snake-tail tears in half, shifting into legs. The pain is immense, particularly where your new feet are forming. <b>You have human legs again.</b>");
				player.lowerBody = LowerBodyType.HUMAN;
				player.legCount  = 2;
				changes++;
			}
			//(Non-human -> Normal Human Legs)
			if (player.isBiped() && player.lowerBody != LowerBodyType.HUMAN && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>You collapse as your legs shift and twist. By the time the pain subsides, you notice that you have normal legs and normal feet. <b>You now have normal feet!</b>");
				player.lowerBody = LowerBodyType.HUMAN;
				player.legCount  = 2;
				changes++;
			}
			//Remove Incorporeality Perk
			if (player.hasPerk(PerkLib.Incorporeality) && changes < changeLimit && rand(10) == 0) {
				outputText("<br><br>You feel a strange sensation in your [legs] as they start to feel more solid. They become more opaque until finally, you can no longer see through your [legs]. <br><b>(Perk Lost: Incorporeality!)</b>");
				player.removePerk(PerkLib.Incorporeality);
				changes++;
			}
			//-Skin color change – tan, olive, dark, light
			if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && rand(5) == 0) {
				changes++;
				outputText("<br><br>It takes a while for you to notice, but <b>");
				if (player.skinType == SkinType.FUR) outputText("the skin under your " + player.furColor + " " + player.skinDesc);
				else outputText("your " + player.skinDesc);
				outputText(" has changed to become ");
				let temp = rand(4);
				if (temp == 0) player.skinTone = "tan";
				else if (temp == 1) player.skinTone = "olive";
				else if (temp == 2) player.skinTone = "dark";
				else if (temp == 3) player.skinTone = "light";
				outputText(player.skinTone + " colored.</b>");
			}
			//Change skin to normal
			if (player.skinType != SkinType.PLAIN && (player.earType == EarType.HUMAN || player.earType == EarType.ELFIN) && rand(4) == 0 && changes < changeLimit) {
				outputText("<br><br>A slowly-building itch spreads over your whole body, and as you idly scratch yourself, you find that your " + player.skinFurScales() + " ");
				if (player.skinType == SkinType.SCALES) outputText("are");
				else outputText("is");
				outputText(" falling to the ground, revealing flawless skin below. <b>You now have normal skin.</b>");
				
				player.skinType = SkinType.PLAIN;
				player.skinDesc = "skin";
				changes++;
			}
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
			//------------
			// MINOR TFs
			//------------
			//-Human face
			if (player.faceType != FaceType.HUMAN && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Sudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.");
				player.faceType = FaceType.HUMAN;
				changes++;
			}
			//-Human tongue
			if (player.tongueType != TongueType.HUMAN && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>You feel something strange inside your face as your tongue shrinks and recedes until it feels smooth and rounded. <b>You realize your tongue has changed back into human tongue!</b>");
				player.tongueType = TongueType.HUMAN;
				changes++;
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
			//-Gain human ears (If you have human face)
			if ((player.earType != EarType.HUMAN && player.faceType == FaceType.HUMAN) && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Ouch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!");
				player.earType = EarType.HUMAN;
				changes++;
			}
			//Removes gills
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			//Nipples Turn Back:
			if (gameFlags[HAS_BLACK_NIPPLES] >= 0 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>Something invisible brushes against your " + player.nippleDescript(0) + ", making you twitch. Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
				changes++;
				gameFlags[HAS_BLACK_NIPPLES] = 0;
			}
			//Remove feathery hair (copy for equinum, canine peppers, Labova)
			if (changes < changeLimit && player.hairType == HairType.FEATHER && rand(4) == 0) {
				//(long):
				if (player.hairLength >= 6) outputText("<br><br>A lock of your downy-soft feather-hair droops over your eye. Before you can blow the offending down away, you realize the feather is collapsing in on itself. It continues to curl inward until all that remains is a normal strand of hair. <b>Your hair is no longer feathery!</b>");
				//(short)
				else outputText("<br><br>You run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested. While your hand is up there, it detects a change in the texture of your feathers. They're completely disappearing, merging down into strands of regular hair. <b>Your hair is no longer feathery!</b>");
				changes++;
				player.hairType = HairType.NORMAL;
			}
			//Remove anemone hair
			if (changes < changeLimit && player.hairType == HairType.ANEMONE && rand(3) == 0) {
				//-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
				outputText("<br><br>You feel something strange going in on your head. You reach your hands up to feel your tentacle-hair, only to find out that the tentacles have vanished and replaced with normal hair. <b>Your hair is normal again!</b>");
				player.hairType = HairType.NORMAL;
				changes++;
			}
			//Remove goo hair
			if (changes < changeLimit && player.hairType == HairType.GOO && rand(3) == 0) {
				outputText("<br><br>Your gooey hair begins to fall out in globs, eventually leaving you with a bald head. Your head is not left bald for long, though. Within moments, a full head of hair sprouts from the skin of your scalp. <b>Your hair is normal again!</b>");
				//Turn hair growth on.
				gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
				player.hairType                               = HairType.NORMAL;
				changes++;
			}
			//Restart hair growth
			if (gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>You feel an itching sensation in your scalp as you realize the change. <b>Your hair is growing normally again!</b>");
				//Turn hair growth on.
				gameFlags[HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
				player.hairType                               = HairType.NORMAL;
				changes++;
			}
			//------------
			// EXTRA PARTS REMOVAL
			//------------
			//Removes antennae
			if (player.antennae > AntennaeType.NONE && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>The muscles in your brow clench tightly, and you feel a tremendous pressure on your upper forehead. When it passes, you touch yourself and discover your antennae have vanished!");
				player.antennae = AntennaeType.NONE;
				changes++;
			}
			//Removes horns
			if (changes < changeLimit && player.horns > 0 && rand(5) == 0) {
				player.horns    = 0;
				player.hornType = HornType.NONE;
				outputText("<br><br>Your horns crumble, falling apart in large chunks until they flake away to nothing.");
				changes++;
			}
			//Removes wings
			if (player.wingType > WingType.NONE && rand(5) == 0 && changes < changeLimit) {
				if (player.wingType == WingType.SHARK_FIN)
					outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into your spine. After a moment the pain passes, though your fin is gone!");
				else
					outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into each of your shoulder-blades. After a moment the pain passes, though your wings are gone!");
				player.wingType = WingType.NONE;
				changes++;
			}
			//Removes tail
			if (player.tailType > TailType.NONE && rand(5) == 0 && changes < changeLimit) {
				outputText("<br><br>You feel something shifting in your backside. Then something detaches from your backside and it falls onto the ground. <b>You no longer have a tail!</b>");
				player.tailType     = TailType.NONE;
				player.tailVenom    = 0;
				player.tailRecharge = 5;
				changes++;
			}
			//Increase height up to 5 feet.
			if (rand(2) == 0 && changes < changeLimit && player.tallness < 60) {
				let temp = rand(5) + 3;
				//Slow rate of growth near ceiling
				if (player.tallness > 90) temp = Math.floor(temp / 2);
				//Never 0
				if (temp == 0) temp = 1;
				//Flavor texts.  Flavored like 1950's cigarettes. Yum.
				if (temp < 5) outputText("<br><br>You shift uncomfortably as you realize you feel off balance. Gazing down, you realize you have grown SLIGHTLY taller.");
				if (temp >= 5 && temp < 7) outputText("<br><br>You feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
				if (temp == 7) outputText("<br><br>Staggering forwards, you clutch at your head dizzily. You spend a moment getting your balance, and stand up, feeling noticeably taller.");
				player.tallness += temp;
				changes++;
			}
			//Decrease height down to a minimum of 7 feet.
			if (rand(2) == 0 && changes < changeLimit && player.tallness > 84) {
				outputText("<br><br>Your skin crawls, making you close your eyes and shiver. When you open them again the world seems... different. After a bit of investigation, you realize you've become shorter!<br>");
				player.tallness -= 1 + rand(3);
				changes++;
			}
			//------------
			// SEXUAL TFs
			//------------
			//Remove additional cocks
			if (player.cocks.length > 1 && rand(3) == 0 && changes < changeLimit) {
				player.removeCock(1);
				outputText("<br><br>You have a strange feeling as your crotch tingles. " + player.clothedOrNakedLower("Opening your " + player.armor.equipmentName, "Looking down") + ", <b>you realize that one of your cocks have vanished completely!</b>");
				player.genderCheck();
				changes++;
			}
			//Remove additional balls
			if (player.balls > 2 && rand(3) == 0 && changes < changeLimit) {
				if (player.ballSize > 2) {
					if (player.ballSize > 5) player.ballSize -= 1 + rand(3);
					player.ballSize -= 1;
					outputText("<br><br>Your scrotum slowly shrinks, settling down at a smaller size. <b>Your " + player.ballsDescriptLight() + " are smaller now.</b><br><br>");
				}
				else {
					player.balls = 2;
					outputText("<br><br>Your scrotum slowly shrinks until they seem to have reached a normal size. <b>You can feel as if your extra balls fused together, leaving you with a pair of balls.</b><br><br>");
				}
				changes++;
			}
			//Change cock back to normal
			if (player.hasCock() && changes < changeLimit) {
				if (rand(3) == 0 && player.cocks[0].cockType != CockTypesEnum.HUMAN) {
					outputText("<br><br>A strange tingling begins behind your " + player.cockDescript(0) + ", slowly crawling up across its entire length. While neither particularly arousing nor uncomfortable, you do shift nervously as the feeling intensifies. You resist the urge to undo your " + player.armor.equipmentName + " to check, but by the feel of it, your penis is shifting form. Eventually the transformative sensation fades, <b>leaving you with a completely human penis.</b>");
					player.cocks[0].cockType = CockTypesEnum.HUMAN;
					changes++;
				}
			}
			//Shrink oversized cocks
			if (player.hasCock() && player.biggestCockLength() > 12 && rand(3) == 0 && changes < changeLimit) {
				const idx = player.biggestCockIndex();
				if (player.cocks.length == 1) outputText("<br><br>You feel a tingling sensation as your cock shrinks to a smaller size!");
				else outputText("<br><br>You feel a tingling sensation as the largest of your cocks shrinks to a smaller size!");
				player.cocks[idx].cockLength -= (rand(10) + 2) / 10;
				if (player.cocks[idx].cockThickness > 1.5) {
					outputText(" Your " + player.cockDescript(idx) + " definitely got a bit thinner as well.");
					player.cocks[idx].cockThickness -= (rand(4) + 1) / 10;
				}
				changes++;
			}
			//Remove additional breasts
			if (changes < changeLimit && player.breastRows.length > 1 && rand(3) == 0 && !hyperHappy) {
				changes++;
				outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
				if (player.breastRows.length >= 3)
					outputText("abdomen");
				else
					outputText("chest");
				outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
				if (player.skinType == SkinType.FUR)
					outputText(player.hairColor + " " + player.skinDesc);
				else
					outputText(player.skinTone + " " + player.skinDesc);
				outputText(" remains. <b>You've lost a row of breasts!</b>");
				player.dynStats("sens", -5);
				player.removeBreastRow(player.breastRows.length - 1, 1);
				changes++;
			}
			//Remove extra nipples
			if (player.averageNipplesPerBreast() > 1 && rand(4) == 0 && changes < changeLimit) {
				outputText("<br><br>A tightness arises in your nipples as three out of four on each breast recede completely, the leftover nipples migrating to the middle of your breasts. <b>You are left with only one nipple on each breast.</b>");
				for (let x = 0; x < player.bRows(); x++) {
					player.breastRows[x].nipplesPerBreast = 1;
				}
				changes++;
			}
			//Shrink tits!
			if (changes < changeLimit && rand(3) == 0 && player.biggestTitSize() > 6) {
				player.shrinkTits();
				changes++;
			}
			//Change vagina back to normal
			if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
				outputText("<br><br>Something invisible brushes against your sex, making you twinge. Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
				player.vaginaType(0);
				changes++;
			}
			//Fertility Decrease:
			if (player.hasVagina() && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>The vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there. ");
				player.dynStats("sens", -2);
				//High fertility:
				if (player.fertility >= 30) outputText("It feels like your overcharged reproductive organs have simmered down a bit.");
				//Average fertility:
				else if (player.fertility >= 10) outputText("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
				//[Low/No fertility:
				else {
					outputText("Although the numbness makes you feel serene, the hummus has no effect upon your ");
					if (player.fertility > 0) outputText("mostly ");
					outputText("sterile system.");
					if (player.cor > 70) outputText(" For some reason the fact that you cannot function as nature intended makes you feel helpless and submissive. Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
				}
				player.fertility -= 1 + rand(3);
				if (player.fertility < 10 && player.gender >= 2) player.fertility = 10;
				if (player.fertility < 5) player.fertility = 5;
				changes++;
			}
			//Cum Multiplier Decrease:
			if (player.hasCock() && player.cumMultiplier > 5 && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>You feel a strange tingling sensation in your ");
				if (player.balls > 0) outputText("balls");
				else outputText("groin");
				outputText(" as you can feel the density reducing. You have a feeling you're going to produce less cum now.");
				player.cumMultiplier -= (1 + (rand(20) / 10));
				if (player.cumMultiplier < 1) player.cumMultiplier = 1;
				changes++;
			}
			gameFlags[TIMES_TRANSFORMED] += changes;
		}
		
		export const Hummanus  = new Item("Hummus ", "Hummanus", "a small jar of hummus", ITEM_TYPE_CONSUMABLE);
		Hummanus.description   = "This is a small jar with label that reads, \"<i>Hummanus</i>\". If the name clues you in, this might be how humanity is regained.";
		Hummanus.consumeEffect = humanTFs;
		
	}
}

/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		function goblinTFs(): void {
			let changes     = 0;
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (rand(3) == 0) changeLimit++;
			if (rand(4) == 0) changeLimit++;
			if (rand(5) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			clearOutput();
			outputText("You drink the ale, finding it to have a remarkably smooth yet potent taste. You lick your lips and sneeze, feeling slightly tipsy.");
			player.slimeFeed();
			player.changeLust(15);
			//------------
			// STATS CHANGES
			//------------
			//Weaker
			if (player.str > 50) {
				player.dynStats("str", -1);
				if (player.str > 70) player.dynStats("str", -1);
				if (player.str > 90) player.dynStats("str", -2);
				outputText("<br><br>You feel a little weaker, but maybe it's just the alcohol.");
			}
			//Less tough
			if (player.tou > 50) {
				outputText("<br><br>Giggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
				player.dynStats("tou", -1);
				if (player.tou > 70) player.dynStats("tou", -1);
				if (player.tou > 90) player.dynStats("tou", -2);
			}
			//Speed boost
			if (rand(3) == 0 && player.spe < 50 && changes < changeLimit) {
				player.dynStats("spe", 1 + rand(2));
				outputText("<br><br>You feel like dancing, and stumble as your legs react more quickly than you'd think. Is the alcohol slowing you down or are you really faster? You take a step and nearly faceplant as you go off balance. It's definitely both.");
				changes++;
			}
			//------------
			// SEXUAL TFs
			//------------
			//Multidick killa!
			if (player.cocks.length > 1 && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>");
				player.removeCock(player.cocks.length - 1);
				changes++;
			}
			//Boost vaginal capacity without gaping
			if (changes < changeLimit && rand(3) == 0 && player.hasVagina() && player.statusEffectValue(StatusEffects.BonusVCapacity, 1, 0) < 40) {
				let s = player.findStatusEffectByType(StatusEffects.BonusVCapacity);
				if (!s) player.createStatusEffect(StatusEffects.BonusVCapacity, 5, 0, 0, 0);
				else s.value1 += 5;
				outputText("<br><br>There is a sudden... emptiness within your " + player.vaginaDescript(0) + ". Somehow you know you could accommodate even larger... insertions.");
				changes++;
			}
			//Boost fertility
			if (changes < changeLimit && rand(4) == 0 && player.fertility < 40 && player.hasVagina()) {
				player.fertility += 2 + rand(5);
				changes++;
				outputText("<br><br>You feel strange. Fertile... somehow. You don't know how else to think of it, but you're ready to be a mother.");
			}
			//Shrink primary dick to no longer than 12 inches
			else if (player.cocks.length == 1 && rand(2) == 0 && changes < changeLimit && !hyperHappy) {
				if (player.cocks[0].cockLength > 12) {
					changes++;
					let temp3 = 0;
					outputText("<br><br>");
					//Shrink said cock
					if (player.cocks[0].cockLength < 6 && player.cocks[0].cockLength >= 2.9) {
						player.cocks[0].cockLength -= .5;
						temp3 -= .5;
					}
					temp3 += player.cocks[0].increaseCock((rand(3) + 1) * -1);
					player.cocks[0].increaseCock(temp3);
				}
			}
			//------------
			// BODY TFs
			//------------
			//antianemone corollary:
			if (changes < changeLimit && player.hairType == 4 && rand(2) == 0) {
				//-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
				outputText("<br><br>As you down the potent ale, your head begins to feel heavier - and not just from the alcohol! Reaching up, you notice your tentacles becoming soft and somewhat fibrous. Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like strands. <b>Your hair is now back to normal!</b>");
				player.hairType = HairType.NORMAL;
				changes++;
			}
			//Shrink
			if (rand(2) == 0 && player.tallness > 48) {
				changes++;
				outputText("<br><br>The world spins, and not just from the strength of the drink! Your viewpoint is closer to the ground. How fun!");
				player.tallness -= (1 + rand(5));
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
			//REMOVAL STUFF
			//Removes wings and antennaes!
			if (changes < changeLimit && rand(4) == 0 && (player.wingType == WingType.BEE_LIKE_SMALL || player.wingType == WingType.BEE_LIKE_LARGE || player.wingType >= WingType.HARPY)) {
				if (player.wingType == WingType.SHARK_FIN) outputText("<br><br>Your back tingles, feeling lighter. Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off. This might be the best (and worst) booze you've ever had! <b>You no longer have a fin!</b>");
				else outputText("<br><br>Your shoulders tingle, feeling lighter. Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off. This might be the best (and worst) booze you've ever had! <b>You no longer have wings!</b>");
				player.wingType = WingType.NONE;
				changes++;
			}
			//Removes wings and antennaes!
			if (changes < changeLimit && rand(3) == 0 && player.antennae > AntennaeType.NONE) {
				outputText("<br><br>Your " + player.hairDescript() + " itches so you give it a scratch, only to have your antennae fall to the ground. What a relief. <b>You've lost your antennae!</b>");
				changes++;
				player.antennae = AntennaeType.NONE;
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
			//Skin/fur
			if (player.skinType != SkinType.PLAIN && changes < changeLimit && rand(4) == 0 && player.faceType == FaceType.HUMAN) {
				if (player.skinType == SkinType.FUR) outputText("<br><br>Your fur itches incessantly, so you start scratching it. It starts coming off in big clumps before the whole mess begins sloughing off your body. In seconds, your skin is nude. <b>You've lost your fur!</b>");
				if (player.skinType == SkinType.SCALES) outputText("<br><br>Your scales itch incessantly, so you scratch at them. They start falling off wholesale, leaving you standing in a pile of scales after only a few moments. <b>You've lost your scales!</b>");
				if (player.skinType > SkinType.SCALES) outputText("<br><br>Your " + player.skinDesc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin. <b>Your skin is once again normal!</b>");
				player.skinAdj  = "";
				player.skinDesc = "skin";
				player.skinType = SkinType.PLAIN;
				changes++;
			}
			//skinTone
			if (player.skinTone != "green" && player.skinTone != "grayish-blue" && player.skinTone != "dark green" && player.skinTone != "pale yellow" && changes < changeLimit && rand(2) == 0) {
				if (rand(10) != 0) player.skinTone = "dark green";
				else {
					if (rand(2) == 0) player.skinTone = "pale yellow";
					else player.skinTone = "grayish-blue";
				}
				changes++;
				outputText("<br><br>Whoah, that was weird. You just hallucinated that your ");
				if (player.skinType == SkinType.FUR) outputText("skin");
				else outputText(player.skinDesc);
				outputText(" turned " + player.skinTone + ". No way! It's staying, it really changed color!");
			}
			//Face!
			if (player.faceType != FaceType.HUMAN && changes < changeLimit && rand(4) == 0 && player.earType == EarType.ELFIN) {
				changes++;
				player.faceType = FaceType.HUMAN;
				outputText("<br><br>Another violent sneeze escapes you. It hurt! You feel your nose and discover your face has changed back into a more normal look. <b>You have a human looking face again!</b>");
			}
			//Ears!
			if (player.earType != EarType.ELFIN && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>A weird tingling runs through your scalp as your " + player.hairDescript() + " shifts slightly. You reach up to touch and bump <b>your new pointed elfin ears</b>. You bet they look cute!");
				changes++;
				player.earType = EarType.ELFIN;
			}
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
			//Debugcunt
			if (changes < changeLimit && rand(3) == 0 && player.vaginaType() == 5 && player.hasVagina()) {
				outputText("<br><br>Something invisible brushes against your sex, making you twinge. Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
				player.vaginaType(0);
				changes++;
			}
			if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && !player.hasPerk(PerkLib.MaraesGiftButtslut)) || player.ass.analWetness > 1)) {
				outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself. You feel sharp pain at first but that thankfully fades. Your ass seems to have dried and tightened up.");
				player.ass.analWetness--;
				if (player.ass.analLooseness > 1) player.ass.analLooseness--;
				changes++;
			}
			if (changes < changeLimit && rand(3) == 0) {
				if (rand(2) == 0) player.modFem(85, 3);
				if (rand(2) == 0) player.modThickness(20, 3);
				if (rand(2) == 0) player.modTone(15, 5);
			}
			player.refillHunger(15);
		}
		
		export const GoblinAle  = new Item("Gob.Ale", "Goblin Ale", "a flagon of potent goblin ale", ITEM_TYPE_CONSUMABLE);
		GoblinAle.description   = "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew. Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.";
		GoblinAle.consumeEffect = goblinTFs;
		
	}
}

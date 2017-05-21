/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		function demonTFs(type: number, purified: boolean) {
			if (type == 1) { //Incubi Draft
			
			}
			if (type == 2) { //Succubi Milk
			
			}
			outputText("(Placeholder) You drink the draft.");
		}
		
		function succubiDelight(tainted: boolean) {
			let temp;
			player.slimeFeed();
			let changes = 0;
			let crit    = 1;
			//Determine crit multiplier (x2 or x3)
			if (rand(4) == 0) crit += rand(2) + 1;
			let changeLimit = 1;
			//Chances to up the max number of changes
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//Generic drinking text
			outputText("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
			//low corruption thoughts
			if (player.cor < 33) outputText(" This stuff is gross, why are you drinking it?");
			//high corruption
			if (player.cor >= 66) outputText(" You lick your lips, marvelling at how thick and sticky it is.");
			//Corruption increase
			if ((player.cor < 50 || rand(2)) && tainted) {
				outputText("<br><br>The drink makes you feel... dirty.");
				temp = 1;
				//Corrupts the uncorrupted faster
				if (player.cor < 50) temp++;
				if (player.cor < 40) temp++;
				if (player.cor < 30) temp++;
				//Corrupts the very corrupt slower
				if (player.cor >= 90) temp = .5;
				player.dynStats("cor", temp);
				changes++;
			}
			//Makes your balls biggah! (Or cummultiplier higher if futa!)
			if (rand(1.5) == 0 && changes < changeLimit && player.balls > 0) {
				player.ballSize++;
				//They grow slower as they get bigger...
				if (player.ballSize > 10) player.ballSize -= .5;
				//And MUCH slower
				if (player.ballSize > 24) player.ballSize -= .3;
				//Texts
				if (player.ballSize <= 2) outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + player.ballsDescriptLight() + " have grown larger than a human's.");
				if (player.ballSize > 2) outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your " + player.sackDescript() + ". Walking becomes difficult as you discover your " + player.ballsDescriptLight() + " have enlarged again.");
				player.dynStats("lib", 1);
				player.changeLust(3);
				changes++;
			}
			//Grow new balls!
			if (player.balls < 2 && changes < changeLimit && rand(4) == 0) {
				if (player.balls == 0) {
					player.balls = 2;
					outputText("<br><br>Incredible pain scythes through your crotch, doubling you over. You stagger around, struggling to pull open your " + player.armor.equipmentName + ". In shock, you barely register the sight before your eyes: <b>You have balls!</b>");
					player.ballSize = 1;
				}
				changes++;
			}
			//Boost cum multiplier
			if (changes < changeLimit && rand(2) == 0 && player.cocks.length > 0) {
				if (player.cumMultiplier < 6 && rand(2) == 0 && changes < changeLimit) {
					//Temp is the max it can be raised to
					temp = 3;
					//Lots of cum raises cum multiplier cap to 6 instead of 3
					if (player.hasPerk(PerkLib.MessyOrgasms)) temp = 6;
					if (temp < player.cumMultiplier + .4 * crit) {
						changes--;
					}
					else {
						player.cumMultiplier += .4 * crit;
						//Flavor text
						if (player.balls == 0) outputText("<br><br>You feel a churning inside your body as something inside you changes.");
						if (player.balls > 0) outputText("<br><br>You feel a churning in your " + player.ballsDescriptLight() + ". It quickly settles, leaving them feeling somewhat more dense.");
						if (crit > 1) outputText(" A bit of milky pre dribbles from your " + player.multiCockDescriptLight() + ", pushed out by the change.");
						player.dynStats("lib", 1);
					}
					changes++;
				}
			}
			//Fail-safe
			if (changes == 0) {
				outputText("<br><br>Your groin tingles, making it feel as if you haven't cum in a long time.");
				player.hoursSinceCum += 100;
				changes++;
			}
			if (player.balls > 0 && rand(3) == 0) {
				outputText(player.modFem(12, 3));
			}
			player.refillHunger(10);
		}
		
		export const IncubiDraft  = new Item("I.Draft", "I.Draft", "a flask of Incubi draft", ITEM_TYPE_CONSUMABLE);
		IncubiDraft.description   = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass.";
		IncubiDraft.consumeEffect = () => demonTFs(0, false);
		
		export const IncubiDraftPurified  = new Item("P.Draft", "P.Draft", "an untainted flask of purified Incubi draft", ITEM_TYPE_CONSUMABLE);
		IncubiDraftPurified.description   = "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers. A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.";
		IncubiDraftPurified.consumeEffect = () => demonTFs(0, true);
		IncubiDraftPurified.value         = 20;
		
		export const SuccubiMilk  = new Item("SucMilk", "SucMilk", "a bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
		SuccubiMilk.description   = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"";
		SuccubiMilk.consumeEffect = () => demonTFs(1, false);
		
		
		// There are two definitions for SuccubiMilkPurified. Which one is the correct one?
		export const SuccubiMilkPurified  = new Item("P.S.Mlk", "P.S.Milk", "an untainted bottle of Succubi milk", ITEM_TYPE_CONSUMABLE);
		SuccubiMilkPurified.description   = "This milk-bottle is filled to the brim with a creamy white milk of dubious origin. A pink label proudly labels it as \"<i>Succubi Milk</i>\". In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\" Rathazul has purified this to prevent corruption upon use.";
		SuccubiMilkPurified.consumeEffect = () => demonTFs(1, true);
		SuccubiMilkPurified.value         = 20;
		
		export const SuccubiDelight  = new Item("SDelite", "S.Delite", "a bottle of 'Succubi's Delight'", ITEM_TYPE_CONSUMABLE);
		SuccubiDelight.description   = "This precious fluid is often given to men a succubus intends to play with for a long time.";
		SuccubiDelight.consumeEffect = () => succubiDelight(false);
		
		export const SuccubiDelightPurified  = new Item("PSDelit", "PSDelit", "an untainted bottle of \"Succubi's Delight\"", ITEM_TYPE_CONSUMABLE);
		SuccubiDelightPurified.description   = "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.";
		SuccubiDelightPurified.consumeEffect = () => succubiDelight(true);
		SuccubiDelightPurified.value         = 20;
		
		
	}
}
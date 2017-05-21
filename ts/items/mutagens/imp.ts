/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function impTFs(): void {
			let changes     = 0;
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//Consumption text
			if (player.hasCock())
				outputText("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
			else
				outputText("The food tastes... corrupt, for lack of a better word.");
			//Refill hunger & HP restore!
			player.refillHunger(20);
			outputText("<br><br>Inhuman vitality spreads through your body, invigorating you!<br>");
			player.changeHP(30 + player.tou / 3, true, false);
			player.dynStats(["lust", 3], ["cor", 1]);
			//Cock growth!
			if (changes < changeLimit && player.hasCock() && player.cocks[0].cockLength < 12) {
				const temp = player.cocks[0].increaseCock(rand(2) + 2);
				outputText("<br><br>");
				player.lengthChange(temp, 1);
			}
			//Shrinkage!
			if (changes < changeLimit && rand(2) == 0 && player.tallness > 42) {
				outputText("<br><br>Your skin crawls, making you close your eyes and shiver. When you open them again the world seems... different. After a bit of investigation, you realize you've become shorter!<br>");
				player.tallness -= 1 + rand(3);
				changes++;
			}
			//Red skin!
			if (changes < changeLimit && rand(10) == 0 && player.skinTone != "red") {
				if (player.skinType == SkinType.FUR) outputText("<br><br>Underneath your fur, your skin ");
				else outputText("<br><br>Your " + player.skinDesc + " ");
				if (rand(2) == 0) player.skinTone = "red";
				else player.skinTone = "orange";
				outputText("begins to lose its color, fading until you're as white as an albino. Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + player.skinTone + ".");
				changes++;
			}
			gameFlags[TIMES_TRANSFORMED] += changes;
		}
		
		export const ImpFood  = new Item("ImpFood", "Imp Food", "a parcel of imp food", ITEM_TYPE_CONSUMABLE);
		ImpFood.description   = "This is a small parcel of reddish-brown bread stuffed with some kind of meat. It smells delicious.";
		ImpFood.consumeEffect = impTFs;
		
	}
}

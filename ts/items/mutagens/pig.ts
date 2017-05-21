/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function pigTFs(boar: boolean) {
			let changes     = 0;
			let changeLimit = 1;
			const temp      = 0;
			const x         = 0;
			if (rand(2) == 0) changeLimit++;
			if (rand(3) == 0) changeLimit++;
			if (boar) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			outputText("You take a bite into the pigtail truffle. It oddly tastes like bacon. You eventually finish eating. ");
			player.refillHunger(20);
			//------------
			// BAD END!
			//------------
			/*if (rand(5) == 0 && player.pigScore() >= 5 && !player.hasPerk(PerkLib.TransformationResistance)) {
			 if (flags[PIG_BAD_END_WARNING] == 0) {
			 outputText("<br><br>You find yourself idly daydreaming of flailing about in the mud, letting go of all of your troubles. Eventually, you shake off the thought. Why would you do something like that? Maybe you should cut back on all the truffles?");
			 player.dynStats("inte", -3);
			 }
			 else {
			 outputText("<br><br>As you down the last of your truffle, your entire body begins to convulse violently. Your vision becomes blurry, and you black out.");
			 outputText("<br><br>When you awaken, you are greeted by a large dog licking at your face. The dog seems oddly familiar. \"<i>Bessy, whatcha doin’ girl?</i>\" a voice calls. The voice seems familiar as well. A funny-looking pig on two legs soon appears at the dog’s side. \"<i>Now, now, what do we have here?</i>\" The pig inspects you for a moment, eventually finding a hint of pigtail truffle on your snout.");
			 outputText("<br><br>\"<i>Ah no...</i>\" he says sadly, shaking his head. \"<i>Come with me little " + player.mf("guy", "gal") + ",  I’ve got a place for ya.</i>\"  He then leads you to his shack, nestled in a small clearing in a nearby forest. \"<i>You don’t need ‘ta worry about a thing.  Come ‘ta think of it...</i>\"  he taps his chin for a moment,  \"<i>I know what I could use you for. You could be my own personal truffle hog! The more truffles, the better!</i>\"");
			 outputText("<br><br>You take wonderfully to your new job. Finding truffles is fun, and the funny pig takes great care of you. You couldn’t ask for better. Sure, the world is full of demons and the like, but here, you’re safe, and that’s all you care about.");
			 gameOver();
			 return;
			 }
			 }*/
			//------------
			// SIZE MOD
			//------------
			//Increase thickness
			if (rand(3) == 0 && changes < changeLimit && player.thickness < 75) {
				outputText(player.modThickness(75, 3));
				changes++;
			}
			//Decrease muscle tone
			if (rand(3) == 0 && changes < changeLimit && player.gender >= 2 && player.tone > 20) {
				outputText(player.modTone(20, 4));
				changes++;
			}
			//Increase hip rating
			if (rand(3) == 0 && changes < changeLimit && player.gender >= 2 && player.hipRating < 15) {
				outputText("<br><br>Your gait shifts slightly to accommodate your widening " + player.hipDescript() + ". The change is subtle, but they're definitely broader.");
				player.hipRating++;
				changes++;
			}
			//Increase ass rating
			if (rand(3) == 0 && changes < changeLimit && player.buttRating < 12) {
				outputText("<br><br>When you stand back, up your [ass] jiggles with a good bit of extra weight.");
				player.buttRating++;
				changes++;
			}
			//Increase ball size if you have balls.
			if (rand(3) == 0 && changes < changeLimit && player.balls > 0 && player.ballSize < 4) {
				if (player.ballSize < 3)
					outputText("<br><br>A flash of warmth passes through you and a sudden weight develops in your groin. You pause to examine the changes and your roving fingers discover your " + (player.balls == 4 ? "quartette" : "duo") + " of [balls] have grown larger than a human’s.");
				else
					outputText("<br><br>A sudden onset of heat envelops your groin, focusing on your ballsack. Walking becomes difficult as you discover your " + (player.balls == 4 ? "quartette" : "duo") + " of testicles have enlarged again.");
				player.ballSize++;
				changes++;
			}
			//------------
			// MAIN TFs
			//------------
			//Gain pig cock, independent of other pig TFs.
			if (rand(4) == 0 && changes < changeLimit && player.cocks.length > 0 && player.cocks[0].cockType != CockTypesEnum.PIG) {
				if (player.cocks.length == 1) { //Single cock
					outputText("<br><br>You feel an uncomfortable pinching sensation in your [cock]. " + player.clothedOrNakedLower("You pull open your [armor]", "You look down at your exposed groin") + ", watching as it warps and changes. As the transformation completes, you’re left with a shiny, pinkish red pecker ending in a prominent corkscrew at the tip. <b>You now have a pig penis!</b>");
					player.cocks[0].cockType = CockTypesEnum.PIG;
				}
				else { //Multiple cocks
					outputText("<br><br>You feel an uncomfortable pinching sensation in one of your cocks. You pull open your [armor], watching as it warps and changes. As the transformation completes, you’re left with a shiny pinkish red pecker ending in a prominent corkscrew at the tip. <b>You now have a pig penis!</b>");
					player.cocks[rand(player.cocks.length + 1)].cockType = CockTypesEnum.PIG;
				}
				changes++;
			}
			//Gain pig ears!
			if (rand(boar ? 3 : 4) == 0 && changes < changeLimit && player.earType != EarType.PIG) {
				outputText("<br><br>You feel a pressure on your ears as they begin to reshape. Once the changes finish, you flick them about experimentally, <b>and you’re left with pointed, floppy pig ears.</b>");
				player.earType = EarType.PIG;
				changes++;
			}
			//Gain pig tail if you already have pig ears!
			if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EarType.PIG && player.tailType != TailType.PIG) {
				if (player.tailType > 0) //If you have non-pig tail.
					outputText("<br><br>You feel a pinching sensation in your [tail] as it begins to warp in change. When the sensation dissipates, <b>you are left with a small, curly pig tail.</b>");
				else //If you don't have a tail.
					outputText("<br><br>You feel a tug at the base of your spine as it lengthens ever so slightly. Looking over your shoulder, <b>you find that you have sprouted a small, curly pig tail.</b>");
				player.tailType = TailType.PIG;
				changes++;
			}
			//Gain pig tail even when centaur, needs pig ears.
			if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EarType.PIG && player.tailType != TailType.PIG && player.isTaur() && (player.lowerBody == LowerBodyType.HOOFED || player.lowerBody == LowerBodyType.PONY)) {
				outputText("<br><br>There is a tingling in your [tail] as it begins to warp and change. When the sensation dissipates, <b>you are left with a small, curly pig tail.</b> This new, mismatched tail looks a bit odd on your horse lower body.");
				player.tailType = TailType.PIG;
				changes++;
			}
			//Turn your lower body into pig legs if you have pig ears and tail.
			if (rand(boar ? 3 : 4) == 0 && changes < changeLimit && player.earType == EarType.PIG && player.tailType == TailType.PIG && player.lowerBody != LowerBodyType.CLOVEN_HOOFED) {
				if (player.isTaur()) //Centaur
					outputText("<br><br>You scream in agony as a horrible pain racks your entire bestial lower half. Unable to take it anymore, you pass out. When you wake up, you’re shocked to find that you no longer have the animal's lower body. Instead, you only have two legs. They are digitigrade and end in cloven hooves. <b>You now have pig legs!</b>");
				else if (player.lowerBody == LowerBodyType.NAGA) //Naga
					outputText("<br><br>You scream in agony as a horrible pain racks the entire length of your snake-like coils. Unable to take it anymore, you pass out. When you wake up, you’re shocked to find that you no longer have the lower body of a snake. Instead, you only have two legs. They are digitigrade and end in cloven hooves. <b>You now have pig legs!</b>");
				else //Bipedal
					outputText("<br><br>You scream in agony as the bones in your legs break and rearrange. Once the pain subsides, you inspect your legs, finding that they are digitigrade and ending in cloven hooves. <b>You now have pig legs!</b>");
				player.lowerBody = LowerBodyType.CLOVEN_HOOFED;
				player.legCount  = 2;
				changes++;
			}
			//Gain pig face when you have the first three pig TFs.
			if (rand(boar ? 2 : 3) == 0 && changes < changeLimit && player.earType == EarType.PIG && player.tailType == TailType.PIG && player.lowerBody == LowerBodyType.CLOVEN_HOOFED && (player.faceType != FaceType.PIG && player.faceType != FaceType.BOAR)) {
				outputText("<br><br>You cry out in pain as the bones in your face begin to break and rearrange. You rub your face furiously in an attempt to ease the pain, but to no avail. As the sensations pass, you examine your face in a nearby puddle. <b>You nearly gasp in shock at the sight of your new pig face!</b>");
				player.faceType = FaceType.PIG;
				changes++;
			}
			//Gain boar face if you have pig face.
			if (rand(3) == 0 && changes < changeLimit && player.earType == EarType.PIG && player.tailType == TailType.PIG && player.lowerBody == LowerBodyType.CLOVEN_HOOFED && player.faceType == FaceType.PIG) {
				outputText("<br><br>You cry out in pain as the bones in your face begin to break and rearrange. You rub your face furiously in an attempt to ease the pain, but to no avail. Your bottom teeth ache as well. What’s happening to you? As the sensations pass, you examine your face in a nearby puddle. <b>You nearly gasp in shock at the sight of your new tusky boar face!</b>");
				player.faceType = FaceType.BOAR;
				changes++;
			}
			//Change skin colour
			if (rand(boar ? 3 : 4) == 0 && changes < changeLimit) {
				const skinChoose   = rand(3);
				let skinToBeChosen = "pink";
				if (boar) {
					if (skinChoose == 0) skinToBeChosen = "dark brown";
					else skinToBeChosen = "brown";
				}
				else {
					if (skinChoose == 0) skinToBeChosen = "pink";
					else if (skinChoose == 1) skinToBeChosen = "tan";
					else skinToBeChosen = "sable";
				}
				outputText("<br><br>Your skin tingles ever so slightly as you skin’s color changes before your eyes. As the tingling diminishes, you find that your skin has turned " + skinToBeChosen + ".");
				player.skinTone = skinToBeChosen;
				changes++;
			}
			if (changes == 0) {
				outputText("<br><br>Oddly, you do not feel any changes. Perhaps you're lucky? Or not.");
			}
			gameFlags[TIMES_TRANSFORMED] += changes;
		}
		
		export const PigTruffle  = new Item("PigTruf", "Pig Truffle", "a pigtail truffle", ITEM_TYPE_CONSUMABLE);
		PigTruffle.description   = "It's clear where this fungus gets its name. A small, curly sprig resembling a pig's tail can be seen jutting out of it.";
		PigTruffle.consumeEffect = () => pigTFs;
		
	}
}

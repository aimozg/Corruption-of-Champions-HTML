/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function snakeTFs(): void {
			player.slimeFeed();
			clearOutput();
			let changes     = 0;
			let changeLimit = 1;
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//b) Description while used
			outputText("Pinching your nose, you quickly uncork the vial and bring it to your mouth, determined to see what effects it might have on your body. Pouring in as much as you can take, you painfully swallow before going for another shot, emptying the bottle.");
			//(if outside combat)
			if (!inCombat()) outputText("  Minutes pass as you start wishing you had water with you, to get rid of the aftertaste.");
			//+ speed to 70!
			if (player.spe < 70 && rand(2) == 0) {
				player.dynStats("spe", (2 - (player.spe / 10 / 5)));
				outputText("<br><br>Your muscles quiver, feeling ready to strike as fast as a snake!");
				if (player.spe < 40) outputText("  Of course, you're nowhere near as fast as that.");
				changes++;
			}
			//Removed Oviposition update check. Just returns zero for this transformation.
			//Removes wings
			if (player.wingType > WingType.NONE && rand(3) == 0 && changes < changeLimit) {
				if (player.wingType == WingType.SHARK_FIN) outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into your spine.  After a moment the pain passes, though your fin is gone!");
				else outputText("<br><br>A wave of tightness spreads through your back, and it feels as if someone is stabbing a dagger into each of your shoulder-blades.  After a moment the pain passes, though your wings are gone!");
				player.wingType = WingType.NONE;
				changes++;
			}
			//Removes antennae
			if (player.antennae > AntennaeType.NONE && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>The muscles in your brow clench tightly, and you feel a tremendous pressure on your upper forehead.  When it passes, you touch yourself and discover your antennae have vanished!");
				player.antennae = AntennaeType.NONE;
				changes++;
			}
			//9c) II The tongue (sensitivity bonus, stored as a perk?)
			if (changes == 0 && rand(3) == 0) {
				if (player.tongueType != TongueType.SNAKE && changes < changeLimit) {
					if (player.tongueType == TongueType.HUMAN) {
						outputText("<br><br>Your taste-buds start aching as they swell to an uncomfortably large size. "
								   + "Trying to understand what in the world could have provoked such a reaction, you bring your hands up to your mouth, "
								   + "your tongue feeling like it's trying to push its way past your lips.");
						outputText("  The soreness stops and you stick out your tongue to try and see what would have made it feel the way it did. "
								   + "As soon as you stick your tongue out you realize that it sticks out much further than it did before, "
								   + "and now appears to have split at the end, creating a forked tip.");
						outputText("  <b>The scents in the air are much more noticeable to you with your snake-like tongue.</b>");
					} else {
						outputText("<br><br>Your inhuman tongue shortens, pulling tight in the very back of your throat.");
						outputText("  After a moment the bunched-up tongue-flesh begins to flatten out, then extend forwards.");
						outputText("  By the time the transformation has finished, <b>your tongue has changed into a long, forked snake-tongue.</b>");
					}
					player.tongueType = TongueType.SNAKE;
					player.dynStats("sens", 5);
					changes++;
				}
			}
			//9c) III The fangs
			if (changes == 0 && player.tongueType == TongueType.SNAKE && player.faceType != FaceType.SNAKE_FANGS && rand(3) == 0 && changes < changeLimit) {
				outputText("<br><br>Without warning, you feel your canine teeth jump almost an inch in size, clashing on your gums, cutting yourself quite badly. As you attempt to find a new way to close your mouth without dislocating your jaw, you notice that they are dripping with a bitter, khaki liquid.  Watch out, and <b>try not to bite your tongue with your poisonous fangs!</b>");
				if (player.faceType != FaceType.HUMAN && player.faceType != FaceType.SHARK_TEETH && player.faceType != FaceType.BUNNY && player.faceType != FaceType.SPIDER_FANGS) {
					outputText("  As the change progresses, your " + player.face() + " reshapes.  The sensation is far more pleasant than teeth cutting into gums, and as the tingling transformation completes, <b>you've gained with a normal-looking, human visage.</b>");
				}
				player.faceType = FaceType.SNAKE_FANGS;
				changes++;
			}
			//9c) I The tail ( http://tvtropes.org/pmwiki/pmwiki.php/Main/TransformationIsAFreeAction ) (Shouldn't we try to avert this? -Ace)
			//Should the enemy "kill" you during the transformation, it skips the scene and immediately goes to tthe rape scene. (Now that I'm thinking about it, we should add some sort of appendix where the player realizes how much he's/she's changed. -Ace)
			if (changes == 0 && player.faceType == FaceType.SNAKE_FANGS && player.lowerBody != LowerBodyType.NAGA && rand(4) == 0 && changes < changeLimit) {
				outputText("<br><br>You find it increasingly harder to keep standing as your legs start feeling weak.  You swiftly collapse, unable to maintain your own weight.");
				//(If used in combat, you lose a turn here. Half-corrupted Jojo and the Naga won't attack you during that period, but other monsters will)
				//FUCK NO
				outputText("<br><br>Trying to get back up, you realize that the skin on the inner sides of your thighs is merging together like it was being sewn by an invisible needle.");
				outputText("  The process continues through the length of your " + player.legs() + ", eventually reaching your " + player.feet() + ".  Just when you think that the transformation is over, you find yourself pinned to the ground by an overwhelming sensation of pain. You hear the horrible sound of your bones snapping, fusing together and changing into something else while you contort in unthinkable agony.  Sometime later you feel the pain begin to ease and you lay on the ground, spent by the terrible experience. Once you feel you've recovered, you try to stand, but to your amazement you discover that you no longer have " + player.legs() + ": the bottom half of your body is like that of a snake's.");
				outputText("<br><br>Wondering what happened to your sex, you pass your hand down the front of your body until you find a large, horizontal slit around your pelvic area, which contains all of your sexual organs.");
				if (player.balls > 0 && player.ballSize > 10) outputText("  You're happy not to have to drag those testicles around with you anymore.");
				outputText("  But then, scales start to form on the surface of your skin, slowly becoming visible, recoloring all of your body from the waist down in a snake-like pattern. The feeling is... not that bad actually, kind of like callous, except on your whole lower body. The transformation complete, you get up, standing on your newly formed snake tail. You can't help feeling proud of this majestic new body of yours.");
				player.lowerBody = LowerBodyType.NAGA;
				player.legCount  = 1;
				changes++;
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			
			//9e) Penis
			/*
			 if (player.cockTotal() > 0) {
			 //(If multiple penis, insert "one of your")
			 outputText("<br><br>As the liquid takes effect, ");
			 //(if multicock)
			 if (player.cockTotal() > 1) outputText("one of ");
			 outputText("your " + player.multiCockDescriptLight() + " starts to throb painfully and swell to its full size.  With a horrifying ripping sensation, your cock splits down the middle, the pain causing you to black out momentarily.");
			 outputText("When you awaken, you quickly look down to see that where ");
			 //(if multicock)
			 if (player.cockTotal() > 1) outputText("one of ");
			 outputText("your " + player.multiCockDescriptLight() + " was, you now have two pointed reptilian cocks, still stiff and pulsing.");
			 }*/
			//Default change - blah
			if (changes == 0) outputText("<br><br>Remakarbly, the snake-oil has no effect.  Should you really be surprised at snake-oil NOT doing anything?");
			player.refillHunger(5);
		}
		
		export const SnakeOil  = new Item("SnakeOil", "Snake Oil", "a vial of snake oil", ITEM_TYPE_CONSUMABLE);
		SnakeOil.description   = "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.";
		SnakeOil.consumeEffect = snakeTFs;
		
	}
}

/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function harpyTFs(type: number): void {
			//I think these are old debugging variables
			//var tfSource = "goldenSeed";
			//if (player.hasPerk(PerkLib.HarpyWomb)) tfSource += "-HarpyWomb";
			//'type' refers to the variety of seed.
			//0 == standard.
			//1 == enhanced - increase change limit and no pre-reqs for TF
			let changes     = 0;
			let changeLimit = 1;
			if (type == 1) changeLimit += 2;
			if (rand(2) == 0) changeLimit++;
			if (rand(2) == 0) changeLimit++;
			if (player.hasPerk(PerkLib.HistoryAlchemist)) changeLimit++;
			if (player.hasPerk(PerkLib.TransformationResistance)) changeLimit--;
			//Generic eating text:
			clearOutput();
			outputText("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!");
			//****************
			//Stats:
			//****************
			//-Speed increase to 100.
			if (player.spe < 100 && rand(3) == 0) {
				changes++;
				if (player.spe >= 75) outputText("<br><br>A familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.");
				else outputText("<br><br>A chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.");
				//Speed gains diminish as it rises.
				if (player.spe < 40) player.dynStats("spe", .5);
				if (player.spe < 75) player.dynStats("spe", .5);
				player.dynStats("spe", .5);
			}
			//-Toughness decrease to 50
			if (player.tou > 50 && rand(3) == 0 && changes < changeLimit) {
				changes++;
				if (rand(2) == 0) outputText("<br><br>A nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.");
				else outputText("<br><br>You feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?");
				player.dynStats("tou", -1);
			}
			//antianemone corollary:
			if (changes < changeLimit && player.hairType == 4 && rand(2) == 0) {
				//-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
				outputText("<br><br>As you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery strands.  <b>Your hair is now like that of a harpy!</b>");
				player.hairType = 1; //TODO Is This Hairtype Correct?
				changes++;
			}
			//-Strength increase to 70
			if (player.str < 70 && rand(3) == 0 && changes < changeLimit) {
				changes++;
				//(low str)
				if (player.str < 40) outputText("<br><br>Shivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.");
				//(hi str – 50+)
				else outputText("<br><br>Heat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.");
				//Faster until 40 str.
				if (player.str < 40) player.dynStats("str", .5);
				player.dynStats("str", .5);
			}
			//-Libido increase to 90
			if ((player.lib < 90 || rand(3) == 0) && rand(3) == 0 && changes < changeLimit) {
				changes++;
				if (player.lib < 90) player.dynStats("lib", 1);
				//(sub 40 lib)
				if (player.lib < 40) {
					outputText("<br><br>A passing flush colors your " + player.face() + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.");
					if (player.hasVagina()) outputText(" The moistness of your " + player.vaginaDescript() + " seems to agree.");
					else if (player.hasCock()) outputText(" The hardness of " + player.sMultiCockDesc() + " seems to agree.");
					player.changeLust(5);
				}
				//(sub 75 lib)
				else if (player.lib < 75) outputText("<br><br>Heat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.<br><br>");
				//(hi lib)
				else if (player.lib < 90) outputText("<br><br>Sexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.<br><br>");
				//(90+)
				else outputText("<br><br>You groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.<br><br>");
				//(fork to fantasy)
				if (player.lib >= 40) {
					player.changeLust(player.lib / 5 + 10);
					
					//(herm – either or!)
					//Cocks!
					if (player.hasCock() && (player.gender != 3 || rand(2) == 0)) {
						//(male 1)
						if (rand(2) == 0) {
							outputText("In your fantasy you're winging through the sky, " + player.sMultiCockDesc() + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + player.hairDescript() + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ");
							if (player.cockTotal() > 1) {
								outputText("The extra penis");
								if (player.cockTotal() > 2) outputText("es rub ");
								else outputText("rubs ");
								outputText("the skin over her taut, empty belly, drooling your need atop her.  ");
								outputText("You jolt from the vision unexpectedly, finding your " + player.sMultiCockDesc() + " is as hard as it was in the dream. The inside of your " + player.armor.equipmentName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.");
							}
						}
						//(male 2)
						else {
							outputText("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + player.sMultiCockDesc() + " inside your " + player.armor.equipmentName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.");
						}
					}
					//Cunts!
					else if (player.hasVagina()) {
						//(female 1)
						if (rand(2) == 0) {
							outputText("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ");
							if (player.hasFuckableNipples()) outputText("and pussy leaking over ");
							else if (player.biggestLactation() >= 1.5) outputText("dripping milk inside ");
							else outputText("rubbing inside ");
							outputText("your " + player.armor.equipmentName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?");
						}
						//(female 2)
						else {
							outputText("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males – mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + player.nippleDescript(0) + "s pull you out of the fantasy as they rub inside your " + player.armor.equipmentName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.");
						}
					}
				}
			}
			//****************
			//   Sexual:
			//****************
			//-Grow a cunt (guaranteed if no gender)
			if (player.gender == 0 || (!player.hasVagina() && changes < changeLimit && rand(3) == 0)) {
				changes++;
				//(balls)
				if (player.balls > 0) outputText("<br><br>An itch starts behind your " + player.ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + player.sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
				//(dick)
				else if (player.hasCock()) outputText("<br><br>An itch starts on your groin, just below your " + player.multiCockDescriptLight() + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
				//(neither)
				else outputText("<br><br>An itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armor.equipmentName + " to discover your brand new vagina, complete with pussy lips and a tiny clit.</b>");
				player.createVagina();
				player.clitLength = .25;
				player.dynStats("sens", 10);
				player.genderCheck();
			}
			//-Remove extra breast rows
			if (changes < changeLimit && player.breastRows.length > 1 && rand(3) == 0 && !gameFlags[HYPER_HAPPY]) {
				changes++;
				outputText("<br><br>You stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + player.breastDescript(player.breastRows.length - 1) + " shrink down, disappearing completely into your ");
				if (player.breastRows.length >= 3) outputText("abdomen");
				else outputText("chest");
				outputText(". The " + player.nippleDescript(player.breastRows.length - 1) + "s even fade until nothing but ");
				if (player.skinType == SkinType.FUR) outputText(player.hairColor + " " + player.skinDesc);
				else outputText(player.skinTone + " " + player.skinDesc);
				outputText(" remains. <b>You've lost a row of breasts!</b>");
				player.dynStats("sens", -5);
				player.removeBreastRow(player.breastRows.length - 1, 1);
			}
			//-Shrink tits if above DDs.
			//Cannot happen at same time as row removal
			else if (changes < changeLimit && player.breastRows.length == 1 && rand(3) == 0 && player.breastRows[0].breastRating >= 7 && !gameFlags[HYPER_HAPPY]) {
				changes++;
				//(Use standard breast shrinking mechanism if breasts are under 'h')
				if (player.breastRows[0].breastRating < 19) {
					player.shrinkTits();
				}
				//(H+)
				else {
					player.breastRows[0].breastRating -= (4 + rand(4));
					outputText("<br><br>Your chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + player.breastCup(0) + "s.");
				}
			}
			//-Grow tits to a B-cup if below.
			if (changes < changeLimit && player.breastRows[0].breastRating < 2 && rand(3) == 0) {
				changes++;
				outputText("<br><br>Your chest starts to tingle, the " + player.skinDesc + " warming under your " + player.armor.equipmentName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.");
				if (player.breastRows[0].breastRating < 1) outputText("  <b>You have breasts now!</b>");
				player.breastRows[0].breastRating = 2;
			}
			//Change cock if you have a penis.
			if (changes < changeLimit && player.hasCock() && player.countCocksOfType(CockTypesEnum.AVIAN) < player.cockTotal() && rand(type == 1 ? 4 : 10) == 0) { //2.5x chance if magic seed.
				changes++;
				outputText("<br><br>You feel a strange tingling sensation in your cock as erection forms. You " + player.clothedOrNakedLower("open up your " + player.armor.equipmentName + " and", "") + " look down to see " + (player.cockTotal() == 1 ? "your cock" : "one of your cocks") + " shifting! By the time the transformation's complete, you notice it's tapered, red, and ends in a tip. When you're not aroused, your cock rests nicely in a newly-formed sheath. <b>You now have an avian penis!</b>");
				for (let i = 0; i < player.cocks.length; i++) {
					if (player.cocks[i].cockType != CockTypesEnum.AVIAN) {
						player.cocks[i].cockType = CockTypesEnum.AVIAN;
						return;
					}
				}
			}
			//if (rand(5) == 0) updateOvipositionPerk(tfSource); Shouldn't need this
			//****************
			//General Appearance:
			//****************
			//-Femininity to 85
			if (player.femininity < 85 && changes < changeLimit && rand(3) == 0) {
				changes++;
				outputText(player.modFem(85, 3 + rand(5)));
			}
			//-Skin color change – tan, olive, dark, light
			if ((player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "dark" && player.skinTone != "light") && changes < changeLimit && rand(5) == 0) {
				changes++;
				outputText("<br><br>It takes a while for you to notice, but <b>");
				if (player.skinType == SkinType.FUR) outputText("the skin under your " + player.hairColor + " " + player.skinDesc);
				else outputText("your " + player.skinDesc);
				outputText(" has changed to become ");
				const temp = rand(4);
				if (temp == 0) player.skinTone = "tan";
				else if (temp == 1) player.skinTone = "olive";
				else if (temp == 2) player.skinTone = "dark";
				else if (temp == 3) player.skinTone = "light";
				outputText(player.skinTone + " colored.</b>");
				Mutations.updateClaws(player.clawType);
			}
			//-Grow hips out if narrow.
			if (player.hipRating < 10 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>Your gait shifts slightly to accommodate your widening " + player.hipDescript() + ". The change is subtle, but they're definitely broader.");
				player.hipRating++;
				changes++;
			}
			//-Narrow hips if crazy wide
			if (player.hipRating >= 15 && changes < changeLimit && rand(3) == 0) {
				outputText("<br><br>Your gait shifts inward, your " + player.hipDescript() + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.");
				player.hipRating--;
				changes++;
			}
			//-Big booty
			if (player.buttRating < 8 && changes < changeLimit && rand(3) == 0) {
				player.buttRating++;
				changes++;
				outputText("<br><br>A slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + player.armor.equipmentName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + player.buttDescript() + ".");
			}
			//-Narrow booty if crazy huge.
			if (player.buttRating >= 14 && changes < changeLimit && rand(4) == 0) {
				changes++;
				player.buttRating--;
				outputText("<br><br>A feeling of tightness starts in your " + player.buttDescript() + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.");
			}
			//-Body thickness to 25ish
			if (player.thickness > 25 && changes < changeLimit && rand(3) == 0) {
				outputText(player.modThickness(25, 3 + rand(4)));
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
			//****************
			//Harpy Appearance:
			//****************
			//-Harpy legs
			if (player.lowerBody != LowerBodyType.HARPY && changes < changeLimit && (type == 1 || player.tailType == TailType.HARPY) && rand(4) == 0) {
				//(biped/taur)
				if (!player.isGoo()) outputText("<br><br>Your " + player.legs() + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + player.feet() + " have changed.  ");
				//goo
				else outputText("<br><br>Your gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ");
				player.lowerBody = LowerBodyType.HARPY;
				player.legCount  = 2;
				changes++;
				//(cont)
				outputText("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + player.hairColor + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>");
			}
			//-Feathery Tail
			if (player.tailType != TailType.HARPY && changes < changeLimit && (type == 1 || player.wingType == WingType.FEATHERED_LARGE) && rand(4) == 0) {
				//(tail)
				if (player.tailType > TailType.NONE) outputText("<br><br>Your tail shortens, folding into the crack of your " + player.buttDescript() + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>");
				//(no tail)
				else outputText("<br><br>A tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + player.skinDesc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>");
				player.tailType = TailType.HARPY;
				changes++;
			}
			//-Propah Wings
			if (player.wingType == WingType.NONE && changes < changeLimit && (type == 1 || player.armType == ArmType.HARPY) && rand(4) == 0) {
				outputText("<br><br>Pain lances through your back, the muscles knotting oddly and pressing up to bulge your " + player.skinDesc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + player.armor.equipmentName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your brand new, " + player.hairColor + " wings.</b>");
				player.wingType = WingType.FEATHERED_LARGE;
				player.wingDesc = "large, feathered";
				changes++;
			}
			//-Remove old wings
			if (player.wingType != WingType.FEATHERED_LARGE && player.wingType > WingType.NONE && changes < changeLimit && rand(4) == 0) {
				if (player.wingType != WingType.SHARK_FIN) outputText("<br><br>Sensation fades from your " + player.wingDesc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
				else outputText("<br><br>Sensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
				player.wingType = WingType.NONE;
				player.wingDesc = "non-existant";
				changes++;
			}
			//-Feathery Arms
			if (player.armType != ArmType.HARPY && changes < changeLimit && (type == 1 || player.hairType == 1) && rand(4) == 0) {
				outputText("<br><br>You smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + player.skinDesc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + player.skinDesc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.");
				changes++;
				player.armType = ArmType.HARPY;
				Mutations.updateClaws();
			}
			//-Feathery Hair
			if (player.hairType != 1 && changes < changeLimit && (type == 1 || player.faceType == FaceType.HUMAN) && rand(4) == 0) {
				outputText("<br><br>A tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery strands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!");
				player.hairType = 1;
				changes++;
			}
			//-Human face
			if (player.faceType != FaceType.HUMAN && changes < changeLimit && (type == 1 || (player.earType == EarType.HUMAN || player.earType == EarType.ELFIN)) && rand(4) == 0) {
				outputText("<br><br>Sudden agony sweeps over your " + player.face() + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.");
				player.faceType = FaceType.HUMAN;
				changes++;
			}
			//-Gain human ears (keep elf ears)
			if ((player.earType != EarType.HUMAN && player.earType != EarType.ELFIN) && changes < changeLimit && rand(4) == 0) {
				outputText("<br><br>Ouch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!");
				player.earType = EarType.HUMAN;
				changes++;
			}
			if (rand(4) == 0 && player.gills && changes < changeLimit) {
				outputText("<br><br>Your chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
				player.gills = false;
				changes++;
			}
			//SPECIAL:
			//Harpy Womb – All eggs are automatically upgraded to large, requires legs + tail to be harpy.
			if (!player.hasPerk(PerkLib.HarpyWomb) && player.lowerBody == LowerBodyType.HARPY && player.tailType == TailType.HARPY && rand(4) == 0 && changes < changeLimit) {
				player.createPerk(PerkLib.HarpyWomb, 0, 0, 0, 0);
				outputText("<br><br>There's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)");
				changes++;
			}
			if (changes < changeLimit && rand(4) == 0 && ((player.ass.analWetness > 0 && !player.hasPerk(PerkLib.MaraesGiftButtslut)) || player.ass.analWetness > 1)) {
				outputText("<br><br>You feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
				player.ass.analWetness--;
				if (player.ass.analLooseness > 1) player.ass.analLooseness--;
				changes++;
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
			if (changes == 0) outputText("<br><br>Aside from being a tasty treat, it doesn't seem to do anything to you this time.");
			player.refillHunger(10);
			gameFlags[TIMES_TRANSFORMED] += changes;
		}
		
		export const GoldenSeed  = new Item("G.Seed", "Golden Seed", "a golden seed", ITEM_TYPE_CONSUMABLE);
		GoldenSeed.description   = "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.";
		GoldenSeed.consumeEffect = () => harpyTFs(0);
		
	}
}

/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Items {
	export namespace Consumables {
		
		function slimeTFs(): void {
			let tfSource = "gooGasmic";
			clearOutput();
			outputText("You take the wet cloth in hand and rub it over your body, smearing the strange slime over your " + player.skinDesc + " slowly.");
			//Stat changes
			//libido up to 80
			if (player.lib < 80) {
				player.dynStats("lib", (.5 + (90 - player.lib) / 10));
				player.changeLust(player.lib / 2);
				outputText("<br><br>Blushing and feeling horny, you make sure to rub it over your chest and erect nipples, letting the strange slimy fluid soak into you.");
			}
			//sensitivity moves towards 50
			if (player.sens < 50) {
				outputText("<br><br>The slippery slime soaks into your " + player.skinDesc + ", making it tingle with warmth, sensitive to every touch.");
				player.dynStats("sens", 1);
			}
			else if (player.sens > 50) {
				outputText("<br><br>The slippery slime numbs your " + player.skinDesc + " slightly, leaving behind only gentle warmth.");
				player.dynStats("sens", -1);
			}
			//Commented out in the original
			/*Calculate goopiness
			 var goopiness:Number = 0;
			 if (player.skinType == SkinType.GOO) goopiness+=2;
			 if (player.hair.indexOf("gooey") != -1) goopiness++;
			 if (player.hasVagina()) {
			 if (player.vaginalCapacity() >= 9000) goopiness++;
			 }*/
			//Cosmetic changes based on 'goopyness'
			// Standard Ovipoisitor removal
			if (rand(5) == 0 && /*changes >= changeLimit && */player.hasPerk(PerkLib.Oviposition) && player.lizardScore() < 8) {
				outputText("<br><br>Another change in your uterus ripples through your reproductive systems. Somehow you know you've lost a little bit of reptilian reproductive ability.<br>");
				outputText("(<b>Perk Lost: Oviposition</b>)<br>");
				player.removePerk(PerkLib.Oviposition)
			}
			//Remove wings
			if (player.wingType > WingType.NONE) {
				if (player.wingType == WingType.SHARK_FIN) outputText("<br><br>You sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your fin slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
				else outputText("<br><br>You sigh, feeling a hot wet tingling down your back.  It tickles slightly as you feel your wings slowly turn to sludge, dripping to the ground as your body becomes more goo-like.");
				player.wingType = WingType.NONE;
			}
			//Goopy hair
			if (player.hairType != 3) {
				player.hairType = 3;
				//if bald
				if (player.hairLength <= 0) {
					outputText("<br><br>Your head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover you've grown some kind of gooey hair.  From time to time it drips, running down your back to the crack of your " + player.buttDescript() + ".");
					player.hairLength = 5;
				}
				else {
					//if hair isnt rubbery or latexy
					if (player.hairColor.indexOf("rubbery") == -1 && player.hairColor.indexOf("latex-textured") == -1) {
						outputText("<br><br>Your head buzzes pleasantly, feeling suddenly hot and wet.  You instinctively reach up to feel the source of your wetness, and discover your hair has become a slippery, gooey mess.  From time to time it drips, running down your back to the crack of your " + player.buttDescript() + ".");
					}
					//Latexy stuff
					else {
						outputText("<br><br>Your oddly inorganic hair shifts, becoming partly molten as rivulets of liquid material roll down your back.  How strange.");
					}
				}
				if (player.hairColor != "green" && player.hairColor != "purple" && player.hairColor != "blue" && player.hairColor != "cerulean" && player.hairColor != "emerald") {
					outputText("  Stranger still, the hue of your semi-liquid hair changes to ");
					let blah = rand(10);
					if (blah <= 2) player.hairColor = "green";
					else if (blah <= 4) player.hairColor = "purple";
					else if (blah <= 6) player.hairColor = "blue";
					else if (blah <= 8) player.hairColor = "cerulean";
					else player.hairColor = "emerald";
					outputText(player.hairColor + ".");
				}
				player.changeLust(10);
			}
			//1.Goopy skin
			if (player.hairType == 3 && (player.skinDesc != "skin" || player.skinAdj != "slimy")) {
				if (player.skinType == SkinType.PLAIN) outputText("<br><br>You sigh, feeling your " + player.armorName + " sink into you as your skin becomes less solid, gooey even.  You realize your entire body has become semi-solid and partly liquid!");
				else if (player.skinType == SkinType.FUR) outputText("<br><br>You sigh, suddenly feeling your fur become hot and wet.  You look down as your " + player.armorName + " sinks partway into you.  With a start you realize your fur has melted away, melding into the slime-like coating that now serves as your skin.  You've become partly liquid and incredibly gooey!");
				else if (player.skinType == SkinType.SCALES) outputText("<br><br>You sigh, feeling slippery wetness over your scales.  You reach to scratch it and come away with a slippery wet coating.  Your scales have transformed into a slimy goop!  Looking closer, you realize your entire body has become far more liquid in nature, and is semi-solid.  Your " + player.armorName + " has even sunk partway into you.");
				player.skinType = SkinType.GOO;
				player.skinDesc = "skin";
				player.skinAdj  = "slimy";
				if (player.skinTone != "green" && player.skinTone != "purple" && player.skinTone != "blue" && player.skinTone != "cerulean" && player.skinTone != "emerald") {
					outputText("  Stranger still, your skintone changes to ");
					const blaht = rand(10);
					if (blaht <= 2) player.skinTone = "green";
					else if (blaht <= 4) player.skinTone = "purple";
					else if (blaht <= 6) player.skinTone = "blue";
					else if (blaht <= 8) player.skinTone = "cerulean";
					else player.skinTone = "emerald";
					outputText(player.skinTone + "!");
					if (player.armType != ArmType.HUMAN || player.clawType != ClawType.NORMAL) Mutations.restoreArms(tfSource);
				}
				
			}
			////1a.Make alterations to dick/vaginal/nippular descriptors to match
			//DONE EXCEPT FOR TITS & MULTIDICKS (UNFINISHED KINDA)
			//2.Goo legs
			if (player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody != LowerBodyType.GOO) {
				outputText("<br><br>Your viewpoint rapidly drops as everything below your " + player.buttDescript() + " and groin melts together into an amorphous blob.  Thankfully, you discover you can still roll about on your new slimey undercarriage, but it's still a whole new level of strange.");
				player.tallness -= 3 + rand(2);
				if (player.tallness < 36) {
					player.tallness = 36;
					outputText("  The goo firms up and you return to your previous height.  It would truly be hard to get any shorter than you already are!");
				}
				player.lowerBody = LowerBodyType.GOO;
				player.legCount  = 1;
				
			}
			//3a. Grow vagina if none
			if (!player.hasVagina()) {
				outputText("<br><br>A wet warmth spreads through your slimey groin as a narrow gash appears on the surface of your groin.  <b>You have grown a vagina.</b>");
				player.createVagina();
				player.vaginas[0].vaginalWetness   = VAGINA_WETNESS_DROOLING;
				player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_GAPING;
				player.clitLength                  = .4;
				player.genderCheck();
				
				
			}
			//3b.Infinite Vagina
			if (player.vaginalCapacity() < 9000) {
				let s = player.findStatusEffectByType(StatusEffects.BonusVCapacity);
				if (!s) player.createStatusEffect(StatusEffects.BonusVCapacity, 9000, 0, 0, 0);
				else s.value1 += 9000;
				outputText("<br><br>Your " + player.vaginaDescript(0) + "'s internal walls feel a tingly wave of strange tightness.  Experimentally, you slip a few fingers, then your hand, then most of your forearm inside yourself.  <b>It seems you're now able to accommodate just about ANYTHING inside your sex.</b>");
				
			}
			else if (player.tallness < 100 && rand(3) <= 1) {
				outputText("<br><br>Your gel-like body swells up from the intake of additional slime.  If you had to guess, you'd bet you were about two inches taller.");
				player.tallness += 2;
				player.dynStats(["str", 1], ["tou", 1]);
			}
			//Big slime girl
			else {
				let s = player.findStatusEffectByType(StatusEffects.SlimeCraving);
				if (!s) {
					outputText("<br><br>You feel a growing gnawing in your gut.  You feel... hungry, but not for food.  No, you need something wet and goopy pumped into you.  You NEED it.  You can feel it in your bones.  <b>If you don't feed that need... you'll get weaker and maybe die.</b>");
					player.createStatusEffect(StatusEffects.SlimeCraving, 0, 0, 0, 1); //Value four indicates this tracks strength and speed separately
				}
				else {
					outputText("<br><br>You feel full for a moment, but you know it's just a temporary respite from your constant need to be 'injected' with fluid.");
					s.value1 = 0;
				}
			}
			if (rand(2) == 0) outputText(player.modFem(85, 3));
			if (rand(2) == 0) outputText(player.modThickness(20, 3));
			if (rand(2) == 0) outputText(player.modTone(15, 5));
		}
		
		export const WetCloth  = new Item("W.Cloth", "Wet Cloth", "a wet cloth dripping with slippery slime", ITEM_TYPE_CONSUMABLE);
		WetCloth.description   = "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.";
		WetCloth.consumeEffect = slimeTFs;
		
	}
}

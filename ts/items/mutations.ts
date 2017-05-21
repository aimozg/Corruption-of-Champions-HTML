/*
 * Created by aimozg on 21.05.2017.
 * Confidential until published on GitHub
 */
namespace Mutations {
	export function updateClaws(clawType: number = ClawType.NORMAL): string {
		let clawTone      = "";
		const oldClawTone = player.clawTone;
		
		switch (clawType) {
			case ClawType.DRAGON:
				clawTone = "steel-gray";
				break;
			case ClawType.SALAMANDER:
				clawTone = "fiery-red";
				break;
			case ClawType.LIZARD:
				// See http://www.bergenbattingcenter.com/lizard-skins-bat-grip/ for all those NYI! lizard skin colors
				// I'm still not that happy with these claw tones. Any suggestion would be nice.
				switch (player.skinTone) {
					case "red":
						clawTone = "reddish";
						break;
					case "green":
						clawTone = "greenish";
						break;
					case "white":
						clawTone = "light-gray";
						break;
					case "blue":
						clawTone = "bluish";
						break;
					case "black":
						clawTone = "dark-gray";
						break;
					case "purple":
						clawTone = "purplish";
						break;
					case "silver":
						clawTone = "silvery";
						break;
					case "pink":
						clawTone = "pink";
						break; // NYI! Maybe only with a new Skin Oil?
					case "orange":
						clawTone = "orangey";
						break; // NYI!
					case "yellow":
						clawTone = "yellowish";
						break; // NYI!
					case "desert-camo":
						clawTone = "pale-yellow";
						break; // NYI!
					case "gray-camo":
						clawTone = "gray";
						break; // NYI!
					default:
						clawTone = "gray";
						break;
				}
				break;
			default:
				clawTone = "";
		}
		
		player.clawType = clawType;
		player.clawTone = clawTone;
		
		return oldClawTone;
	}
	
	export function restoreArms(tfSource: string): number {
		//trace('called restoreArms("' + tfSource + '")');
		let message = "";
		
		if (tfSource == "gooGasmic") {
			// skin just turned gooey. Now lets fix unusual arms.
			const hasClaws = player.clawType != ClawType.NORMAL;
			
			message = "\n\n";
			if (player.armType == ArmType.HARPY) {
				message += "The feathers on your arms melt back into your now gooey skin.";
				if (hasClaws) message += " Additionally your now gooey claws melt back into your fingers.";
			} else if (hasClaws) {
				message += "Your now gooey claws melt back into your fingers.";
			}
			
			if (hasClaws) message += " Well, who cares, gooey claws aren't very useful in combat to begin with.";
			if (hasClaws || player.armType == ArmType.HARPY) outputText(message + "  <b>You have normal human arms again.</b>");
			
			updateClaws();
			player.armType = ArmType.HUMAN;
			return 1;
		}
		
		
		if (/*changes < changeLimit && */player.armType != ArmType.HUMAN) {
			if ([ArmType.HARPY, ArmType.SPIDER/*, ArmType.SALAMANDER*/].indexOf(player.armType) >= 0) //TODO Add Salamander Arm Type
				message += "\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.";
			
			switch (player.armType) {
				case ArmType.HARPY:
					message += "  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating."
							   + "  The wing-like shape your arms once had is gone in a matter of moments, leaving [skinfurscales] behind.";
					break;
				
				case ArmType.SPIDER:
					message += "  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away."
							   + "  The glossy black coating is soon gone, leaving [skinfurscales] behind.";
					break;
				
				/*case ArmType.SALAMANDER:
				 message += "  Glancing down in irritation, you discover that your once scaly arms are shedding their scales and that"
				 + " your claws become normal human fingernails again.";
				 break;
				 
				 case ArmType.PREDATOR: //TODO Add Predator Arm Type
				 switch (player.skinType) {
				 case SkinType.GOO:
				 if (player.clawType != ClawType.NORMAL)
				 message += "\n\nYour gooey claws melt into your fingers."
				 + " Well, who cares, gooey claws aren't very useful in combat to begin with.";
				 break;
				 
				 case SkinType.PLAIN:
				 case SkinType.FUR:
				 case SkinType.SCALES:
				 message += "\n\nYou feel a sudden tingle in your [claws] and then you realize,"
				 + " that they have become normal human fingernails again.";
				 break;
				 }
				 break;
				 */
				default:
					message += "\n\nYour unusual arms change more and more until they are normal human arms, leaving [skinfurscales] behind.";
			}
			outputText(message + "  <b>You have normal human arms again.</b>");
			updateClaws();
			player.armType = ArmType.HUMAN;
			// changes++;
			return 1;
		}
		
		return 0;
	}
}
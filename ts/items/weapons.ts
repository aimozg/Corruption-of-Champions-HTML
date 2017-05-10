namespace Items {
	export namespace Weapons {

		export const BeautifulSword = new Item("B.Sword", "B. Sword", "a beautiful sword", ITEM_TYPE_WEAPON);
		BeautifulSword.description = "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade. The pommel and guard are heavily decorated in gold and brass. Some craftsman clearly poured his heart and soul into this blade.";
		BeautifulSword.equipmentName = "beautiful sword";
		BeautifulSword.verb = "slash";
		BeautifulSword.value = 400;
		BeautifulSword.attack = 16;

		export const Pipe = new Item("Pipe", "Pipe", "a pipe", ITEM_TYPE_WEAPON);
		Pipe.description = "This is a simple rusted pipe of unknown origins. It's hefty and could probably be used as an effective bludgeoning tool.";
		Pipe.equipmentName = "pipe";
		Pipe.verb = "smash";
		Pipe.value = 25;
		Pipe.attack = 5;

		class WizardStaffClass extends Item {
			constructor() {
				super("W.Staff", "W. Staff", "a wizard's staff", ITEM_TYPE_WEAPON);
				this.description = "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use.";
				this.equipmentName = "wizard's staff";
				this.value = 350;
				this.attack = 3;
			}
			get verb():string {
				return (player.findPerk(PerkLib.StaffChanneling) >= 0 ? "shot" : "smack"); //TODO Test this
			}
		}
		export const WizardStaff = new WizardStaffClass();

// TODO Weapon also adds a perk. Need to see how to add this in upon equip. "Wizard's Focus", PerkLib.WizardsFocus, 0.4, 0, 0, 0
	}
}

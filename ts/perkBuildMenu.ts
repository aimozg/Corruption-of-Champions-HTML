namespace PerkMenuBuilder {
	let perksAvailable: PerkType[] = [];

	export function buildPerkList() {
		perksAvailable = [];
		//Strength Perks
		if (player.str >= 25) { perksAvailable.push(PerkLib.StrongBack); }
		if (player.str >= 50 && player.hasPerk(PerkLib.StrongBack)) { perksAvailable.push(PerkLib.StrongBack2); }
		//Toughness Perks
		if (player.tou >= 25) { perksAvailable.push(PerkLib.Tank); }
		if (player.tou >= 50 && player.hasPerk(PerkLib.Tank)) { perksAvailable.push(PerkLib.Tank2); }
		//Speed Perks
		if (player.spe >= 25) { perksAvailable.push(PerkLib.Evade); }
		if (player.spe >= 25) { perksAvailable.push(PerkLib.Runner); }
		//Intelligence Perks
		if (player.inte >= 25) { perksAvailable.push(PerkLib.Precision); }
		if (player.inte >= 25) { perksAvailable.push(PerkLib.Spellpower); }
		//Libido Perks

		//Corruption Perks

		return perksAvailable.filter(p => !player.hasPerk(p));
	}

}

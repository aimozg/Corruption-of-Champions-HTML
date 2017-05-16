//------------
// SPELLS
//------------
function magicMenu(): void {
	//Spells are housed within combatSpecial.js file.
	menu();
	//White Spells
	if (player.spells.blind) addButton(0, "Blind", spellBlind);
	if (player.spells.chargeWeapon) addButton(1, "Charge Weapon", spellChargeWeapon);
	if (player.spells.whitefire) addButton(2, "Whitefire", spellWhitefire);
	//Black Spells
	if (player.spells.arouse) addButton(5, "Arouse", spellArouse);
	if (player.spells.heal) addButton(6, "Heal", spellHeal);
	if (player.spells.might) addButton(7, "Might", spellMight);
	//Special
	if (player.hasPerk(PerkLib.CleansingPalm)) addButton(10, "CleansingPalm", spellCleansingPalm);
	addButton(14, "Back", battleMenu);
}

//White Spells
function spellBlind(): void {
	console.warn("TODO spellBlind()");
}
function spellChargeWeapon(silent: boolean = false): void {
	if (silent) {
		player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * spellMod(), 0, 0, 0);
		return;
	}
	if (!player.hasPerk(PerkLib.BloodMage) && player.fatigue + spellCost(15) > player.maxFatigue()) {
		outputText("You are too tired to cast this spell.");
		doNext(magicMenu);
		return;
	}
	player.changeFatigue(spellCost(15), false);
	outputText("You utter words of power, summoning an electrical charge around your " + player.weapon.equipmentName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.<br><br>");
	player.createStatusEffect(StatusEffects.ChargeWeapon, 10 * spellMod(), 0, 0, 0);
	gameFlags[SPELLS_CAST]++;
	spellPerkUnlock();
	monster.doAI();
}
function spellWhitefire(): void {
	console.warn("TODO spellWhite()");
}
//Black Spells
function spellArouse(): void {
	console.warn("TODO spellHeal()");
}
function spellHeal(): void {
	console.warn("TODO spellHeal()");
}
function spellMight(silent: boolean = false): void {
	console.warn("TODO spellMight()");
}
//Special Spells
function spellCleansingPalm(): void {
	console.warn("TODO spellCleansingPalm()");
}

//------------
// P. SPECIAL
//------------
function physicalSpecials(): void {
	menu();
	addButton(14, "Back", battleMenu);
}

//------------
// M. SPECIAL
//------------
function mentalSpecials(): void {
	menu();
	addButton(14, "Back", battleMenu);
}

//------------
// SPEC UTILS
//------------
function spellCost(cost: number): number {
	return cost;
}
function physicalCost(cost: number): number {
	return cost;
}
function spellMod(): number {
	return player.spellMod();
}

function spellPerkUnlock(): void {
	let perk = player.findPerkByType(PerkLib.SpellcastingAffinity);
	let n    = gameFlags[SPELLS_CAST];
	if (n >= 5 && !perk) {
		outputText("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b><br><br>");
		player.createPerk(PerkLib.SpellcastingAffinity, 20, 0, 0, 0);
	} else if (n >= 15 && perk && perk.value1 < 35) {
		outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>");
		perk.value1 = 35;
	}
	if (n >= 45 && perk && perk.value1 < 50) {
		outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b><br><br>");
		perk.value1 = 50;
	}
}
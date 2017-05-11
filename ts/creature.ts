type AttrName = "str" | "tou" | "spe" | "inte" | "lib" | "sens" | "cor" | "lust";
class Creature {
	//Name and references
	public a                                = "";
	public name                             = "";
	public refName                          = this.name;
	public isAre                            = "is";
	public heShe                            = "";
	public himHer                           = "";
	public hisHer                           = "";
	public plural                           = false;
	public battleDesc                       = "";
	//Core stats
	public str                              = 15;
	public tou                              = 15;
	public spe                              = 15;
	public inte                             = 15;
	public lib                              = 15;
	public sens                             = 15;
	public cor                              = 15;
	//Combat stats
	public HP                               = 0;
	public lust                             = 0;
	public fatigue                          = 0;
	//Advancement
	public level                            = 1;
	public XP                               = 0;
	public gems                             = 0;
	//Battle variables
	public weapon: Item                     = Items.NOTHING;
	public shield: Item                     = Items.NOTHING;
	public armor: Item                      = Items.NOTHING;
	public upperGarment: Item               = Items.NOTHING;
	public lowerGarment: Item               = Items.NOTHING;
	public accessory1: Item                 = Items.NOTHING;
	public accessory2: Item                 = Items.NOTHING;
	public bonusHP                          = 0;
	public additionalXP                     = 0;
	public lustVuln                         = 1;
	public temperment                       = 0;
	// Monster loot
	public drops: Item[]                    = [];
	public dropThresholds: number[]         = [];
	// Appearance
	public gender: Gender                   = Gender.NONE; //0 genderless, 1 male, 2 female, 3 hermaphrodite
	public tallness                         = 36; //Height in inches
	public skinTone                         = "";
	public skinType: SkinType               = SkinType.PLAIN;
	public skinAdj                          = "";
	public skinDesc                         = "skin";
	public hairType: HairType               = HairType.NORMAL;
	public hairColor                        = "";
	public hairLength                       = 0;
	public beardStyle: any                  = BeardStyle.NORMAL;
	public beardLength                      = 0;
	public furColor                         = "";
	//Head
	public earType: EarType                 = EarType.HUMAN;
	public eyeType: EyeType                 = EyeType.HUMAN;
	public faceType: FaceType               = FaceType.HUMAN;
	public tongueType: TongueType           = TongueType.HUMAN;
	//Body
	public lowerBody: LowerBodyType         = LowerBodyType.HUMAN;
	public legCount                         = 2;
	public armType: ArmType                 = ArmType.HUMAN;
	//Extra parts
	public antennae: AntennaeType           = AntennaeType.NONE;
	public clawType: ClawType               = ClawType.NORMAL;
	public clawTone                         = "";
	public hornType: HornType               = HornType.NONE;
	public horns                            = 0;
	public gills                            = false;
	public tailType: TailType               = TailType.NONE;
	public tailCount                        = 0;
	public tailVenom                        = 0;
	public tailRecharge                     = 0;
	public wingType: WingType               = WingType.NONE;
	// Body sliders
	public femininity                       = 50;
	public tone                             = 0;
	public thickness                        = 0;
	public hipRating                        = 0;
	public buttRating                       = 0;
	//Cocks
	public cocks: Cock[]                    = [];
	public balls                            = 0;
	public ballSize                         = 0;
	public hoursSinceCum                    = 0;
	public cumMultiplier                    = 0;
	public fertility                        = 10;
	//Vaginas
	public vaginas: Vagina[]                = [];
	public clitLength: number               = 0;
	//Ass
	public ass: Ass                         = new Ass();
	//Breasts
	public breastRows: BreastRow[]          = [];
	public nippleLength: number             = 0.25;
	public lactationMultiplier              = 0;
	//Effects & perks
	public keyItems: KeyItem[]              = [];
	public statusEffects: StatusEffect[]    = [];
	public perks: Perk[]                    = [];
	// Piercings
	public nipplesPierced: Number           = 0;
	public nipplesPShort: String            = "";
	public nipplesPLong: String             = "";
	public lipPierced: Number               = 0;
	public lipPShort: String                = "";
	public lipPLong: String                 = "";
	public tonguePierced: Number            = 0;
	public tonguePShort: String             = "";
	public tonguePLong: String              = "";
	public eyebrowPierced: Number           = 0;
	public eyebrowPShort: String            = "";
	public eyebrowPLong: String             = "";
	public earsPierced: Number              = 0;
	public earsPShort: String               = "";
	public earsPLong: String                = "";
	public nosePierced: Number              = 0;
	public nosePShort: String               = "";
	public nosePLong: String                = "";
	// Pregnancy
	public pregnancyType: PregnancyType     = 0;
	public pregnancyIncubation              = 0;
	public pregnancyEventArr: number[]      = [];
	public pregnancyEventNum                = 0;
	public buttPregnancyType: PregnancyType = 0;
	public buttPregnancyIncubation          = 0;
	public buttPregnancyEventArr: number[]  = [];
	public buttPregnancyEventNum            = 0;
	//Victory/defeat
	public victory: () => void              = cleanupAfterCombat;
	public defeat: () => void               = cleanupAfterCombat;

	//------------
	// COMBAT
	//------------
	public doAI(): void {
		switch (rand(4)) {
			default:
				this.attack();
		}
		combatRoundOver();
	}

	public attack(): void {
		let enemy:Creature = this instanceof Player && this == player ? monster : player;
		//Hit or miss?
		let hitRoll = 70 + (this.spe - enemy.spe / 2);
		let hitNeed = rand(100);
		if (hitRoll < hitNeed) { //Miss
			if (hitRoll - hitNeed >= -5)
				outputText(capitalize(this.a) + this.refName + " narrowly miss" + (this.plural ? "" : "es") + " " + enemy.a + enemy.refName + "! ");
			else
				outputText(capitalize(this.a) + this.refName + " miss" + (this.plural ? "" : "es") + " " + enemy.a + enemy.refName + "! ");
			outputText("<br><br>");
			return;
		}
		//Damage
		let damage = this.baseDamage();
		damage *= 1 - ((enemy.armor.defense + Math.random() * (enemy.tou * 0.25)) / 100);
		if (damage < 1) damage = 1;
		//Critical
		let critical = rand(100) < this.criticalChance();
		if (critical) {
			damage *= 1.75;
			if (damage < 5) damage = 5;
		}
		//Round things off
		damage = Math.round(damage);
		//Display text and apply damage
		if (this as Creature == player) {
			if (damage <= 5) outputText("You struck a glancing blow against " + enemy.a + " " + enemy.refName + ". ");
			else if (damage <= 10) outputText("You wound " + enemy.a + " " + enemy.refName + "! ");
			else if (damage <= 20) outputText("You stagger " + enemy.a + " " + enemy.refName + " with the force of your attacks! ");
			else outputText("You mutilate " + enemy.a + " " + enemy.refName + " with a powerful " + this.weapon.verb + "! ");
		} else {
			if (damage <= 0) {
				//Due to toughness or amor...
				if (this.plural)
					outputText("You deflect and block every " + this.weapon.verb + " " + this.a + this.refName + " throw at you. ");
				else
					outputText("You deflect and block every " + this.weapon.verb + " " + this.a + this.refName + " throws at you. ");
			}
			else if (damage <= 5) {
				outputText("You are struck a glancing blow by " + this.a + this.refName + "! ");
			}
			else if (damage <= 10) {
				outputText(capitalizeFirstLetter(this.a) + this.refName + " wound");
				if (!this.plural) outputText("s");
				outputText(" you! ");
			}
			else if (damage <= 20) {
				outputText(capitalizeFirstLetter(this.a) + this.refName + " stagger");
				if (!this.plural) outputText("s");
				outputText(" you with the force of " + this.hisHer + " " + this.weapon.verb + "! ");
			}
			else if (damage > 20) {
				outputText(capitalizeFirstLetter(this.a) + this.refName + " <b>mutilate");
				if (!this.plural) outputText("s");
				outputText("</b> you with " + this.hisHer + " powerful " + this.weapon.verb + "! ");
			}
		}
		if (critical) outputText("<b>Critical hit!</b> ");
		enemy.changeHP(-damage, true);
	}

	public victoryScene(): void {
		clearOutput();
		cleanupAfterCombat();
	}

	public defeatScene(): void {
		clearOutput();
		cleanupAfterCombat();
	}

	public maxHP(): number {
		let temp = 50;
		temp += this.tou * 2;
		temp += this.bonusHP;
		if (this.hasPerk(PerkLib.Tank)) temp += 50;
		if (this.hasPerk(PerkLib.Tank2)) temp += this.tou;
		if (this as Creature == player) {
			temp += this.level * 15;
			if (temp < 50) temp = 50;
			if (temp > 999) temp = 999;
		}
		temp = Math.round(temp);
		if (this.HP > temp) this.HP = temp;
		return temp;
	}

	public maxLust(): number {
		return 100;
	}

	public minLust(): number {
		return 0;
	}

	public maxFatigue(): number {
		return 100;
	}

	public HPRatio(): number {
		return this.HP / this.maxHP();
	}

	//Combat
	public baseDamage(): number {
		let baseDmg = this.str + this.weapon.attack;
		if (baseDmg < 10) baseDmg = 10; //Clamp minimum damage to 10 if under.
		if (baseDmg > 9999) baseDmg = 9999; //Clamp maximum damage to 9999 if over.
		return baseDmg;
	}

	public criticalChance(): number {
		let chance = 4;
		return chance;
	}

	public spellMod(): number {
		let multiplier = 1;
		//Permanent base increase
		if (this.hasPerk(PerkLib.Spellpower)) {
			multiplier += 0.5;
		}
		//Others
		multiplier += this.perkValue(PerkLib.WizardsFocus, 1, 0);
		return multiplier;
	}

	//Experience
	public baseXP(): number {
		return [5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125][Math.round(this.level)] || 200;
	}

	public bonusXP(): number {
		return rand([5, 10, 20, 30, 40, 50, 55, 60, 65, 70, 75, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98][Math.round(this.level)] || 100);
	}

	public getAwardableXP(): number {
		let xpGained  = this.baseXP() + this.bonusXP() + this.additionalXP;
		let levelDiff = player.level - this.level; //The difference in level affects XP gained.
		//Clamp value between 0 and 4.
		if (levelDiff < 2) levelDiff = 0;
		else levelDiff -= 2;
		if (levelDiff > 4) levelDiff = 4;
		//Apply difference.
		xpGained *= (5 - levelDiff) / 5;
		if (levelDiff > 10) xpGained = 1; //If your level is significantly higher than the opponent, gain only 1 XP.
		//Return the value.
		return Math.round(xpGained);
	}

	//Stats Change
	public dynStats(stat: AttrName, mod: number): void;
	public dynStats(...statmod: [AttrName, number][]): void;
	public dynStats(): void {
		for (let i = 0; i < arguments.length; i += 2) {
			//Get variables
			let attribute = arguments[i];
			let mod       = arguments[i + 1];
			//Alternate
			if (attribute == "int") attribute = "inte";
			if (attribute == "sen") attribute = "sens";
			if (attribute == "lus") attribute = "lust";
			//Skip if resisted or noBimbo
			if (attribute == "resisted" || attribute == "nobimbo") continue;
			//Apply modifiers
			let a: AttrName = attribute;
			this[a] += mod;
			//Constrain values to min and max
			if (this[a] > 100) this[a] = 100;
			if (this[a] < 0) this[a] = 0;
			if (this as Creature == player) {
				if (mod > 0)
					showUpDown(a + "Arrow", "up");
				else if (mod < 0)
					showUpDown(a + "Arrow", "down");
				refreshStats();
			}
		}
	}

	public changeHP(amount: number, display: boolean = false, newpg: boolean = true): void {
		//Main function
		this.HP += amount;
		if (this.HP > this.maxHP()) this.HP = this.maxHP();
		if (this.HP < 0) this.HP = 0;
		if (display) {
			if (amount < 0)
				outputText(capitalize(this.a) + " " + this.refName + " take" + (this.isAre == "is" ? "s" : "") + " <font color=\"#800000\"><b>" + Math.abs(amount) + "</b></font> damage!");
			else if (amount > 0)
				outputText(capitalize(this.a) + " " + this.refName + " " + this.isAre + " healed for <font color=\"#008000\"><b>" + Math.abs(amount) + "</b></font> HP!");
			if (newpg)
				outputText("<br><br>");
			else
				outputText(" ");
		}
		if (this as Creature == player) {
			if (amount < 0)
				showUpDown("hpArrow", "down");
			else if (amount > 0)
				showUpDown("hpArrow", "up");
			refreshStats();
		}
	}

	public changeLust(amount: number, display: boolean = false, newpg: boolean = true, resisted: boolean = true): void {
		//Main function
		if (resisted) amount *= this.lustVuln;
		this.lust += amount;
		if (this.lust > this.maxLust()) this.lust = this.maxLust();
		if (this.lust < 0) this.lust = 0;
		if (display) {
			if (amount < 0)
				outputText(capitalize(this.a) + " " + this.refName + " " + this.isAre + " calmed for a reduction of <font color=\"#A05050\"><b>" + Math.abs(amount) + "</b></font> lust!");
			else if (amount > 0)
				outputText(capitalize(this.a) + " " + this.refName + " " + this.isAre + " aroused for <font color=\"#A05050\"><b>" + Math.abs(amount) + "</b></font> points of lust!");
			if (newpg)
				outputText("<br><br>");
			else
				outputText(" ");
		}
		if (this as Creature == player) {
			if (amount < 0)
				showUpDown("lustArrow", "down");
			else if (amount > 0)
				showUpDown("lustArrow", "up");
			refreshStats();
		}
	}

	public changeFatigue(amount: number, display: boolean = false, newpg: boolean = true): void {
		//Main function
		this.fatigue += amount;
		if (this.fatigue > this.maxFatigue()) this.fatigue = this.maxFatigue();
		if (this.fatigue < 0) this.fatigue = 0;
		if (display) {
			if (amount < 0)
				outputText(capitalize(this.a) + " " + this.refName + " " + this.isAre + " rejuvenated for <font color=\"#000080\"><b>" + Math.abs(amount) + "</b></font> points of fatigue!");
			else if (amount > 0)
				outputText(capitalize(this.a) + " " + this.refName + " " + this.isAre + " fatigued for <font color=\"#000080\"><b>" + Math.abs(amount) + "</b></font> points of fatigue!");
			if (newpg)
				outputText("<br><br>");
			else
				outputText(" ");
		}
		if (this as Creature == player) {
			if (amount < 0)
				showUpDown("fatigueArrow", "down");
			else if (amount > 0)
				showUpDown("fatigueArrow", "up");
			refreshStats();
		}
	}

	public damageToughnessModifier(displayMode: boolean = false): number {
		let temp = 0;
		if (this.tou < 25) temp = (this.tou * 0.4);
		else if (this.tou < 50) temp = 10 + ((this.tou - 25) * 0.3);
		else if (this.tou < 75) temp = 17.5 + ((this.tou - 50) * 0.2);
		else if (this.tou < 100) temp = 22.5 + ((this.tou - 75) * 0.1);
		else temp = 25;
		//displayMode is for stats screen.
		if (displayMode) return temp;
		else return rand(temp);
	}

	public damagePercent(displayMode: boolean, applyModifiers: boolean): number {
		let mult     = 100;
		let armorMod = this.armor.defense;
		//--BASE--
		//Toughness modifier.
		if (!displayMode) {
			mult -= this.damageToughnessModifier();
			if (mult < 75) mult = 75;
		}
		//Modify armor rating based on weapons.
		if (applyModifiers) {
			// if (player.weapon == Items.Weapons.JewelRapier || player.weapon == Items.Weapons.SPEAR || player.weapon.name.indexOf("staff") != -1 && player.findPerk(PerkLib.StaffChanneling) >= 0) armorMod = 0;
			//if (player.weapon == Items.Weapons.Katana) armorMod -= 5;
			//if (player.findPerk(PerkLib.LungingAttacks) >= 0) armorMod /= 2;
			if (armorMod < 0) armorMod = 0;
		}
		mult -= armorMod;

		//--PERKS--
		//Take damage you masochist!
		if (this.hasPerk(PerkLib.Masochist) && this.lib >= 60) {
			mult *= 0.8;
			if (this as Creature == player && !displayMode) this.changeLust(2, false);
		}
		/*if (this.hasPerk(PerkLib.ImmovableObject) && this.tou >= 75) {
		 mult *= 0.9;
		 }*/

		//--STATUS AFFECTS--
		//Black cat beer = 25% reduction!
		//if (this.statusEffectValue(StatusEffects.BlackCatBeer, 1) > 0) mult *= 0.75;
		// Uma's Massage bonuses
		/*var statIndex = this.findStatusEffect(StatusEffects.UmasMassage);
		 if (statIndex >= 0) {
		 if (this.findStatusEffect(statIndex).value1 == UmasShop.MASSAGE_RELAXATION) {
		 mult *= this.findStatusEffect(statIndex).value2;
		 }
		 }*/
		//Round things off.
		mult = Math.round(
			mult);
		//Caps damage reduction at 80%.
		if (mult < 20) mult = 20;
		return mult;
	}

	public teased(lustDelta: number): void {
		lustDelta = Math.round(lustDelta);
		this.outputDefaultTeaseReaction(lustDelta);
		if (lustDelta > 0) {
			//Imp mob uber interrupt!
			/*if (this.findStatusEffect(StatusEffects.ImpUber) >= 0) { // TODO move to proper class
			 outputText("<br>The imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting. One of them spontaneously orgasms, having managed to have his spell backfire. He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.");
			 //(-5% of max enemy HP)
			 this.changeHP(this.maxHP() * 0.05, true);
			 this.changeLust(-15, true);
			 this.removeStatusEffect(StatusEffects.ImpUber);
			 this.createStatusEffect(StatusEffects.ImpSkip, 0, 0, 0, 0);
			 }*/
		}
		this.changeLust(lustDelta, true);
	}

	public outputDefaultTeaseReaction(lustDelta: number): void {
		if (this.plural) {
			if (lustDelta == 0)
				outputText("<br><br>" + capitalizeFirstLetter(this.a) + this.refName + " seem unimpressed.");
			if (lustDelta > 0 && lustDelta < 4)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " look intrigued by what " + this.heShe + " see.");
			if (lustDelta >= 4 && lustDelta < 10)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " definitely seem to be enjoying the show.");
			if (lustDelta >= 10 && lustDelta < 15)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " openly stroke " + this.himHer + "selves as " + this.heShe + " watch you.");
			if (lustDelta >= 15 && lustDelta < 20)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " flush hotly with desire, " + this.hisHer + " eyes filled with longing.");
			if (lustDelta >= 20)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " lick " + this.hisHer + " lips in anticipation, " + this.hisHer + " hands idly stroking " + this.hisHer + " bodies.");
		}
		else {
			if (lustDelta == 0)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " seems unimpressed.");
			if (lustDelta > 0 && lustDelta < 4)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " looks intrigued by what " + this.heShe + " sees.");
			if (lustDelta >= 4 && lustDelta < 10)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " definitely seems to be enjoying the show.");
			if (lustDelta >= 10 && lustDelta < 15)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " openly strokes " + this.himHer + "self as " + this.heShe + " watches you.");
			if (lustDelta >= 15 && lustDelta < 20)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " flushes hotly with desire, " + this.hisHer + " eyes filled with longing.");
			if (lustDelta >= 20)
				outputText("<br>" + capitalizeFirstLetter(this.a) + this.refName + " licks " + this.hisHer + " lips in anticipation, " + this.hisHer + " hands idly stroking " + this.hisHer + " own body.");
		}
		outputText(" ");
	}

	//ORGASMS!!!!
	public orgasm(): void {
		this.changeLust(-this.lust);
		this.hoursSinceCum = 0;
		if (this as Creature == player) {
			gameFlags[TIMES_ORGASMED]++;
			refreshStats();
		}
	}

	//------------
	// ITEMS/DROPS
	//------------
	public clearDrops(): void {
		this.drops          = [];
		this.dropThresholds = [];
	}

	public addDrop(item: Item, chance: number): void {
		//Chance is in percentage.
		this.drops.push(item);
		if (this.dropThresholds.length == 0) {
			this.dropThresholds.push(chance);
		} else {
			let currentThreshold                            = this.dropThresholds[this.dropThresholds.length - 1];
			this.dropThresholds[this.dropThresholds.length] = currentThreshold + chance;
		}
	}

	public dropItem(): any {
		let roll      = rand(100);
		let dropIndex = -1;
		for (let i = 0; i < this.dropThresholds.length; i++) {
			if (roll < this.dropThresholds[i]) {
				dropIndex = i;
				break;
			}
		}
		if (dropIndex == -1)
			return undefined;
		return this.drops[dropIndex];
	}

	public getTotalDropPercents(): number {
		let sum = 0;
		for (var i in this.dropThresholds) {
			sum += this.dropThresholds[i];
		}
		return sum;
	}

	//------------
	// STATS/PERKS
	//------------
	//Perks
	public createPerk(ptype: PerkType,
					  value1: number = 0,
					  value2: number = 0,
					  value3: number = 0,
					  value4: number = 0): void {
		let newKeyItem = new Perk(ptype, value1, value2, value3, value4);
		this.perks.push(newKeyItem);
		this.perks = _.sortBy(this.perks, p => p.perkName)
	}

	public removePerk(ptype: PerkType): boolean {
		let counter = this.indexOfPerk(ptype);
		if (counter >= 0) {
			this.perks.splice(counter, 1);
			return true;
		}
		return false;
	}

	public indexOfPerk(ptype: PerkType): number {
		return _.findIndex(this.perks, p => p.ptype == ptype);
	}

	public findPerkByType(ptype: PerkType): Perk | undefined {
		return _.find(this.perks, p => p.ptype == ptype);
	}

	public hasPerk(ptype: PerkType): boolean {
		return this.indexOfPerk(ptype) >= 0;
	}

	public perkValue(ptype: PerkType, vidx: 1 | 2 | 3 | 4, defval: number): number {
		let p = this.findPerkByType(ptype);
		return p ? p.value(vidx) : defval;
	}

	//Status Effects
	public createStatusEffect(stype: StatusEffectType,
							  value1: number = 0,
							  value2: number = 0,
							  value3: number = 0,
							  value4: number = 0): void {
		this.statusEffects.push(new StatusEffect(stype, value1, value2, value3, value4));
		this.statusEffects = _.sortBy(this.statusEffects, s => s.stype)
	}

	public removeStatusEffect(stype: StatusEffectType): void {
		let counter = this.indexOfStatusEffect(stype);
		if (counter < 0) return;
		this.statusEffects.splice(counter, 1);
	}

	public indexOfStatusEffect(stype: StatusEffectType): number {
		return _.findIndex(this.statusEffects, s => s.stype == stype);
	}

	public findStatusEffectByType(stype: StatusEffectType): StatusEffect | undefined {
		return _.find(this.statusEffects, s => s.stype == stype);
	}

	public hasStatusEffect(stype: StatusEffectType): boolean {
		return this.indexOfStatusEffect(stype) >= 0;
	}

	public statusEffectValue(ptype: StatusEffectType, vidx: 1 | 2 | 3 | 4, defval: number): number {
		let s = this.findStatusEffectByType(ptype);
		return s ? s.value(vidx) : defval;
	}

	//-------
	// Key Items
	//-------

	public createKeyItem(ktype: KeyItemType,
						 value1: number = 0,
						 value2: number = 0,
						 value3: number = 0,
						 value4: number = 0): void {
		this.keyItems.push(new KeyItem(ktype, value1, value2, value3, value4));
		this.keyItems = _.sortBy(this.keyItems, k => k.ktype)
	}

	public removeKeyItem(ktype: KeyItemType): void {
		let counter = this.indexOfKeyItem(ktype);
		if (counter < 0) return;
		this.keyItems.splice(counter, 1);
	}

	public indexOfKeyItem(ktype: KeyItemType): number {
		return _.findIndex(this.keyItems, k => k.ktype == ktype);
	}

	public findKeyItemByType(ktype: KeyItemType): KeyItem | undefined {
		return _.find(this.keyItems, k => k.ktype == ktype);
	}

	public hasKeyItem(ktype: KeyItemType): boolean {
		return this.indexOfKeyItem(ktype) >= 0;
	}


	//------------
	// SEXUAL UTIL
	//------------
	public hasCock(): boolean {
		return (this.cocks.length > 0);
	}

	public cockTotal(): number {
		return this.cocks.length;
	}

	public totalCocks(): number { //Alternate
		return this.cockTotal();
	}

	public hasVagina(): boolean {
		return (this.vaginas.length > 0);
	}

	public hasVirginVagina(): boolean {
		if (this.vaginas.length > 0)
			return this.vaginas[0].virgin;
		return false;
	}

	public vaginaTotal(): number {
		return this.vaginas.length;
	}

	public wetness(): number {
		if (this.vaginas.length == 0)
			return 0;
		else
			return this.vaginas[0].vaginalWetness;
	}

	public vaginaType(newType: VaginaTypesEnum | -1 = -1): VaginaTypesEnum | -1 {
		//Main
		if (!this.hasVagina())
			return -1;
		if (newType != -1) {
			this.vaginas[0].type = newType;
		}
		return this.vaginas[0].type;
	}

	public looseness(vag: boolean = true): number {
		//Main
		if (vag) {
			if (this.vaginas.length == 0)
				return 0;
			else
				return this.vaginas[0].vaginalLooseness;
		}
		else {
			return this.ass.analLooseness;
		}
	}

	public vaginalCapacity(): number {
		//If the player has no vaginas
		if (this.vaginas.length == 0)
			return 0;
		let bonus = 0;
		//Centaurs = +50 capacity
		if (this.lowerBody == 4)
			bonus = 50;
		//Naga = +20 capacity
		else if (this.lowerBody == 3)
			bonus = 20;
		//Wet pussy provides 20 point boost
		//if (this.hasPerk(PerkLib.WetPussy)) bonus += 20;
		//if (this.hasPerk(PerkLib.HistorySlut)) bonus += 20;
		//if (this.hasPerk(PerkLib.OneTrackMind)) bonus += 10;
		//if (this.hasPerk(PerkLib.Cornucopia)) bonus += 30;
		//if (this.hasPerk(PerkLib.FerasBoonWideOpen)) bonus += 25;
		//if (this.hasPerk(PerkLib.FerasBoonMilkingTwat)) bonus += 40;
		let bonusVCap = this.statusEffectValue(StatusEffects.BonusVCapacity, 1, 0);
		let total     = (bonus + bonusVCap + 8 * this.vaginas[0].vaginalLooseness * this.vaginas[0].vaginalLooseness) * (1 + this.vaginas[0].vaginalWetness / 10);
		return total;
	}

	public analCapacity(): number {
		let bonus = 0;
		//Centaurs = +30 capacity
		if (this.lowerBody == LowerBodyType.CENTAUR)
			bonus = 30;
		//if (this.hasPerk(PerkLib.HistorySlut)) bonus += 20;
		//if (this.hasPerk(PerkLib.Cornucopia)) bonus += 30;
		//if (this.hasPerk(PerkLib.OneTrackMind)) bonus += 10;
		if (this.ass.analWetness > 0) bonus += 15;
		let bonusACap = this.statusEffectValue(StatusEffects.BonusACapacity, 1, 0);
		let total     = ((bonus + bonusACap + 6 * this.ass.analLooseness * this.ass.analLooseness) * (1 + this.ass.analWetness / 10));
		return total;
	}

	public hasFuckableNipples(): boolean {
		let counter = this.breastRows.length;
		while (counter > 0) {
			counter--;
			if (this.breastRows[counter].fuckable)
				return true;
		}
		return false;
	}

	public hasBreasts(): boolean {
		if (this.breastRows.length > 0) {
			if (this.biggestTitSize() >= 1)
				return true;
		}
		return false;
	}

	public hasNipples(): boolean {
		let counter = this.breastRows.length;
		while (counter > 0) {
			counter--;
			if (this.breastRows[counter].nipplesPerBreast > 0)
				return true;
		}
		return false;
	}

	//Milky goodness!
	public lactationSpeed(): number {
		//Lactation * breastSize x 10 (milkPerBreast) determines scene
		return this.biggestLactation() * this.biggestTitSize() * 10;
	}

	public biggestLactation(): number {
		if (this.breastRows.length == 0)
			return 0;
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
				index = counter;
		}
		return this.breastRows[index].lactationMultiplier;
	}

	public milked(): void {
		/*if (this.findStatusEffect(StatusEffects.LactationReduction) >= 0)
		 this.changeStatusValue(StatusEffects.LactationReduction, 1, 0);
		 if (this.findStatusEffect(StatusEffects.LactationReduc0) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc0);
		 if (this.findStatusEffect(StatusEffects.LactationReduc1) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc1);
		 if (this.findStatusEffect(StatusEffects.LactationReduc2) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc2);
		 if (this.findStatusEffect(StatusEffects.LactationReduc3) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc3);
		 if (this.hasPerk(PerkLib.Feeder)) {
		 //You've now been milked, reset the timer for that
		 this.addStatusValue(StatusEffects.Feeder, 1, 1);
		 this.changeStatusValue(StatusEffects.Feeder, 2, 0);
		 }*/
	}

	public boostLactation(todo: number): number {
		if (this.breastRows.length == 0)
			return 0;
		let counter = this.breastRows.length;
		let index   = 0;
		let changes = 0;
		let temp2   = 0;
		//Prevent lactation decrease if lactating.
		/*if (todo >= 0) {
		 if (this.findStatusEffect(StatusEffects.LactationReduction) >= 0)
		 this.changeStatusValue(StatusEffects.LactationReduction, 1, 0);
		 if (this.findStatusEffect(StatusEffects.LactationReduc0) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc0);
		 if (this.findStatusEffect(StatusEffects.LactationReduc1) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc1);
		 if (this.findStatusEffect(StatusEffects.LactationReduc2) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc2);
		 if (this.findStatusEffect(StatusEffects.LactationReduc3) >= 0)
		 this.removeStatusEffect(StatusEffects.LactationReduc3);
		 }*/
		if (todo > 0) {
			while (todo > 0) {
				counter = this.breastRows.length;
				todo -= .1;
				while (counter > 0) {
					counter--;
					if (this.breastRows[index].lactationMultiplier > this.breastRows[counter].lactationMultiplier)
						index = counter;
				}
				temp2 = .1;
				if (this.breastRows[index].lactationMultiplier > 1.5)
					temp2 /= 2;
				if (this.breastRows[index].lactationMultiplier > 2.5)
					temp2 /= 2;
				if (this.breastRows[index].lactationMultiplier > 3)
					temp2 /= 2;
				changes += temp2;
				this.breastRows[index].lactationMultiplier += temp2;
			}
		}
		else {
			while (todo < 0) {
				counter = this.breastRows.length;
				index   = 0;
				if (todo > -.1) {
					while (counter > 0) {
						counter--;
						if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
							index = counter;
					}
					this.breastRows[index].lactationMultiplier += todo;
					if (this.breastRows[index].lactationMultiplier < 0)
						this.breastRows[index].lactationMultiplier = 0;
					todo = 0;
				}
				else {
					todo += .1;
					while (counter > 0) {
						counter--;
						if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
							index = counter;
					}
					temp2 = todo;
					changes += temp2;
					this.breastRows[index].lactationMultiplier += temp2;
					if (this.breastRows[index].lactationMultiplier < 0)
						this.breastRows[index].lactationMultiplier = 0;
				}
			}
		}
		return changes;
	}

	public averageLactation(): number {
		if (this.breastRows.length == 0)
			return 0;
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			index += this.breastRows[counter].lactationMultiplier;
		}
		return Math.floor(index / this.breastRows.length);
	}

	public lactationQ(): any {
		if (this.biggestLactation() < 1)
			return 0;
		//(Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
		//(Small – 0.01 mLs – Size 1 + 1 Multi)
		//(Large – 0.8 - Size 10 + 4 Multi)
		//(HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
		let total;
		//if (this.findStatusEffect(StatusEffects.LactationEndurance) < 0) this.createStatusEffect(StatusEffects.LactationEndurance, 1, 0, 0, 0);
		total = this.biggestTitSize() * 10 * this.averageLactation() * this.totalBreasts();
		//total = this.biggestTitSize() * 10 * this.averageLactation() * this.statusEffectValue(StatusEffects.LactationEndurance, 1) * this.totalBreasts();
		//if (this.hasPerk(PerkLib.MilkMaid)) total += 200 + (this.perkValue(PerkLib.MilkMaid, 1) * 100);
		//if (this.statusEffectValue(StatusEffects.LactationReduction, 1) >= 48)total *= 1.5;
		if (total > Number.MAX_VALUE)
			total = Number.MAX_VALUE;
		return total;
	}

	public isLactating(): boolean {
		return (this.lactationQ() > 0);
	}

	public cumQ(): number {
		if (!this.hasCock())
			return 0;
		let quantity = 0;

		//Base value is ballsize*ballQ*cumefficiency by a factor of 2.
		//Other things that affect it:
		//lust - 50% = normal output.  0 = half output. 100 = +50% output.
		//trace("CUM ESTIMATE: " + int(1.25*2*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(no balls), " + int(ballSize*balls*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(withballs)");
		let lustCoefficient = (this.lust + 50) / 10;
		//If realistic mode is enabled, limits cum to capacity.
		if (hungerEnabled) {
			lustCoefficient = (this.lust + 50) / 5;
			//if (this.hasPerk(PerkLib.PilgrimsBounty)) lustCoefficient = 30;
			let percent     = 0;
			percent         = lustCoefficient + (this.hoursSinceCum + 10);
			if (percent > 100)
				percent = 100;
			if (quantity > this.cumCapacity())
				quantity = this.cumCapacity();
			return (percent / 100) * this.cumCapacity();
		}
		//Pilgrim's bounty maxes lust coefficient
		//if (this.hasPerk(PerkLib.PilgrimsBounty)) lustCoefficient = 150 / 10;
		if (this.balls == 0)
			quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
		else
			quantity = Math.floor(this.ballSize * this.balls * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
		//if (this.hasPerk(PerkLib.BroBody)) quantity *= 1.3;
		//if (this.hasPerk(PerkLib.FertilityPlus)) quantity *= 1.5;
		//if (this.hasPerk(PerkLib.FertilityMinus) && this.lib < 25) quantity *= 0.7;
		if (this.hasPerk(PerkLib.MessyOrgasms)) quantity *= 1.5;
		//if (this.hasPerk(PerkLib.OneTrackMind)) quantity *= 1.1;
		if (this.hasPerk(PerkLib.MaraesGiftStud)) quantity += 350;
		//if (this.hasPerk(PerkLib.FerasBoonAlpha)) quantity += 200;
		//if (this.hasPerk(PerkLib.MagicalVirility)) quantity += 200;
		//if (this.hasPerk(PerkLib.FerasBoonSeeder)) quantity += 1000;
		//if (this.findPerk("Elven Bounty") >= 0) quantity += 250;

		//quantity += this.perkValue(PerkLib.ElvenBounty, 1);
		//if (this.hasPerk(PerkLib.BroBody)) quantity += 200;
		//if (this.hasPerk(PerkLib.SatyrSexuality)) quantity += 50;
		quantity += this.statusEffectValue(StatusEffects.Rut, 1, 0);
		//quantity *= (1 + (2 * this.perkValue(PerkLib.PiercedFertite, 1)) / 100);
		//if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY)
		//	quantity *= (1 + (jewelryEffectMagnitude / 100));
		//trace("Final Cum Volume: " + int(quantity) + "mLs.");
		//if (quantity < 0) trace("SOMETHING HORRIBLY WRONG WITH CUM CALCULATIONS");
		if (quantity < 2)
			quantity = 2;
		if (quantity > 999999999) //Cum production is capped at 999,999,999mL.
			quantity = 999999999;
		return quantity;
	}

	public cumCapacity(): number {
		if (!this.hasCock()) return 0;
		let cumCap = 0;
		//Alter capacity by balls.
		if (this.balls > 0)
			cumCap += Math.pow(((4 / 3) * Math.PI * (this.ballSize / 2)), 3) * this.balls; // * cumMultiplier
		else
			cumCap += Math.pow(((4 / 3) * Math.PI), 3) * 2; // * cumMultiplier
		//Alter capacity by perks.
		//if (this.hasPerk(PerkLib.BroBody)) cumCap *= 1.3;
		//if (this.hasPerk(PerkLib.FertilityPlus)) cumCap *= 1.5;
		//if (this.hasPerk(PerkLib.FertilityMinus) && this.lib < 25) cumCap *= 0.7;
		if (this.hasPerk(PerkLib.MessyOrgasms)) cumCap *= 1.5;
		//if (this.hasPerk(PerkLib.OneTrackMind)) cumCap *= 1.1;
		if (this.hasPerk(PerkLib.MaraesGiftStud)) cumCap += 350;
		//if (this.hasPerk(PerkLib.FerasBoonAlpha)) cumCap += 200;
		//if (this.hasPerk(PerkLib.MagicalVirility)) cumCap += 200;
		//if (this.hasPerk(PerkLib.FerasBoonSeeder)) cumCap += 1000;
		//cumCap += this.perkValue(PerkLib.ElvenBounty, 1);
		//if (this.hasPerk(PerkLib.BroBody)) cumCap += 200;
		cumCap += this.statusEffectValue(StatusEffects.Rut, 1, 0);
		//cumCap *= (1 + (2 * this.perkValue(PerkLib.PiercedFertite, 1)) / 100);
		//Alter capacity by accessories.
		//if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY) cumCap *= (1 + (jewelryEffectMagnitude / 100));

		cumCap *= this.cumMultiplier;
		cumCap = Math.round(cumCap);
		if (cumCap > 999999999)
			cumCap = 999999999;
		return cumCap;
	}

	public get inHeat(): boolean {
		return this.hasStatusEffect(StatusEffects.Heat);
	}

	public get inRut(): boolean {
		return this.hasStatusEffect(StatusEffects.Rut);
	}


	public bonusFertility(): number {
		let counter = 0;
		counter += this.statusEffectValue(StatusEffects.Heat, 1, 0);
		//if (this.hasPerk(PerkLib.FertilityPlus)) counter += 15;
		//if (this.hasPerk(PerkLib.FertilityMinus) && this.lib < 25) counter -= 15;
		//if (this.hasPerk(PerkLib.MaraesGiftFertility)) counter += 50;
		//if (this.hasPerk(PerkLib.FerasBoonBreedingBitch)) counter += 30;
		//if (this.hasPerk(PerkLib.MagicalFertility)) counter += 10;
		//counter += this.perkValue(PerkLib.ElvenBounty, 2);
		//counter += this.perkValue(PerkLib.PiercedFertite, 1);
		//if (jewelryEffectId == JewelryLib.MODIFIER_FERTILITY)
		//    counter += jewelryEffectMagnitude;
		//counter += this.perkValue(PerkLib.AscensionFertility, 1) * 5;
		return counter;
	}

	public totalFertility(): number {
		return (this.bonusFertility() + this.fertility);
	}

	public countCocksOfType(type: CockTypesEnum): number {
		if (this.cocks.length == 0) return 0;
		let counter = 0;
		for (let x = 0; x < this.cocks.length; x++) {
			if (this.cocks[x].cockType == type) counter++;
		}
		return counter;
	}

	public findFirstCockType(ctype: CockTypesEnum): number {
		for (let index = 0; index < this.cocks.length; index++) {
			if (this.cocks[index].cockType == ctype) return index;
		}
		return -1;
	}

	//Breasts Getter functions
	public biggestTitSize(): number {
		if (this.breastRows.length == 0)
			return -1;
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
				index = counter;
		}
		return this.breastRows[index].breastRating;
	}

	public cockArea(i_cockIndex: number): number {
		if (i_cockIndex >= this.cocks.length || i_cockIndex < 0)
			return 0;
		return (this.cocks[i_cockIndex].cockThickness * this.cocks[i_cockIndex].cockLength);
	}

	public biggestCockLength(): number {
		if (this.cocks.length == 0)
			return 0;
		return this.cocks[this.biggestCockIndex()].cockLength;
	}

	public biggestCockArea(): any {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) < this.cockArea(counter))
				index = counter;
		}
		return this.cockArea(index);
	}

	//Find the second biggest dick and it's area.
	public biggestCockArea2(): any {
		if (this.cocks.length <= 1)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		let index2  = -1;
		//Find the biggest
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) < this.cockArea(counter))
				index = counter;
		}
		//Reset counter and find the next biggest
		counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			//Is this spot claimed by the biggest?
			if (counter != index) {
				//Not set yet?
				if (index2 == -1)
					index2 = counter;
				//Is the stored value less than the current one?
				if (this.cockArea(index2) < this.cockArea(counter)) {
					index2 = counter;
				}
			}
		}
		//If it couldn't find a second biggest...
		if (index == index2)
			return 0;
		return this.cockArea(index2);
	}

	public longestCock(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
				index = counter;
		}
		return index;
	}

	public longestCockLength(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
				index = counter;
		}
		return this.cocks[index].cockLength;
	}

	public twoDickRadarSpecial(width: number): boolean {
		//No two dicks?  FUCK OFF
		if (this.cockTotal() < 2)
			return false;

		//Set up vars
		//Get thinnest, work done already
		let thinnest  = this.thinnestCockIndex();
		let thinnest2 = 0;
		//For ze loop
		let temp      = 0;
		//Make sure they arent the same at initialization
		if (thinnest2 == thinnest)
			thinnest2 = 1;
		//Loop through to find 2nd thinnest
		while (temp < this.cocks.length) {
			if (this.cocks[thinnest2].cockThickness > this.cocks[temp].cockThickness && temp != thinnest)
				thinnest2 = temp;
			temp++;
		}
		//If the two thicknesses added together are less than the arg, true, else false
		return this.cocks[thinnest].cockThickness + this.cocks[thinnest2].cockThickness < width;
	}

	public totalCockThickness(): number {
		let thick   = 0;
		let counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			thick += this.cocks[counter].cockThickness;
		}
		return thick;
	}

	public thickestCock(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
				index = counter;
		}
		return index;
	}

	public thickestCockThickness(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
				index = counter;
		}
		return this.cocks[index].cockThickness;
	}

	public thinnestCockIndex(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockThickness > this.cocks[counter].cockThickness)
				index = counter;
		}
		return index;
	}

	public smallestCockIndex(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) > this.cockArea(counter)) {
				index = counter;
			}
		}
		return index;
	}

	public smallestCockLength(): number {
		if (this.cocks.length == 0)
			return 0;
		return this.cocks[this.smallestCockIndex()].cockLength;
	}

	public shortestCockIndex(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
				index = counter;
		}
		return index;
	}

	public shortestCockLength(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
				index = counter;
		}
		return this.cocks[index].cockLength;
	}

//Find the biggest cock that fits inside a given value
	public cockThatFits(i_fits: number = 0, type: "area" | "length" = "area"): number {
		//Main function
		if (this.cocks.length <= 0)
			return -1;
		let cockIdxPtr = this.cocks.length;
		//Current largest fitter
		let cockIndex  = -1;
		while (cockIdxPtr > 0) {
			cockIdxPtr--;
			if (type == "area") {
				if (this.cockArea(cockIdxPtr) <= i_fits) {
					//If one already fits
					if (cockIndex >= 0) {
						//See if the newcomer beats the saved small guy
						if (this.cockArea(cockIdxPtr) > this.cockArea(cockIndex))
							cockIndex = cockIdxPtr;
					}
					//Store the index of fitting dick
					else
						cockIndex = cockIdxPtr;
				}
			}
			else if (type == "length") {
				if (this.cocks[cockIdxPtr].cockLength <= i_fits) {
					//If one already fits
					if (cockIndex >= 0) {
						//See if the newcomer beats the saved small guy
						if (this.cocks[cockIdxPtr].cockLength > this.cocks[cockIndex].cockLength)
							cockIndex = cockIdxPtr;
					}
					//Store the index of fitting dick
					else
						cockIndex = cockIdxPtr;
				}
			}
		}
		return cockIndex;
	}

//Find the 2nd biggest cock that fits inside a given value
	public cockThatFits2(fits: number = 0): number {
		//Main function
		if (this.cockTotal() == 1)
			return -1;
		let counter = this.cocks.length;
		//Current largest fitter
		let index   = -1;
		let index2  = -1;
		while (counter > 0) {
			counter--;
			//Does this one fit?
			if (this.cockArea(counter) <= fits) {
				//If one already fits
				if (index >= 0) {
					//See if the newcomer beats the saved small guy
					if (this.cockArea(counter) > this.cockArea(index)) {
						//Save old wang
						if (index != -1)
							index2 = index;
						index = counter;
					}
					//If this one fits and is smaller than the other great
					else {
						if ((this.cockArea(index2) < this.cockArea(counter)) && counter != index) {
							index2 = counter;
						}
					}
				}
				//Store the index of fitting dick
				else
					index = counter;
			}
		}
		return index2;
	}

	public smallestCockArea(): any {
		if (this.cockTotal() == 0)
			return -1;
		return this.cockArea(this.smallestCockIndex());
	}

	public smallestCock(): number {
		return this.cockArea(this.smallestCockIndex());
	}

	public biggestCockIndex(): number {
		if (this.cocks.length == 0)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) < this.cockArea(counter))
				index = counter;
		}
		return index;
	}

	//Find the second biggest dick's index.
	public biggestCockIndex2(): number {
		if (this.cocks.length <= 1)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		let index2  = 0;
		//Find the biggest
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) < this.cockArea(counter))
				index = counter;
		}
		//Reset counter and find the next biggest
		counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			//Make sure index2 doesn't get stuck
			//at the same value as index1 if the
			//initial location is biggest.
			if (index == index2 && counter != index)
				index2 = counter;
			//Is the stored value less than the current one?
			if (this.cockArea(index2) < this.cockArea(counter)) {
				//Make sure we don't set index2 to be the same
				//as the biggest dick.
				if (counter != index)
					index2 = counter;
			}
		}
		//If it couldn't find a second biggest...
		if (index == index2)
			return 0;
		return index2;
	}

	public smallestCockIndex2(): number {
		if (this.cocks.length <= 1)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		let index2  = 0;
		//Find the smallest
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) > this.cockArea(counter))
				index = counter;
		}
		//Reset counter and find the next biggest
		counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			//Make sure index2 doesn't get stuck
			//at the same value as index1 if the
			//initial location is biggest.
			if (index == index2 && counter != index)
				index2 = counter;
			//Is the stored value less than the current one?
			if (this.cockArea(index2) > this.cockArea(counter)) {
				//Make sure we don't set index2 to be the same
				//as the biggest dick.
				if (counter != index)
					index2 = counter;
			}
		}
		//If it couldn't find a second biggest...
		if (index == index2)
			return 0;
		return index2;
	}

//Find the third biggest dick index.
	public biggestCockIndex3(): number {
		if (this.cocks.length <= 2)
			return 0;
		let counter = this.cocks.length;
		let index   = 0;
		let index2  = -1;
		let index3  = -1;
		//Find the biggest
		while (counter > 0) {
			counter--;
			if (this.cockArea(index) < this.cockArea(counter))
				index = counter;
		}
		//Reset counter and find the next biggest
		counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			//If this index isn't used already
			if (counter != index) {
				//Has index been set to anything yet?
				if (index2 == -1)
					index2 = counter;
				//Is the stored value less than the current one?
				else if (this.cockArea(index2) < this.cockArea(counter)) {
					index2 = counter;
				}
			}
		}
		//If it couldn't find a second biggest...
		if (index == index2 || index2 == -1)
			index2 = 0;
		//Reset counter and find the next biggest
		counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			//If this index isn't used already
			if (counter != index && counter != index2) {
				//Has index been set to anything yet?
				if (index3 == -1)
					index3 = counter;
				//Is the stored value less than the current one?
				else if (this.cockArea(index3) < this.cockArea(counter)) {
					index3 = counter;
				}
			}
		}
		//If it fails for some reason.
		if (index3 == -1)
			index3 = 0;
		return index3;
	}

	public breastCup(rowNum: number): string {
		return Appearance.breastCup(this.breastRows[rowNum].breastRating);
	}

	public bRows(): number {
		return this.breastRows.length;
	}

	public totalBreasts(): number {
		let counter = this.breastRows.length;
		let total   = 0;
		while (counter > 0) {
			counter--;
			total += this.breastRows[counter].breasts;
		}
		return total;
	}

	public totalNipples(): number {
		let counter = this.breastRows.length;
		let total   = 0;
		while (counter > 0) {
			counter--;
			total += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
		}
		return total;
	}

	public smallestTitSize(): number {
		if (this.breastRows.length == 0)
			return -1;
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
				index = counter;
		}
		return this.breastRows[index].breastRating;
	}

	public smallestTitRow(): number {
		if (this.breastRows.length == 0)
			return -1;
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
				index = counter;
		}
		return index;
	}

	public biggestTitRow(): number {
		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
				index = counter;
		}
		return index;
	}

	public averageBreastSize(): number {
		let counter = this.breastRows.length;
		let average = 0;
		while (counter > 0) {
			counter--;
			average += this.breastRows[counter].breastRating;
		}
		if (this.breastRows.length == 0)
			return 0;
		return (average / this.breastRows.length);
	}

	public averageCockThickness(): number {
		let counter = this.cocks.length;
		let average = 0;
		while (counter > 0) {
			counter--;
			average += this.cocks[counter].cockThickness;
		}
		if (this.cocks.length == 0)
			return 0;
		return (average / this.cocks.length);
	}

	public averageNippleLength(): number {
		let counter = this.breastRows.length;
		let average = 0;
		while (counter > 0) {
			counter--;
			average += (this.breastRows[counter].breastRating / 10 + .2);
		}
		return (average / this.breastRows.length);
	}

	public averageVaginalLooseness(): number {
		let counter = this.vaginas.length;
		let average = 0;
		//If the player has no vaginas
		if (this.vaginas.length == 0)
			return 2;
		while (counter > 0) {
			counter--;
			average += this.vaginas[counter].vaginalLooseness;
		}
		return (average / this.vaginas.length);
	}

	public averageVaginalWetness(): number {
		//If the player has no vaginas
		if (this.vaginas.length == 0)
			return 2;
		let counter = this.vaginas.length;
		let average = 0;
		while (counter > 0) {
			counter--;
			average += this.vaginas[counter].vaginalWetness;
		}
		return (average / this.vaginas.length);
	}

	public averageCockLength(): number {
		let counter = this.cocks.length;
		let average = 0;
		while (counter > 0) {
			counter--;
			average += this.cocks[counter].cockLength;
		}
		if (this.cocks.length == 0)
			return 0;
		return (average / this.cocks.length);
	}

	public canTitFuck(): boolean {
		if (this.breastRows.length == 0) return false;

		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breasts < this.breastRows[counter].breasts && this.breastRows[counter].breastRating > 3)
				index = counter;
		}
		if (this.breastRows[index].breasts >= 2 && this.breastRows[index].breastRating > 3)
			return true;
		return false;
	}

	public mostBreastsPerRow(): number {
		if (this.breastRows.length == 0) return 2;

		let counter = this.breastRows.length;
		let index   = 0;
		while (counter > 0) {
			counter--;
			if (this.breastRows[index].breasts < this.breastRows[counter].breasts)
				index = counter;
		}
		return this.breastRows[index].breasts;
	}

	public averageNipplesPerBreast(): number {
		let counter = this.breastRows.length;
		let breasts = 0;
		let nipples = 0;
		while (counter > 0) {
			counter--;
			breasts += this.breastRows[counter].breasts;
			nipples += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
		}
		if (breasts == 0)
			return 0;
		return Math.floor(nipples / breasts);
	}

	public allBreastsDescript(): string {
		return Appearance.allBreastsDescript(this);
	}

//Simplified these cock descriptors and brought them into the creature class
	public sMultiCockDesc(): any {
		return (this.cocks.length > 1 ? "one of your " : "your ") + this.cockMultiLDescriptionShort();
	}

	public SMultiCockDesc(): any {
		return (this.cocks.length > 1 ? "One of your " : "Your ") + this.cockMultiLDescriptionShort();
	}

	public oMultiCockDesc(): any {
		return (this.cocks.length > 1 ? "each of your " : "your ") + this.cockMultiLDescriptionShort();
	}

	public OMultiCockDesc(): any {
		return (this.cocks.length > 1 ? "Each of your " : "Your ") + this.cockMultiLDescriptionShort();
	}

	public cockMultiLDescriptionShort(): any {
		if (this.cocks.length < 1) {
			return "<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>";
		}
		if (this.cocks.length == 1) { //For a songle cock return the default description
			return Appearance.cockDescript(this, 0);
		}
		switch (this.cocks[0].cockType) { //With multiple cocks only use the descriptions for specific cock types if all cocks are of a single type
			case CockTypesEnum.ANEMONE:
			case CockTypesEnum.CAT:
			case CockTypesEnum.DEMON:
			case CockTypesEnum.DISPLACER:
			case CockTypesEnum.DRAGON:
			case CockTypesEnum.HORSE:
			case CockTypesEnum.KANGAROO:
			case CockTypesEnum.LIZARD:
			case CockTypesEnum.PIG:
			case CockTypesEnum.TENTACLE:
				if (this.countCocksOfType(this.cocks[0].cockType) == this.cocks.length) return Appearance.cockNoun(this.cocks[0].cockType) + "s";
				break;
			case CockTypesEnum.DOG:
			case CockTypesEnum.FOX:
				if (this.countCocksOfType(CockTypesEnum.DOG) == this.cocks.length) return Appearance.cockNoun(CockTypesEnum.DOG) + "s";
			default:
		}
		return Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
	}

	public hasSheath(): boolean {
		if (this.cocks.length == 0) return false;
		for (var x = 0; x < this.cocks.length; x++) {
			switch (this.cocks[x].cockType) {
				case CockTypesEnum.CAT:
				case CockTypesEnum.DISPLACER:
				case CockTypesEnum.DOG:
				case CockTypesEnum.FOX:
				case CockTypesEnum.HORSE:
				case CockTypesEnum.KANGAROO:
				case CockTypesEnum.AVIAN:
				case CockTypesEnum.ECHIDNA:
					return true; //If there's even one cock of any of these types then return true
				default:
			}
		}
		return false;
	}

	public hasKnot(arg: number = 0): boolean {
		if (arg > this.cockTotal() - 1 || arg < 0)
			return false;
		return this.cocks[arg].hasKnot();
	}

//PLACEHOLDER
	public dogCocks(): void {
		outputText("Placeholder for dogCocks in creature.js. Returning.")
		doNext(Camp.returnToCampUseOneHour);
	}


	public cockHead(cockNum: number): string {
		if (cockNum == undefined) cockNum = 0;
		if (cockNum < 0 || cockNum > this.cocks.length - 1) {
			outputText("Something went wrong in Creature.prototype.cockHead!");
		}
		switch (this.cocks[cockNum].cockType) {
			case CockTypesEnum.CAT:
				if (rand(2) == 0) return "point";
				return "narrow tip";
			case CockTypesEnum.DEMON:
				if (rand(2) == 0) return "tainted crown";
				return "nub-ringed tip";
			case CockTypesEnum.DISPLACER:
				switch (rand(5)) {
					case  0:
						return "star tip";
					case  1:
						return "blooming cock-head";
					case  2:
						return "open crown";
					case  3:
						return "alien tip";
					default:
						return "bizarre head";
				}
			case CockTypesEnum.DOG:
			case CockTypesEnum.FOX:
				if (rand(2) == 0) return "pointed tip";
				return "narrow tip";
			case CockTypesEnum.HORSE:
				if (rand(2) == 0) return "flare";
				return "flat tip";
			case CockTypesEnum.KANGAROO:
				if (rand(2) == 0) return "tip";
				return "point";
			case CockTypesEnum.LIZARD:
				if (rand(2) == 0) return "crown";
				return "head";
			case CockTypesEnum.TENTACLE:
				if (rand(2) == 0) return "mushroom-like tip";
				return "wide plant-like crown";
			case CockTypesEnum.PIG:
				if (rand(2) == 0) return "corkscrew tip";
				return "corkscrew head";
			case CockTypesEnum.RHINO:
				if (rand(2) == 0) return "flared head";
				return "rhinoceros dickhead";
			case CockTypesEnum.ECHIDNA:
				if (rand(2) == 0) return "quad heads";
				return "echidna quad heads";
			default:
		}
		if (rand(2) == 0) return "crown";
		if (rand(2) == 0) return "head";
		return "cock-head";
	};

//------------
// ALTERATIONS
//------------
//Addition of parts
	public createCock(clength: number = 5.5, cthickness: number = 1, ctype: CockTypesEnum = CockTypesEnum.HUMAN): void {
		if (this.cocks.length >= 11) return; //This one goes to eleven.
		//New cock
		let newCock = new Cock(clength, cthickness, ctype)
		this.cocks.push(newCock);
		this.genderCheck();
	}

	public createVagina(virgin: boolean = true, vagwetness: number = 1, vaglooseness: number = 0): void {
		if (this.vaginas.length >= 3) return; //Limit of 3 vaginas
		//New vagina
		let newVagina = new Vagina(vagwetness, vaglooseness, virgin, 0);
		this.vaginas.push(newVagina);
		this.genderCheck();
	}

	public createBreastRow(size: number = 0, nipplesPerBreast: number = 1): void {
		if (this.breastRows.length >= 10) return; //Limit of 10 breast rows
		//New breast row
		let newBreastRow = new BreastRow(size, nipplesPerBreast);
		this.breastRows.push(newBreastRow);
		this.genderCheck();
	}

//Removal of parts
	public removeCock(arraySpot: number = 0, totalRemoved: number = 1): void {
		//Various Errors preventing action
		if (arraySpot < 0 || totalRemoved <= 0) {
			//trace("ERROR: removeCock called but arraySpot is negative or totalRemoved is 0.");
			return;
		}
		if (this.cocks.length == 0) {
			//trace("ERROR: removeCock called but cocks do not exist.");
		}
		else {
			if (arraySpot > this.cocks.length - 1) {
				//trace("ERROR: removeCock failed - array location is beyond the bounds of the array.");
			}
			else {
				try {
					/*let cock = this.cocks[arraySpot];
					 if (cock.sock == "viridian") {
					 this.removePerk(PerkLib.LustyRegeneration);
					 }
					 else if (cock.sock == "cockring") {
					 let numRings = 0;
					 for (var i = 0; i < this.cocks.length; i++) {
					 if (this.cocks[i].sock == "cockring") numRings++;
					 }

					 if (numRings == 0) this.removePerk(PerkLib.PentUp);
					 else this.setPerkValue(PerkLib.PentUp, 1, 5 + (numRings * 5));
					 }*/
					this.cocks.splice(arraySpot, totalRemoved);
				}
				catch (e) {
					console.error(e); //trace("Argument error in Creature[" + this._short + "]: " + e.message);
				}
				//trace("Attempted to remove " + totalRemoved + " cocks.");
			}
		}
		this.genderCheck();
	}

	public removeVagina(arraySpot: number = 0, totalRemoved: number = 1): void {
		//Defaulting
		if (arraySpot == undefined) arraySpot = 0;
		if (totalRemoved == undefined) totalRemoved = 1;
		//Various Errors preventing action
		if (arraySpot < -1 || totalRemoved <= 0) {
			//trace("ERROR: removeVagina called but arraySpot is negative or totalRemoved is 0.");
			return;
		}
		if (this.vaginas.length == 0) {
			//trace("ERROR: removeVagina called but cocks do not exist.");
		}
		else {
			if (arraySpot > this.vaginas.length - 1) {
				//trace("ERROR: removeVagina failed - array location is beyond the bounds of the array.");
			}
			else {
				this.vaginas.splice(arraySpot, totalRemoved);
				//trace("Attempted to remove " + totalRemoved + " vaginas.");
			}
		}
		this.genderCheck();
	}

	public removeBreastRow(arraySpot: number = 0, totalRemoved: number = 1): void {
		//Defaulting
		if (arraySpot == undefined) arraySpot = 0;
		if (totalRemoved == undefined) totalRemoved = 1;
		//Various Errors preventing action
		if (arraySpot < -1 || totalRemoved <= 0) {
			//trace("ERROR: removeBreastRow called but arraySpot is negative or totalRemoved is 0.");
			return;
		}
		if (this.breastRows.length == 0) {
			//trace("ERROR: removeBreastRow called but cocks do not exist.");
		}
		else if (this.breastRows.length == 1 || this.breastRows.length - totalRemoved < 1) {
			//trace("ERROR: Removing the current breast row would break the Creature classes assumptions about breastRow contents.");
		}
		else {
			if (arraySpot > this.breastRows.length - 1) {
				//trace("ERROR: removeBreastRow failed - array location is beyond the bounds of the array.");
			}
			else {
				this.breastRows.splice(arraySpot, totalRemoved);
				//trace("Attempted to remove " + totalRemoved + " breastRows.");
			}
		}
	}

	public shrinkTits(ignore_hyper_happy: boolean): void {
		if (hyperHappy && !ignore_hyper_happy) return;
		if (this.breastRows.length == 1) {
			if (this.breastRows[0].breastRating > 0) {
				//Shrink if bigger than N/A cups
				let temp = 1;
				this.breastRows[0].breastRating--;
				//Shrink again 50% chance
				if (this.breastRows[0].breastRating >= 1 && rand(2) == 0 /*&& this.findPerk(PerkLib.BigTits) < 0*/) {
					temp++;
					this.breastRows[0].breastRating--;
				}
				if (this.breastRows[0].breastRating < 0) this.breastRows[0].breastRating = 0;
				//Talk about shrinkage
				if (temp == 1) outputText("<br><br>You feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.");
				if (temp == 2) outputText("<br><br>You feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.");
			}
		}
		else if (this.breastRows.length > 1) {
			//multiple
			outputText("<br>");
			//temp2 = amount changed
			//temp3 = counter
			let temp2 = 0;
			let temp3 = this.breastRows.length;
			while (temp3 > 0) {
				temp3--;
				if (this.breastRows[temp3].breastRating > 0) {
					this.breastRows[temp3].breastRating--;
					if (this.breastRows[temp3].breastRating < 0) this.breastRows[temp3].breastRating = 0;
					temp2++;
					outputText("<br>");
					if (temp3 < this.breastRows.length - 1)
						outputText("...and y");
					else
						outputText("Y");
					outputText("our " + player.breastDescript(temp3) + " shrink, dropping to " + this.breastCup(temp3) + "s.");
				}
				if (this.breastRows[temp3].breastRating < 0) this.breastRows[temp3].breastRating = 0;
			}
			if (temp2 == 2) outputText("<br>You feel so much lighter after the change.");
			if (temp2 == 3) outputText("<br>Without the extra weight you feel particularly limber.");
			if (temp2 >= 4) outputText("<br>It feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
		}
	}

	public growTits(amount: number, rowsGrown: number, display: boolean, growthType: number): void {
		if (this.breastRows.length == 0) return;
		//GrowthType 1 = smallest grows
		//GrowthType 2 = Top Row working downward
		//GrowthType 3 = Only top row
		let temp2 = 0;
		let temp3 = 0;
		//Chance for "big tits" perked characters to grow larger!
		//if (this.hasPerk(PerkLib.BigTits) && rand(3) == 0 && amount < 1) amount = 1;

		// Needs to be a number, since uint will round down to 0 prevent growth beyond a certain point
		let temp = this.breastRows.length;
		if (growthType == 1) {
			//Select smallest breast, grow it, move on
			while (rowsGrown > 0) {
				//Temp = counter
				temp  = this.breastRows.length;
				//Temp2 = smallest tits index
				temp2 = 0;
				//Find smallest row
				while (temp > 0) {
					temp--;
					if (this.breastRows[temp].breastRating < this.breastRows[temp2].breastRating) temp2 = temp;
				}
				//Temp 3 tracks total amount grown
				temp3 += amount;
				//Reuse temp to store growth amount for diminishing returns.
				temp = amount;
				if (!hyperHappy) {
					//Diminishing returns!
					if (this.breastRows[temp2].breastRating > 3) {
						/*if (this.hasPerk(PerkLib.BigTits)) {
						 temp /= 1.3;
						 } else */
						temp /= 1.5;
					}

					// WHy are there three options here. They all have the same result.
					if (this.breastRows[temp2].breastRating > 7) {
						/*if (this.hasPerk(PerkLib.BigTits)) {
						 temp /= 1.5;
						 } else */
						temp /= 2;
					}
					if (this.breastRows[temp2].breastRating > 9) {
						/*if (this.hasPerk(PerkLib.BigTits)) {
						 temp /= 1.5;
						 } else */
						temp /= 2;
					}
					if (this.breastRows[temp2].breastRating > 12) {
						/*if (this.hasPerk(PerkLib.BigTits)) {
						 temp /= 1.5;
						 } else */
						temp /= 2;
					}
				}

				//Grow!
				this.breastRows[temp2].breastRating += temp;
				rowsGrown--;
			}
		}

		if (!hyperHappy) {
			//Diminishing returns!
			if (this.breastRows[0].breastRating > 3) {
				/*if (this.hasPerk(PerkLib.BigTits)) {
				 amount /= 1.3;
				 } else */
				amount /= 1.5;
			}
			if (this.breastRows[0].breastRating > 7) {
				/*if (this.hasPerk(PerkLib.BigTits)) {
				 amount /= 1.5;
				 } else */
				amount /= 2;
			}
			if (this.breastRows[0].breastRating > 12) {
				/*if (this.hasPerk(PerkLib.BigTits)) {
				 amount /= 1.5;
				 } else */
				amount /= 2;
			}
		}
		if (growthType == 2) {
			temp = 0;
			//Start at top and keep growing down, back to top if hit bottom before done.
			while (rowsGrown > 0) {
				if (temp + 1 > this.breastRows.length) temp = 0;
				this.breastRows[temp].breastRating += amount;
				temp++;
				temp3 += amount;
				rowsGrown--;
			}
		}
		if (growthType == 3) {
			while (rowsGrown > 0) {
				rowsGrown--;
				this.breastRows[0].breastRating += amount;
				temp3 += amount;
			}
		}
		//Breast Growth Finished...talk about changes.
		if (display) {
			if (growthType < 3) {
				if (amount <= 2) {
					if (this.breastRows.length > 1) outputText("Your rows of " + this.breastDescript(0) + " jiggle with added weight, growing a bit larger.");
					if (this.breastRows.length == 1) outputText("Your " + this.breastDescript(0) + " jiggle with added weight as they expand, growing a bit larger.");
				}
				else if (amount <= 4) {
					if (this.breastRows.length > 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + this.breastDescript(0) + " expand significantly.");
					if (this.breastRows.length == 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.");
				}
				else {
					if (this.breastRows.length > 1) outputText("You drop to your knees from a massive change in your body's center of gravity.  Your " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.");
					if (this.breastRows.length == 1) outputText("You drop to your knees from a massive change in your center of gravity.  The tingling in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.");
				}
				if (this.biggestTitSize() >= 8.5 && this.nippleLength < 2) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = 2;
				}
				if (this.biggestTitSize() >= 7 && this.nippleLength < 1) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = 1;
				}
				if (this.biggestTitSize() >= 5 && this.nippleLength < .75) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = .75;
				}
				if (this.biggestTitSize() >= 3 && this.nippleLength < .5) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = .5;
				}
			}
			else {
				if (amount <= 2) {
					if (this.breastRows.length > 1) outputText("Your top row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.");
					if (this.breastRows.length == 1) outputText("Your row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.");
				}
				if (amount > 2 && amount <= 4) {
					if (this.breastRows.length > 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + this.breastDescript(0) + " expand significantly.");
					if (this.breastRows.length == 1) outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.");
				}
				if (amount > 4) {
					if (this.breastRows.length > 1) outputText("You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.");
					if (this.breastRows.length == 1) outputText("You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.");
				}
				if (this.biggestTitSize() >= 8.5 && this.nippleLength < 2) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = 2;
				}
				if (this.biggestTitSize() >= 7 && this.nippleLength < 1) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = 1;
				}
				if (this.biggestTitSize() >= 5 && this.nippleLength < .75) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = .75;
				}
				if (this.biggestTitSize() >= 3 && this.nippleLength < .5) {
					outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.");
					this.nippleLength = .5;
				}
			}
		}
	}

	public genderCheck(): void {
		if (this.cocks.length > 0) { //Got dicks? Either male or herm.
			if (this.vaginas.length > 0)
				this.gender = 3;
			else
				this.gender = 1;
		}
		else if (this.vaginas.length > 0) //No dicks but have a vagina? Female.
			this.gender = 2;
		else //Got neither? Genderless.
			this.gender = 0;
	}

	public changeCockType(type: CockTypesEnum): number {
		let counter = this.cocks.length;
		while (counter > 0) {
			counter--;
			if (this.cocks[counter].cockType != type) {
				this.cocks[counter].cockType = type;
				return counter;
			}
		}
		return -1;
	}

//Vaginal Stretching
	public cuntChange(cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
		//Main function
		if (this.vaginas.length == 0) return false;
		let wasVirgin  = this.vaginas[0].virgin;
		let stretched  = this.cuntChangeNoDisplay(cArea);
		let devirgined = wasVirgin && !this.vaginas[0].virgin;
		if (devirgined) {
			if (spacingsF) outputText("  ");
			outputText("<b>Your hymen is torn, robbing you of your virginity.</b>");
			if (spacingsB) outputText("  ");
		}
		//STRETCH SUCCESSFUL - begin flavor text if outputting it!
		if (stretched && display) {
			//Virgins get different formatting
			if (devirgined) {
				//If no spaces after virgin loss
				if (!spacingsB) outputText("  ");
			}
			//Non virgins as usual
			else if (spacingsF) outputText("  ");
			this.cuntChangeDisplay();
			if (spacingsB) outputText("  ");
		}
		return stretched;
	}

	public cuntChangeNoDisplay(cArea: number): boolean {
		if (this.vaginas.length == 0) return false;
		let stretched = false;
		if (/*this.findPerk(PerkLib.FerasBoonMilkingTwat) < 0 || */this.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_NORMAL) {
			//cArea > capacity = autostreeeeetch.
			if (cArea >= this.vaginalCapacity()) {
				if (this.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS_CLOWN_CAR) {
				}
				else this.vaginas[0].vaginalLooseness++;
				stretched = true;
			}
			//If within top 10% of capacity, 50% stretch
			else if (cArea >= 0.9 * this.vaginalCapacity() && rand(2) == 0) {
				this.vaginas[0].vaginalLooseness++;
				stretched = true;
			}
			//if within 75th to 90th percentile, 25% stretch
			else if (cArea >= 0.75 * this.vaginalCapacity() && rand(4) == 0) {
				this.vaginas[0].vaginalLooseness++;
				stretched = true;
			}
		}
		//If virgin
		if (this.vaginas[0].virgin) {
			this.vaginas[0].virgin = false;
		}
		//Delay anti-stretching
		if (cArea >= 0.5 * this.vaginalCapacity()) {
			//Cunt Stretched used to determine how long since last enlargement
			let s = this.findStatusEffectByType(StatusEffects.CuntStretched);
			if (!s) this.createStatusEffect(StatusEffects.CuntStretched, 0, 0, 0, 0);
			//Reset the timer on it to 0 when restretched.
			else s.value1 = 0;
		}
		return stretched;
	}

	public cuntChangeDisplay(): void {
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_CLOWN_CAR) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING_WIDE) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched so wide that it gapes continually.</b>");
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_LOOSE) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now very loose.</b>");
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_NORMAL) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is now a little loose.</b>");
		if (this.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_TIGHT) outputText("<b>Your " + Appearance.vaginaDescript(this, 0) + " is stretched out to a more normal size.</b>");
	}

//Anal Stretching
	public buttChange(cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
		//Main function
		let stretched = this.buttChangeNoDisplay(cArea);
		//STRETCH SUCCESSFUL - begin flavor text if outputting it!
		if (stretched && display) {
			if (spacingsF) outputText(" ");
			this.buttChangeDisplay();
			if (spacingsB) outputText(" ");
		}
		return stretched;
	}

	public buttChangeNoDisplay(cArea: number): boolean {
		let stretched = false;
		//cArea > capacity = autostreeeeetch half the time.
		if (cArea >= this.analCapacity() && rand(2) == 0) {
			if (this.ass.analLooseness >= 5) {
			}
			else this.ass.analLooseness++;
			stretched = true;
			//Reset butt stretchin recovery time
			var s     = this.findStatusEffectByType(StatusEffects.ButtStretched);
			if (s) s.value1 = 0;
		}
		//If within top 10% of capacity, 25% stretch
		if (cArea < this.analCapacity() && cArea >= 0.9 * this.analCapacity() && rand(4) == 0) {
			this.ass.analLooseness++;
			stretched = true;
		}
		//if within 75th to 90th percentile, 10% stretch
		if (cArea < 0.9 * this.analCapacity() && cArea >= 0.75 * this.analCapacity() && rand(10) == 0) {
			this.ass.analLooseness++;
			stretched = true;
		}
		//Anti-virgin
		if (this.ass.analLooseness == 0) {
			this.ass.analLooseness++;
			stretched = true;
		}
		//Delay un-stretching
		if (cArea >= 0.5 * this.analCapacity()) {
			//Butt Stretched used to determine how long since last enlargement
			let s = this.findStatusEffectByType(StatusEffects.ButtStretched);
			if (!s) this.createStatusEffect(StatusEffects.ButtStretched, 0, 0, 0, 0);
		}
		return stretched;
	}

	public buttChangeDisplay(): void {
//Allows the test for stretching and the text output to be separated
		if (this.ass.analLooseness == 5) outputText("<b>Your " + Appearance.assholeDescript(this) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
		if (this.ass.analLooseness == 4) outputText("<b>Your " + Appearance.assholeDescript(this) + " becomes so stretched that it gapes continually.</b>");
		if (this.ass.analLooseness == 3) outputText("<b>Your " + Appearance.assholeDescript(this) + " is now very loose.</b>");
		if (this.ass.analLooseness == 2) outputText("<b>Your " + Appearance.assholeDescript(this) + " is now a little loose.</b>");
		if (this.ass.analLooseness == 1) outputText("<b>You have lost your anal virginity.</b>");
	}

//------------
// GENDER UTIL
//------------
	public genderText(male: string   = "man",
					  female: string = "woman",
					  futa: string   = "futa",
					  eunuch: string = "eunuch"): string {
		//Main function
		if (this.vaginas.length > 0) {
			if (this.cocks.length > 0) return futa;
			return female;
		}
		else if (this.cocks.length > 0) {
			return male;
		}
		return eunuch;
	}

	public manWoman(caps: boolean): string {
		//Dicks?
		if (this.totalCocks() > 0) {
			if (this.hasVagina()) {
				if (caps)
					return "Futa";
				else
					return "futa";
			}
			else {
				if (caps)
					return "Man";
				else
					return "man";
			}
		}
		else {
			if (this.hasVagina()) {
				if (caps)
					return "Woman";
				else
					return "woman";
			}
			else {
				if (caps)
					return "Eunuch";
				else
					return "eunuch";
			}
		}
	}

	public mfn(male: string, female: string, neuter: string): string {
		if (this.gender == 0)
			return neuter;
		else
			return this.mf(male, female);
	}

//Rewritten!
	public mf(male: string, female: string): any {
		//if (femWeight()) return female;
		//else return male;
		//Dicks?
		if (this.totalCocks() > 0) {
			if (this.hasVagina()) {
				if (this.biggestTitSize() >= 2) return female;
				else if (this.biggestTitSize() == 1) {
					if (this.femininity > 50) return female;
					else return male;
				}
				else return male;
			}
			else return male;
		}
		else {
			if (this.hasVagina())
				if (this.biggestTitSize() == 0 && this.femininity < 45) return male;
				else return female;
			else {
				if (this.biggestTitSize() >= 3)
					return female;
				else
					return male;
			}
		}
	}

	public maleFemaleHerm(caps: boolean): any {
		if (this.gender == 0) {
			if (caps) return this.mf("Genderless", "Fem-genderless");
			else return this.mf("genderless", "fem-genderless");
		}
		else if (this.gender == 1) {
			if (caps) return this.mf("Male", "Dickgirl");
			else return this.mf("male", "dickgirl");
		}
		else if (this.gender == 2) {
			if (caps) return this.mf("Cuntboy", "Female");
			else return this.mf("cuntboy", "female");
		}
		else if (this.gender == 3) {
			if (caps) return this.mf("Maleherm", "Hermaphrodite");
			else return this.mf("maleherm", "hermaphrodite");
		}
		else return "<b>Gender error!</b>";
	}

//------------
// BODY UTILS
//------------
//Lower body
	public isBiped(): boolean {
		return this.legCount == 2;
	}

	public isNaga(): boolean {
		return (this.lowerBody == LowerBodyType.NAGA);
	}

	public isTaur(): boolean {
		return (this.legCount > 2 && !this.isDrider()); // driders have genitals on their human part, inlike usual taurs... this is actually bad way to check, but too many places to fix just now
	}

	public isDrider(): boolean {
		return (this.lowerBody == LowerBodyType.DRIDER_LOWER_BODY);
	}

	public isGoo(): boolean {
		return (this.lowerBody == LowerBodyType.GOO);
	}

	public legs(): any {
		if (this.isDrider())
			return num2Text(this.legCount) + " spider legs";
		if (this.isTaur()) {
			if (this.lowerBody == LowerBodyType.PONY && rand(3) == 0)
				return "cute pony-legs";
			return num2Text(this.legCount) + " legs";
		}
		if (this.isNaga())
			return "snake-like coils";
		if (this.isGoo())
			return "mounds of goo";
		if (this.isBiped()) { //Biped, has several variants.
			//Bunny legs
			if (this.lowerBody == LowerBodyType.BUNNY) {
				switch (rand(5)) {
					case 0:
						return "fuzzy, bunny legs";
					case 1:
						return "fur-covered legs";
					case 2:
						return "furry legs";
					default:
						return "legs";
				}
			}
			//Avian legs
			if (this.lowerBody == LowerBodyType.HARPY) {
				switch (rand(4)) {
					case 0:
						return "bird-like legs";
					case 1:
						return "feathered legs";
					default:
						return "legs";
				}
			}
			//Fox legs
			if (this.lowerBody == LowerBodyType.FOX) {
				switch (rand(4)) {
					case 0:
						return "fox-like legs";
					case 1:
						return "vulpine legs";
					default:
						return "legs";
				}
			}
			//Raccoon legs
			if (this.lowerBody == LowerBodyType.RACCOON) {
				switch (rand(4)) {
					case 0:
						return "raccoon-like legs";
					default:
						return "legs";
				}
			}
			//Cloven hooved
			if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED) {
				switch (rand(4)) {
					case 0:
						return "pig-like legs";
					case 1:
						return "swine legs";
					default:
						return "legs";
				}
			}
			return "legs"; //Default description for all other bipedal lower body types.
		}
		return "legs"; //Fallback for other body types.
	}

	public leg(): any {
		if (this.isDrider())
			return num2Text(this.legCount) + " spider legs";
		if (this.isTaur()) {
			if (this.lowerBody == LowerBodyType.PONY && rand(3) == 0)
				return "cute pony-leg";
			return "leg";
		}
		if (this.isNaga())
			return "snake-tail";
		if (this.isGoo())
			return "mound of goo";
		if (this.isBiped()) { //Biped, has several variants.
			//Bunny legs
			if (this.lowerBody == LowerBodyType.BUNNY) {
				switch (rand(5)) {
					case 0:
						return "fuzzy, bunny leg";
					case 1:
						return "fur-covered leg";
					case 2:
						return "furry leg";
					default:
						return "leg";
				}
			}
			//Avian legs
			if (this.lowerBody == LowerBodyType.HARPY) {
				switch (rand(4)) {
					case 0:
						return "bird-like leg";
					case 1:
						return "feathered leg";
					default:
						return "leg";
				}
			}
			//Fox legs
			if (this.lowerBody == LowerBodyType.FOX) {
				switch (rand(4)) {
					case 0:
						return "fox-like leg";
					case 1:
						return "vulpine leg";
					default:
						return "leg";
				}
			}
			//Raccoon legs
			if (this.lowerBody == LowerBodyType.RACCOON) {
				switch (rand(4)) {
					case 0:
						return "raccoon-like leg";
					default:
						return "leg";
				}
			}
			//Cloven hooved
			if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED) {
				switch (rand(4)) {
					case 0:
						return "pig-like leg";
					case 1:
						return "swine leg";
					default:
						return "leg";
				}
			}
			return "leg"; //Default description for all other bipedal lower body types.
		}
		return "leg"; //Fallback for other body types.
	}

	public feet(): any {
		if (this.isDrider())
			return "spider feet";
		if (this.isTaur()) {
			if (this.lowerBody == LowerBodyType.PONY && rand(3) == 0)
				return "flat pony-feet";
			return "hooves";
		}
		if (this.isNaga())
			return "coils";
		if (this.isGoo())
			return "slimey cillia";
		if (this.isBiped()) {
			if (this.lowerBody == LowerBodyType.HUMAN)
				return "feet";
			if (this.lowerBody == LowerBodyType.HOOFED)
				return "hooves";
			if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED)
				return "cloven hooves";
			if (this.lowerBody == LowerBodyType.DOG || this.lowerBody == LowerBodyType.CAT || this.lowerBody == LowerBodyType.FOX || this.lowerBody == LowerBodyType.RACCOON) {
				if (this.lowerBody == LowerBodyType.FOX && rand(3) > 0) {
					if (rand(2) == 0) return "fox-like feet";
					else return "soft, padded paws";
				}
				if (this.lowerBody == LowerBodyType.RACCOON && rand(3) > 0) {
					if (rand(2) == 0) return "raccoon-like feet";
					else return "long-toed paws";
				}
				return "paws";
			}
			if (this.lowerBody == LowerBodyType.DEMONIC_HIGH_HEELS)
				return "demonic high-heels";
			if (this.lowerBody == LowerBodyType.DEMONIC_CLAWS)
				return "demonic foot-claws";
			if (this.lowerBody == LowerBodyType.BUNNY) {
				switch (rand(5)) {
					case 0:
						return "large bunny feet";
					case 1:
						return "rabbit feet";
					case 2:
						return "large feet";
					default:
						return "feet";
				}
			}
			if (this.lowerBody == LowerBodyType.HARPY) {
				switch (rand(3)) {
					case 0:
						return "taloned feet";
					default:
						return "feet";
				}
			}
			if (this.lowerBody == LowerBodyType.KANGAROO)
				return "foot-paws";
		}
		return "feet";
	}

	public foot(): any {
		if (this.isDrider())
			return "spider feet";
		if (this.isTaur()) {
			if (this.lowerBody == LowerBodyType.PONY && rand(3) == 0)
				return "flat pony-foot";
			return "hoof";
		}
		if (this.isNaga())
			return "coiled tail";
		if (this.isGoo())
			return "slimey undercarriage";
		if (this.isBiped()) {
			if (this.lowerBody == LowerBodyType.HUMAN)
				return "foot";
			if (this.lowerBody == LowerBodyType.HOOFED)
				return "hoof";
			if (this.lowerBody == LowerBodyType.CLOVEN_HOOFED)
				return "cloven hoof";
			if (this.lowerBody == LowerBodyType.DOG || this.lowerBody == LowerBodyType.CAT || this.lowerBody == LowerBodyType.FOX || this.lowerBody == LowerBodyType.RACCOON) {
				if (this.lowerBody == LowerBodyType.FOX && rand(3) > 0) {
					if (rand(2) == 0) return "fox-like foot";
					else return "soft, padded paw";
				}
				if (this.lowerBody == LowerBodyType.RACCOON && rand(3) > 0) {
					if (rand(2) == 0) return "raccoon-like foot";
					else return "long-toed paw";
				}
				return "paw";
			}
			if (this.lowerBody == LowerBodyType.BUNNY) {
				switch (rand(5)) {
					case 0:
						return "large bunny foot";
					case 1:
						return "rabbit foot";
					case 2:
						return "large foot";
					default:
						return "foot";
				}
			}
			if (this.lowerBody == LowerBodyType.HARPY) {
				switch (rand(3)) {
					case 0:
						return "taloned foot";
					default:
						return "foot";
				}
			}
		}
		return "foot";
	}

	public skinFurScales(): string {
		let skinzilla = "";
		//Adjectives first!
		if (this.skinAdj != "")
			skinzilla += this.skinAdj + ", ";
		//Fur handled a little differently since it uses
		//haircolor
		if (this.skinType == 1)
			skinzilla += this.furColor + " ";
		else
			skinzilla += this.skinTone + " ";
		skinzilla += this.skinDesc;
		return skinzilla;
	}

	public faceDesc(): string {
		let faceo = "";
		//0-10
		if (this.femininity < 10) {
			faceo = "a square chin";
			if (!this.hasBeard())
				faceo += " and chiseled jawline";
			else
				faceo += ", chiseled jawline, and " + this.beard();
		}
		//10+ -20
		else if (this.femininity < 20) {
			faceo = "a rugged looking " + this.face() + " ";
			if (this.hasBeard())
				faceo += "and " + this.beard();
			faceo += "that's surely handsome";
		}
		//21-28
		else if (this.femininity < 28)
			faceo = "a well-defined jawline and a fairly masculine profile";
		//28+-35
		else if (this.femininity < 35)
			faceo = "a somewhat masculine, angular jawline";
		//35-45
		else if (this.femininity < 45)
			faceo = "the barest hint of masculinity on its features";
		//45-55
		else if (this.femininity <= 55)
			faceo = "an androgynous set of features that would look normal on a male or female";
		//55+-65
		else if (this.femininity <= 65)
			faceo = "a tiny touch of femininity to it, with gentle curves";
		//65+-72
		else if (this.femininity <= 72)
			faceo = "a nice set of cheekbones and lips that have the barest hint of pout";
		//72+-80
		else if (this.femininity <= 80)
			faceo = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
		//81-90
		else if (this.femininity <= 90)
			faceo = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
		//91-100
		else
			faceo = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
		return faceo;
	}

//Modify femininity!
	public modFem(goal: number, strength: number = 1): string {
		//Main function
		let output  = "";
		let old     = this.faceDesc();
		let oldN    = this.femininity;
		let Changed = false;
		//If already perfect!
		if (goal == this.femininity)
			return "";
		//If turning MANLYMAN
		if (goal < this.femininity && goal <= 50) {
			this.femininity -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.femininity < goal)
				this.femininity = goal;
			Changed = true;
		}
		//if turning GIRLGIRLY, like duh!
		if (goal > this.femininity && goal >= 50) {
			this.femininity += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.femininity > goal)
				this.femininity = goal;
			Changed = true;
		}
		//Fix if it went out of bounds!
		if (!this.hasPerk(PerkLib.Androgyny)) this.fixFemininity();
		//Abort if nothing changed!
		if (!Changed)
			return "";
		//See if a change happened!
		if (old != this.faceDesc()) {
			//Gain fem?
			if (goal > oldN)
				output = "<br><br><b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
			if (goal < oldN)
				output = "<br><br><b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
		}
		//Barely noticable change!
		else {
			if (goal > oldN)
				output = "<br><br>There's a tingling in your " + this.face() + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
			else if (goal < oldN)
				output = "<br><br>There's a tingling in your " + this.face() + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
		}
		return output;
	}

	public modThickness(goal: number, strength: number = 1): string {
		//Main function
		if (goal == this.thickness)
			return "";
		//Lose weight fatty!
		if (goal < this.thickness && goal < 50) {
			this.thickness -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.thickness < goal)
				this.thickness = goal;
		}
		//Sup tubby!
		if (goal > this.thickness && goal > 50) {
			this.thickness += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.thickness > goal)
				this.thickness = goal;
		}
		//DIsplay 'U GOT FAT'
		if (goal >= this.thickness && goal >= 50)
			return "<br><br>Your center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
		//GET THIN BITCH
		else if (goal <= this.thickness && goal <= 50)
			return "<br><br>Each movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
		return "";
	}

	public modTone(goal: number, strength: number = 1): string {
		//Main function
		if (goal == this.tone)
			return "";
		//Lose muscle visibility!
		if (goal < this.tone && goal < 50) {
			this.tone -= strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.tone < goal) {
				this.tone = goal;
				return "<br><br>You've lost some tone, but can't lose any more this way. (-" + strength + " muscle tone)";
			}
		}
		//MOAR hulkness
		if (goal > this.tone && goal > 50) {
			this.tone += strength;
			//YOUVE GONE TOO FAR! TURN BACK!
			if (this.tone > goal) {
				this.tone = goal;
				return "<br><br>You've gained some muscle tone, but can't gain any more this way. (+" + strength + " muscle tone)";
			}
		}
		//DIsplay BITCH I WORK OUT
		if (goal >= this.tone && goal > 50)
			return "<br><br>Your body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
		//Display DERP I HAVE GIRL MUSCLES
		else if (goal <= this.tone && goal < 50)
			return "<br><br>Moving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
		return "";
	}

//Run this every hour to 'fix' femininity.
	public fixFemininity(): string {
		let output = "";
		//Genderless/herms share the same bounds
		if (this.gender == Gender.NONE || this.gender == Gender.HERM) {
			if (this.femininity < 20) {
				output += "<br><b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				output += "</b><br>";
				this.femininity = 20;
			}
			else if (this.femininity > 85) {
				output += "<br><b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b><br>";
				this.femininity = 85;
			}
		}
		//GURLS!
		else if (this.gender == Gender.FEMALE) {
			if (this.femininity < 30) {
				output += "<br><b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
				output += "</b><br>";
				this.femininity = 30;
			}
		}
		//BOIZ!
		else if (this.gender == Gender.MALE) {
			if (this.femininity > 70) {
				output += "<br><b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b><br>";
				this.femininity = 70;
			}
		}
		return output;
	}

	public hasBeard(): boolean {
		return this.beardLength > 0;
	}

	public beard(): any {
		if (this.hasBeard())
			return "beard";
		else {
			//CoC_Settings.error("");
			return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL KITTEH IMMEDIATELY.</b>";
		}
	}

	public skin(noAdj: boolean = false, noTone: boolean = false): string {
		//Main function
		let skinzilla = "";
		//Only show stuff other than skinDesc if justSkin is false
		if (!noAdj) {
			//Adjectives first!
			if (this.skinAdj != "" && !noTone && this.skinTone != "rough gray") {
				skinzilla += this.skinAdj;
				if (noTone)
					skinzilla += " ";
				else
					skinzilla += ", ";
			}
		}
		if (!noTone)
			skinzilla += this.skinTone + " ";
		//Fur handled a little differently since it uses
		//haircolor
		if (this.skinType == 1)
			skinzilla += "skin";
		else
			skinzilla += this.skinDesc;
		return skinzilla;
	}

	public hasMuzzle(): boolean {
		if (this.faceType == FaceType.HORSE || this.faceType == FaceType.DOG || this.faceType == FaceType.CAT || this.faceType == FaceType.LIZARD || this.faceType == FaceType.KANGAROO || this.faceType == FaceType.FOX || this.faceType == FaceType.DRAGON || this.faceType == FaceType.RHINO || this.faceType == FaceType.ECHIDNA || this.faceType == FaceType.DEER)
			return true;
		return false;
	}

	public face(): any {
		let stringo = "";
		//0 - human
		//5 - Human w/Naga fangz
		//8 - bunnah faceahhh bunbun
		//10 - spidah-face (humanish)
		if (this.faceType == FaceType.HUMAN)
			return "face";
		//1 - horse
		//2 - dogface
		//6 - kittah face
		//7 - lizard face (durned argonians!)
		//9 - kangaface
		if (this.hasMuzzle()) {
			if (rand(3) == 0 && this.faceType == FaceType.HORSE)
				stringo = "long ";
			if (rand(3) == 0 && this.faceType == FaceType.CAT)
				stringo = "feline ";
			if (rand(3) == 0 && this.faceType == FaceType.RHINO)
				stringo = "rhino ";
			if (rand(3) == 0 && (this.faceType == FaceType.LIZARD || this.faceType == FaceType.DRAGON))
				stringo = "reptilian ";
			switch (rand(3)) {
				case 0:
					return stringo + "muzzle";
				case 1:
					return stringo + "snout";
				case 2:
					return stringo + "face";
				default:
					return stringo + "face";
			}
		}
		//3 - cowface
		if (this.faceType == FaceType.COW_MINOTAUR) {
			if (rand(4) == 0)
				stringo = "bovine ";
			if (rand(2) == 0)
				return "muzzle";
			return stringo + "face";
		}
		//4 - sharkface-teeth
		if (this.faceType == FaceType.SHARK_TEETH) {
			if (Math.floor(Math.random() * 4) == 0)
				stringo = "angular ";
			return stringo + "face";
		}
		if (this.faceType == FaceType.PIG || this.faceType == FaceType.BOAR) {
			if (Math.floor(Math.random() * 4) == 0)
				stringo = (this.faceType == FaceType.PIG ? "pig" : "boar") + "-like ";
			if (Math.floor(Math.random() * 4) == 0)
				return stringo + "snout";
			return stringo + "face";
		}
		return "face";
	}

	public hasLongTail(): boolean {
		return this.isNaga() || _.contains(TailGroupLong, this.tailType);
	}

	public hasLongTongue(): boolean {
		return _.contains(TongueGroupLong, this.tongueType);
	}

	public canFly(): boolean {
		//web also makes false!
		//if (this.findStatusEffect(StatusEffects.Web) >= 0) return false;
		return WingType.data(this.wingType).fly;
	}

	//------------
	// DESCRIPTORS
	//------------
	//Cawks!
	public cockAdjective(index: number = this.biggestCockIndex()): string {
		let cock      = this.cocks[index];
		let isPierced = (this.cocks.length == 1) && (cock.isPierced); //Only describe as pierced or sock covered if the creature has just one cock
		let hasSock   = (this.cocks.length == 1) && (cock.sock != "");
		let isGooey   = (this.skinType == SkinType.GOO);
		return Appearance.cockAdjective(cock.cockType, cock.cockLength, cock.cockThickness,
			this.lust, this.cumQ(), isPierced, hasSock, isGooey);
	}

	public cockDescript(x: number = 0): string {
		return Appearance.cockDescript(this, x);
	}

	public cockDescriptShort(x: number = 0): string {
		return Appearance.cockDescript(this, x);
	}

	public multiCockDescriptLight(): string {
		return Appearance.multiCockDescriptLight(this);
	}

	//BALLZ!

	public ballDescript(): string {
		return Appearance.ballsDescription(false, false, this);
	}

	public ballsDescript(): string {
		return Appearance.ballsDescription(false, true, this, true);
	}

	public ballsDescriptLight(forcedSize: boolean = true): string {
		return Appearance.ballsDescription(forcedSize, false, this);
	}

	public sackDescript(): string {
		return Appearance.sackDescript(this);
	}

//Vagoos!
	public vaginaDescript(x: number = 0): string {
		return Appearance.vaginaDescript(this, x);
	}

	public allVaginaDescript(): any {
		if (player.vaginas.length == 1) return this.vaginaDescript(rand(player.vaginas.length - 1));
		if (player.vaginas.length > 1) return (this.vaginaDescript(rand(player.vaginas.length - 1)) + "s");
		return "ERROR: allVaginaDescript called with no vaginas.";
	}

	public clitDescript(): string {
		return Appearance.clitDescription(this);
	}

	//Boobies!
	public chestDesc(): any {
		if (this.biggestTitSize() < 1) return "chest";
		return Appearance.biggestBreastSizeDescript(this);
	}

	public allChestDesc(): any {
		if (this.biggestTitSize() < 1) return "chest";
		return this.allBreastsDescript();
	}

	public breastDescript(x: number = 0): string {
		return Appearance.breastDescript(this.breastRows[x].breastRating);
	}

	public nippleDescript(rowNum: number): string {
		return Appearance.nippleDescription(this, rowNum);
	}

	//Hair and beard ahoy!
	public hairDescript(): string {
		return Appearance.hairDescription(this);
	}

	public beardDescript(): string {
		return Appearance.beardDescription(this);
	}

	public hairOrFur(): string {
		return Appearance.hairOrFur(this);
	}

	//Body descriptors!
	public hipDescript(): string {
		return Appearance.hipDescription(this);
	}

	public assDescript(): string {
		return this.buttDescript();
	}

	public assholeDescript(): string {
		return Appearance.assholeDescript(this);
	}

	public buttDescript(): string {
		return Appearance.buttDescription(this);
	}

	//Other parts!
	public tongueDescript(): string {
		return Appearance.tongueDescription(this);
	}

	public tailDescript(): string {
		return Appearance.tailDescript(this);
	}

	public oneTailDescript(): string {
		return Appearance.oneTailDescript(this);
	}

	public wingsDescript(): string {
		return Appearance.wingsDescript(this);
	}

	//---------
	// PREGNANCY UTILS
	//---------

	public isPregnant(): boolean {
		return this.pregnancyType != 0;
	};

	public isButtPregnant(): boolean {
		return this.buttPregnancyType != 0;
	};

//fertility must be >= random(0-beat)
//If arg == 1 then override any contraceptives and guarantee fertilization
//If arg == -1, no chance of fertilization.
	public knockUp(type: PregnancyType = 0, incubation: number = 0, beat: number = 100, arg: number = 0): void {
		//Contraceptives cancel!
		if (this.hasStatusEffect(StatusEffects.Contraceptives) && arg < 1) return;
		// Originally commented out
		let bonus = 0;
//If arg = 1 (always pregnant), bonus = 9000
		if (arg >= 1) bonus = 9000;
		if (arg <= -1) bonus = -9000;

		if (this.pregnancyIncubation == 0 && this.totalFertility() + bonus > Math.floor(Math.random() * beat) && this.hasVagina()) {
			this.knockUpForce(type, incubation);
			//trace("PC Knocked up with pregnancy type: " + type + " for " + incubation + " incubation.");
		}

//Chance for eggs fertilization - ovi elixir and imps excluded!
		if (type != PregnancyType.IMP && type != PregnancyType.OVIELIXIR_EGGS && type != PregnancyType.ANEMONE) {
			if (this.hasPerk(PerkLib.SpiderOvipositor) || this.hasPerk(PerkLib.BeeOvipositor)) {
				if (this.totalFertility() + bonus > Math.floor(Math.random() * beat)) {
					this.fertilizeEggs();
				}
			}
		}
	};

	public buttKnockUp(type: PregnancyType = 0, incubation: number = 0, beat: number = 100, arg: number = 0): void {
		//Contraceptives cancel!
		if (this.hasStatusEffect(StatusEffects.Contraceptives) && arg < 1)
			return;
		let bonus = 0;
		//If arg = 1 (always pregnant), bonus = 9000
		if (arg >= 1) bonus = 9000;
		if (arg <= -1) bonus = -9000;
		//If unpregnant and fertility wins out:
		if (this.buttPregnancyIncubation == 0 && this.totalFertility() + bonus > Math.floor(Math.random() * beat)) {
			this.buttKnockUpForce(type, incubation);
			//trace("PC Butt Knocked up with pregnancy type: " + type + " for " + incubation + " incubation.");
		}
	};

//The more complex buttKnockUp function used by the player is defined in Character.as
	public buttKnockUpForce(type: PregnancyType = 0, incubation: number = 0, event: number[] = []): void {
		//Functionality
		this.buttPregnancyType       = type;
		this.buttPregnancyIncubation = (type == 0 ? 0 : incubation * 60); //Won't allow incubation time without pregnancy type
		if (event.length > 1) {
			this.buttPregnancyEventArr = event;
			this.buttPregnancyEventNum = 0;
		}
		if (type == 0) {
			this.buttPregnancyEventArr.length = 0;
			this.pregnancyEventNum            = 0;
		}
	};


	public knockUpForce(type: PregnancyType = 0, incubation: number = 0, event: number[] = []): void {
		//Functionality
		this.pregnancyType       = type;
		this.pregnancyIncubation = (type == 0 ? 0 : incubation * 60); //Won't allow incubation time without pregnancy type
		if (event.length > 1) {
			this.pregnancyEventArr = event;
			this.pregnancyEventNum = 0;
		}
		//Reset pregnancy event array and encounter
		if (type == 0) {
			this.pregnancyEventArr.length = 0;
			this.pregnancyEventNum        = 0;
		}
	};

// More for compatibility, though knockUpForce will take care of this too.
	public eventFill(events: number[]): void {
		this.pregnancyEventArr = [];
		for (const event of events) this.pregnancyEventArr.push(event * 60);
	}

	public pregnancyAdvance(): void {
		if (this.pregnancyType == 0) {
			this.pregnancyEventArr.length = 0;
			this.pregnancyEventNum        = 0;
		}
		if (this.pregnancyIncubation > 0) this.pregnancyIncubation--;
		if (this.pregnancyIncubation < 0) this.pregnancyIncubation = 0;
		if (this.buttPregnancyIncubation > 0) this.buttPregnancyIncubation--;
		if (this.buttPregnancyIncubation < 0) this.buttPregnancyIncubation = 0;
		// If there's something in the pregnancy event array, find out what event we're on.
		if (this.pregnancyEventArr.length > 1) {
			for (let j = 0; j < this.pregnancyEventArr.length; j++) {
				if (this.pregnancyIncubation < this.pregnancyEventArr[j]) {
					//outputText("Setting new flag to " + (j + 1));
					this.pregnancyEventNum = j + 1;
				}
			}
		}
		if (this.buttPregnancyEventArr.length > 1) {
			for (let j = 0; j < this.buttPregnancyEventArr.length; j++) {
				if (this.buttPregnancyIncubation < this.buttPregnancyEventArr[j]) {
					//outputText("Setting new flag to " + (j + 1));
					this.buttPregnancyEventNum = j + 1;
				}
			}
		}
	}

}
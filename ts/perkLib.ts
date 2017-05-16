//Hold perk IDs for purpose of looking up.
const PerkIDs: { [index: string]: PerkType } = {};

namespace PerkLib {
	//------------
	// LEVEL UP
	//------------
	export const Evade       = new PerkType("Evade", "Evade", "Increases chances of evading enemy attacks.", "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
	export const Precision   = new PerkType("Precision", "Precision", "Reduces enemy armor by 10. (Req's 25+ Intelligence)", "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
	export const Runner      = new PerkType("Runner", "Runner", "Increases chances of escaping combat.", "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
	export const Spellpower  = new PerkType("Spellpower", "Spellpower", "Increases base spell strength by 50%.", "You choose the 'Spellpower' perk. Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
	export const StrongBack  = new PerkType("StrongBack", "Strong Back", "Enables fourth item slot.", "You choose the 'Strong Back' perk, enabling a fourth item slot.");
	export const StrongBack2 = new PerkType("StrongBack2", "Strong Back 2: Strong Harder", "Enables fifth item slot.", "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
	export const Tank        = new PerkType("Tank", "Tank", "Raises max HP by 50.", "You choose the 'Tank' perk, giving you an additional 50 HP!");
	export const Tank2       = new PerkType("Tank2", "Tank 2", "Raises max HP by 1 per point of Toughness.", "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");
	//------------
	// EQUIPMENT
	//------------
	export const WizardsFocus = new PerkType("Wizard", "Wizard's Focus", "Your wizard's staff grants you additional focus, amplifying the power of your spells.");
	//------------
	// EVENTS
	//------------
	//Jojo
	export const ControlledBreath = new PerkType("ControlledBreath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%.");
	export const CleansingPalm    = new PerkType("CleansingPalm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
	export const Enlightenment    = new PerkType("Enlightenment", "Enlightenment", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
	//Marble
	export const MarblesMilk      = new PerkType("MarblesMilk", "Marble's Milk", "Add Marble's Milk perk description in export const js");
	//Ovipositing
	export const BeeOvipositor    = new PerkType("BeeOvipositor", "Bee Ovipositor", "Bee Ovipositor Description to be added.");
	export const SpiderOvipositor = new PerkType("SpiderOvipositor", "Spider Ovipositor", "Spider Ovipositor Description to be added.");
	//-----------
	// TRANSFORMATION RELATED
	//-----------
	export const BimboBrains   = new PerkType("BimboBrains", "Bimbo Brains", "TO BE ADDED");
	export const FutaFaculties = new PerkType("FutaFac", "Futa Faculties", "TO BE ADDED");
	//Fire Fire!
	export const FireLord      = new PerkType("FireLord", "FireLord", "TO BE ADDED");
	export const Hellfire      = new PerkType("Hellfire", "Hellfire", "TO BE ADDED");
	export const Dragonfire    = new PerkType("Dragonfire", "Dragonfire", "TO BE ADDED");
	export const SlimeCore     = new PerkType("SlimeCore", "Slime Core", "TO BE ADDED");
	//----------
	// UNKNOWN
	//---------
	export const Misdirection             = new PerkType("Misdirection", "Misdirection", "TO BE ADDED");
	export const Flexibility              = new PerkType("Flexibility", "Flexibility", "TO BE ADDED");
	export const ArousingAura             = new PerkType("ArousingAura", "Arousing Aura", "TO BE ADDED");
	export const MinotaurCumResistance    = new PerkType("MinoCumResist", "Minotaur Cum Resistance", "TO BE ADDED");
	export const MinotaurCumAddict        = new PerkType("MinoCumAddict", "Minotaur Cum Addict", "TO BE ADDED");
	export const Masochist                = new PerkType("Masochist", "Masochist", "TO BE ADDED");
	export const HistoryAlchemist         = new PerkType("H.Alchemist", "Alchemist History", "TO BE ADDED");
	export const TransformationResistance = new PerkType("T.Resist", "Transformation Resistance", "TO BE ADDED");
	export const Oviposition              = new PerkType("Oviposit", "Oviposition", "TO BE ADDED");
	export const MessyOrgasms             = new PerkType("MessyOrgasms", "Messy Orgasms", "TO BE ADDED");
	export const MaraesGiftButtslut       = new PerkType("MaraesGiftButtslut", "TO BE ADDED", "TO BE ADDED");
	export const Incorporeality           = new PerkType("Incorporeality", "Incorporeality", "TO BE ADDED");
	export const SpellcastingAffinity     = new PerkType("SpellAff", "Spellcasting Affinity", "TO BE ADDED");
	export const HarpyWomb                = new PerkType("HarpyWomb", "Harpy Womb", "TO BE ADDED");
	export const BasiliskWomb             = new PerkType("BaskWomb", "Basilisk Womb", "TO BE ADDED");
	export const Androgyny                = new PerkType("Androgyny", "Androgyny", "TO BE ADDED");
	export const MaraesGiftStud           = new PerkType("MaraesGiftStud", "Marae's Gift - Stud", "TO BE ADDED");
	export const StaffChanneling          = new PerkType("StaffChanneling", "Staff Channeling", "TO BE ADDED");
	export const Seduction                = new PerkType("Seduction", "Seduction", "TO BE ADDED");
	export const SluttySeduction          = new PerkType("SluttySeduction", "Slutty Seduction", "TO BE ADDED");
	export const BimboBody                = new PerkType("BimboBody", "Bimbo Body", "TO BE ADDED");
	export const BroBody                  = new PerkType("BroBody", "Bro Body", "TO BE ADDED");
	export const BroBrains                = new PerkType("BroBrains", "Bro Brains", "TO BE ADDED");
	export const FutaForm                 = new PerkType("FutaForm", "Futa Form", "TO BE ADDED");
	export const SensualLover = new PerkType("SensualLover", "Sensual Lover", "TO BE ADDED");
	export const BroodMother  = new PerkType("BroodMother", "Brood Mother", "TO BE ADDED");
	export const Feeder       = new PerkType("Feeder", "Feeder", "TO BE ADDED");
	export const BulgeArmor   = new PerkType("BulgeArmor", "Bulge Armor", "TO BE ADDED");
	export const HistoryWhore = new PerkType("HistoryWhore", "History: Whore", "TO BE ADDED");
	export const BigClit      = new PerkType("BigClit", "Big Clit", "TO BE ADDED");
	export const BloodMage    = new PerkType("BloodMage", "Blood Mage", "TO BE ADDED");
}

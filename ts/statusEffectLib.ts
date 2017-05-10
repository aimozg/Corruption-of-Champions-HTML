const StatusEffectIDs: { [index: string]: StatusEffectType } = {};
namespace StatusEffects {
	//------------
	// NON-COMBAT
	//------------
	//Bonus
	export const BonusACapacity = new StatusEffectType("Bonus aCapacity");
	export const BonusVCapacity = new StatusEffectType("Bonus vCapacity");
	export const Heat           = new StatusEffectType("Heat");
	export const Rut            = new StatusEffectType("Rut");
	export const ButtStretched  = new StatusEffectType("Butt Stretched");
	export const CuntStretched  = new StatusEffectType("Cunt Stretched");
	//Penalties
	export const Infested       = new StatusEffectType("Infested");
	export const WormPlugged    = new StatusEffectType("Worm Plugged");
	export const Dysfunction    = new StatusEffectType("Dysfunction");
	export const SlimeCraving   = new StatusEffectType("Slime Craving");
	//Neutral
	export const Feeder         = new StatusEffectType("Feeder");
	export const MeanToNaga     = new StatusEffectType("Mean to Naga");
	export const Contraceptives = new StatusEffectType("Contraceptives");
	export const Eggs           = new StatusEffectType("Eggs");
	export const Uniball        = new StatusEffectType("Uniball"); //TODO: Check code to see if this would be better as a gameflag
	//------------
	// COMBAT
	//------------
	//Buffs
	export const ChargeWeapon = new StatusEffectType("ChargeWeapon");
	export const Might        = new StatusEffectType("Might");
	export const Climbed      = new StatusEffectType("Climbed"); // Used in Sand Trap fight;
	//Debuffs
	export const Acid          = new StatusEffectType("Acid");
	export const Blind         = new StatusEffectType("Blind");
	export const Bind          = new StatusEffectType("Bind"); //Value determines the type.
	export const Confusion     = new StatusEffectType("Confusion");
	export const NoFlee        = new StatusEffectType("NoFlee");
	export const Poison        = new StatusEffectType("Poison");
	export const Silence       = new StatusEffectType("Silence");
	export const StoneLust     = new StatusEffectType("StoneLust");
	export const Stunned       = new StatusEffectType("Stunned");
	export const TemporaryHeat = new StatusEffectType("TempHeat");
	export const Venom         = new StatusEffectType("Venom");
	export const ParalyzeVenom = new StatusEffectType("ParalyzeVenom");
	export const LustVenom     = new StatusEffectType("LustVenom");
	export const Fertilized    = new StatusEffectType("Fertilized"); // Used in SandTrap battles.
}

const BIND_TYPE_GOO      = 0;
const BIND_TYPE_NAGA     = 1;
const BIND_TYPE_TENTACLE = 2;

const VENOM_TYPE_BEE  = 0;
const VENOM_TYPE_NAGA = 1;

/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare interface HTMLElement {
	tooltipHeader?: string;
	tooltipText?: string;
}

declare function cleanupAfterCombat():void;
declare function combatRoundOver():void;

declare class Amily extends Creature {

}
declare class Creature {
	public name:string;
	public str:number;
	public tou:number;
	public spe:number;
	public inte:number;
	public lib:number;
	public sens:number;
	public cor:number;
	public HP:number;
	public lust:number;
	public lustVuln:number;
	public fatigue:number;
	public level:number;
	public XP:number;
	public gems:number;
	public armor:Item;
	public weapon:Item;
	public maxHP():number;
	public minLust():number;
	public maxLust():number;
	public maxFatigue():number;
	public pregnancyAdvance():void;
}
declare namespace Inventory {
	function takeItem(oldItem:Item,returnTo:Function):void;
	function inventoryMenu():void;
}
declare const KeyItemIDs: { [index: string]: KeyItemType };
declare const PerkIDs: { [index: string]: PerkType };
declare namespace PerkLib {
	export const Spellpower:PerkType;
	export const Tank:PerkType;
	export const Tank2:PerkType;
	export const WizardsFocus:PerkType;
}
declare class Player extends Creature {

}
declare class Tamani extends Creature {

}

declare let amily: Amily;
declare let hyperHappy: boolean;
declare let monster: Creature;
declare let player: Player;
declare let tamanipreg: Tamani;
declare let time: {
	minutes:number;
	hours:number;
	days:number;
}
declare let use12Hours:boolean;

/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare function cleanupAfterCombat():void;
declare function clearOutput():void;
declare function combatRoundOver():void;
declare function doNext(fn:Function):void;
declare function outputText(text:string):void;
declare function refreshStats():void;
declare function showUpDown(arrow:String,direction:"up"|"down"):void;

declare class Creature {
	public armor:Item;
	public weapon:Item;
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
declare const StatusEffectIDs: { [index: string]: StatusEffectType };

declare let hyperHappy: boolean;
declare let monster: Creature;
declare let player: Player;



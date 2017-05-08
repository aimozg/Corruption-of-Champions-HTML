/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare function capitalize(s:string):string;
declare function capitalizeFirstLetter(s:string):string;
declare function cleanupAfterCombat():void;
declare function clearOutput():void;
declare function combatRoundOver():void;
declare function doNext(fn:Function):void;
declare function lookupItem(id:string):Item|null;
declare function outputText(text:string):void;
declare function rand(n:int):int;
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
declare namespace PerkLib {
	export const Spellpower:string;
	export const Tank:string;
	export const Tank2:string;
	export const WizardsFocus:string;
}
declare class Player extends Creature {

}

declare let monster: Creature;
declare let player: Player;



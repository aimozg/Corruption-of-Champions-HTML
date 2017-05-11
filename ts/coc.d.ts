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
declare namespace Camp {
	function returnToCampUseOneHour():void;
}
declare namespace ConsumableEffects {
	function beeTFs(typ:int):void;
	function blackSpellbook():void;
	function bodyLotion():void;
	function canineTFs(typ:int):void;
	function cowTFs(tainted:boolean, enhanced:boolean):void;
	function demonTFs(type:int, purified:boolean):void;
	function equineTFs():void;
	function felineTFs():void;
	function fishFillet():void;
	function goblinTFs():void;
	function hairDye():void;
	function harpyTFs(typ:int):void;
	function humanTFs():void;
	function impTFs():void;
	function lactaid():void;
	function lizardTFs():void;
	function lustDraft(fuck?:boolean):void;
	function minotaurTFs():void;
	function minotaurCum(purified:boolean):void;
	function pigTFs():void;
	function reductoMenu():void;
	function scholarsTea():void;
	function slimeTFs():void;
	function snakeTFs():void;
	function skinOil():void;
	function succubiDelight(purified:boolean):void;
	function tatteredScroll():void;
	function vitalityTincture():void;
	function whiteSpellBook():void;
}
declare namespace Inventory {
	function takeItem(oldItem:Item,returnTo?:Function):void;
	function inventoryMenu():void;
	function itemGoNext():void;
}
declare namespace StatusEffects {
	const BlackNipples:StatusEffectType;
}
declare class Tamani extends Creature {

}

declare let amily: Amily;
declare let inCombat: boolean;
declare let monster: Creature;
declare let tamanipreg: Tamani;

declare let TIMES_ORGASMED:string;
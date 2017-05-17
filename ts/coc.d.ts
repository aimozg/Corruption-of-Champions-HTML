/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare interface HTMLElement {
	tooltipHeader?: string;
	tooltipText?: string;
}

declare function newGamePlusMod():number;

declare class Amily extends Monster {
	public doAI(): void;
}
declare namespace AmilyScene {
	function start():void;
	function pcBirthsAmilysKidsQuestVersion():void;
}
declare class Anemone extends Monster {
	applyVenom(arg1:number):void;

	public doAI(): void;
}
declare namespace BeeGirlScene {
	function beeEncounter():void;
}
declare namespace ConsumableEffects {
	function beeTFs(typ:int):void;
	function canineTFs(typ:int):void;
	function cowTFs(tainted:boolean, enhanced:boolean):void;
	function demonTFs(type:int, purified:boolean):void;
	function equineTFs():void;
	function felineTFs():void;
	function goblinTFs():void;
	function harpyTFs(typ:int):void;
	function humanTFs():void;
	function impTFs():void;
	function lizardTFs():void;
	function minotaurTFs():void;
	function pigTFs():void;
	function slimeTFs():void;
	function snakeTFs():void;
	function succubiDelight(purified:boolean):void;
}

declare let amily: Amily;

/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare interface HTMLElement {
	tooltipHeader?: string;
	tooltipText?: string;
}

declare function magicMenu():void;
declare function physicalSpecials():void;
declare function mentalSpecials():void;
declare function newGamePlusMod():number;

declare class Amily extends Creature {

}
declare namespace AmilyScene {
	function start():void;
	function pcBirthsAmilysKidsQuestVersion():void;
}
declare class Anemone extends Creature {
	applyVenom(arg1:number):void;
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
declare class GooGirl extends Creature {
	gooColor4():string;
}
declare namespace GooGirlScene {
	function encounterGooGirl():void;
	function spyOnGooAndOozeSex():void;
}
declare namespace GreenSlimeScene {
	function encounterSlime():void;
}
declare namespace JojoScene {
	function jojoCamp():void;
	function jojoCampCorrupt():void;
	function routeJojoEncounter():void;
}
declare namespace MinotaurScene {
	function encounterMinotaur():void;
}
declare class Tamani extends Creature {

}
declare namespace TamaniScene {
	function encounterTamani():void;
}

declare let amily: Amily;
declare let tamanipreg: Tamani;

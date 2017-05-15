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
declare function gameOver():void;
declare function inCombat():boolean;
declare function newGamePlusMod():number;
declare function startCombat(monster:Creature):void;

declare class Amily extends Creature {

}
declare namespace AmilyScene {
	function start():void;
	function pcBirthsAmilysKidsQuestVersion():void;
}
declare namespace BeeGirlScene {
	function beeEncounter():void;
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
	function scholarsTea():void;
	function slimeTFs():void;
	function snakeTFs():void;
	function skinOil():void;
	function succubiDelight(purified:boolean):void;
	function tatteredScroll():void;
	function vitalityTincture():void;
	function whiteSpellBook():void;
}
declare namespace GiacomoScene {
	function giacomoEncounter():void;
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
declare namespace HellhoundScene {
	function hellhoundEncounter():void;
}
declare namespace JojoScene {
	function jojoCamp():void;
	function jojoCampCorrupt():void;
	function routeJojoEncounter():void;
}
declare namespace MinotaurScene {
	function encounterMinotaur():void;
}
declare namespace RathazulScene {
	function campRathazul():void;
	function encounterRathazul():void;
}
declare class Tamani extends Creature {

}
declare namespace TamaniScene {
	function encounterTamani():void;
}
declare class TentacleBeast extends Creature {

}
declare namespace TentacleBeastScene {
	function encounter():void;
}

declare let amily: Amily;
declare let monster: Creature;
declare let tamanipreg: Tamani;

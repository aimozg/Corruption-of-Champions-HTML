/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare type int = number;

declare interface HTMLElement {
	tooltipHeader?: string;
	tooltipText?: string;
}

declare function addToGameFlags(...flags:string[]):void;
declare function cleanupAfterCombat():void;
declare function combatRoundOver():void;
declare function gameOver():void;
declare function inCombat():boolean;
declare function mainMenu():void;
declare function startCombat(monster:Creature):void;

declare class Amily extends Creature {

}
declare namespace AmilyScene {
	function pcBirthsAmilysKidsQuestVersion():void;
}
declare namespace Areas {
	namespace Forest {
		function explore():void;
	}
	namespace Lake {
		function explore():void;
	}
	namespace Desert {
		function explore():void;
	}
	namespace Mountain {
		function explore():void;
	}
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
declare class Goblin extends Creature {

}
declare class GooGirl extends Creature {
	gooColor4():string;
}
declare class Imp extends Creature {

}
declare namespace JojoScene {
	function jojoCamp():void;
	function jojoCampCorrupt():void;
}
declare namespace Places {
	function placesMenu():void;
}
declare namespace RathazulScene {
	function campRathazul():void;
}
declare namespace SandTrapScene {
	function birfSandTarps():void;
}
declare class Tamani extends Creature {

}
declare class TentacleBeast extends Creature {

}

declare let amily: Amily;
declare let monster: Creature;
declare let tamanipreg: Tamani;

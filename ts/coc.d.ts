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
declare namespace ConsumableEffects {
	function hairDye():void;
	function skinOil():void;
	function bodyLotion():void;
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
	public skinType:number;
	public hairLength:number;
	public hairType:number;
	public hairColor:number;
	public beardLength:number;
	public beardStyle:number;
	public tallness:number;
	public tongueType:number;
	public wingType:number;
	public tailType:number;
	public tailCount:number;
	public nipplesPierced:number;
	public nippleLength:number;
	public hipRating:number;
	public buttRating:number;
	public thickness:number;
	public tone:number;
	public balls:number;
	public ballSize:number;
	public hoursSinceCum:number;
	public armor:Item;
	public weapon:Item;
	public ass:Ass;
	public cocks:Cock[];
	public vaginas:Vagina[];
	public breastRows:BreastRow[];
	public clitLength:number;
	public maxHP():number;
	public minLust():number;
	public maxLust():number;
	public maxFatigue():number;
	public pregnancyAdvance():void;
	public hasFuckableNipples():boolean;
	public hasVagina():boolean;
	public isTaur():boolean;
	public isNaga():boolean;
	public biggestLactation():number;
	public cumQ():number;
	public biggestTitRow():number;
	public averageBreastSize():number;
	public cockTotal():number;
	public cockDescript(index?:number):string;
	public cockAdjective(index?:number):string;
	public nippleDescript(index?:number):string;
	public vaginaType():VaginaTypesEnum;
	public findPerk(perk:PerkType):number;
	public findStatusEffect(set:StatusEffectType):number;
	public dynStats(stats:string,val:number):void;
	public dynStats(...stats:[string,number][]):void;
	public changeHP(val:number,output:boolean):void;
	public changeLust(amount:number, display?:boolean, newpg?:boolean, resisted?:boolean):void;
	public modFem(goal:number,strength:number):string;
	public refillHunger(val:number):void;
	public growTits(amount:number,rowsGrown:number,display:boolean, growthType:number):void;
	public slimeFeed():void;
}
declare namespace Inventory {
	function takeItem(oldItem:Item,returnTo:Function):void;
	function inventoryMenu():void;
}
declare class Player extends Creature {

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
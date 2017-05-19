/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare interface HTMLElement {
	tooltipHeader?: string;
	tooltipText?: string;
}

declare function newGamePlusMod():number;

declare class Anemone extends Monster {
	applyVenom(arg1:number):void;

	public doAI(): void;
}

/*
 * Created by aimozg on 08.05.2017.
 * Confidential until published on GitHub
 */

declare function clearOutput():void;
declare function doNext(fn:Function):void;
declare function lookupItem(id:string):Item|null;
declare function outputText(text:string):void;

declare class Creature {
	public armor:Item;
	public weapon:Item;
}
declare namespace Inventory {
	function takeItem(oldItem:Item,returnTo:Function):void;
	function inventoryMenu():void;
}
declare class Player extends Creature {

}

declare let player: Player;

declare type int = number;

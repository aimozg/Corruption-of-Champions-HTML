// Miscellenious functions


const NUMBER_WORDS_NORMAL     = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const NUMBER_WORDS_CAPITAL    = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const NUMBER_WORDS_POSITIONAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

//Format string
//Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
function formatStringArray(stringList:any[]):string {
	switch (stringList.length) {
		case  0:
			return "";
		case  1:
			return stringList[0];
		case  2:
			return stringList[0] + " and " + stringList[1];
		default:
	}
	let concat = stringList[0];
	for (let x = 1; x < stringList.length - 1; x++) concat += ", " + stringList[x];
	return concat + " and " + stringList[stringList.length - 1];
}

//Number to words
function num2Text(number:number):string {
	if (number >= 0 && number <= 10) return NUMBER_WORDS_NORMAL[number];
	return number.toString();
}
function num2Text2(number:number):string {
	if (number < 0) return number.toString(); //Can't really have the -10th of something
	if (number <= 10) return NUMBER_WORDS_POSITIONAL[number];
	switch (number % 10) {
		case 1:
			return number.toString() + "st";
		case 2:
			return number.toString() + "nd";
		case 3:
			return number.toString() + "rd";
		default:
	}
	return number.toString() + "th";
}
function Num2Text(number:number):string {
	if (number >= 0 && number <= 10) return NUMBER_WORDS_CAPITAL[number];
	return number.toString();
}

//Comma display
function formatNumber(num:number):string {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

//Capitalize letters
function capitalizeFirstLetter(string:string):string {
	return string.slice(0,1).toUpperCase() + string.slice(1);
}
function capitalize(string:string):string { //Alternate function
	return capitalizeFirstLetter(string);
}

//Randomization
function rand(num:number):number {
	let result = Math.random() * num;
	return Math.floor(result);
}
function randomChoice<T>(options:T[]):T;
function randomChoice<T>(option1:T,...options:T[]):T;
function randomChoice() {
	let choice;
	if (arguments.length == 1 && Array.isArray(arguments[0])) {
		choice = Math.round(Math.random() * (arguments[0].length - 1));
		return arguments[0][choice];
	}
	else {
		choice = Math.round(Math.random() * (arguments.length - 1));
		return arguments[choice];
	}
}

//Lookup
function lookupItem(id:string):Item|undefined {
	return ItemLib[id];
}

function lookupKeyItem(id:string):KeyItemType|undefined {
	return KeyItemIDs[id];
}

function lookupPerk(id:string):PerkType|undefined {
	return PerkIDs[id];
}

function lookupStatusEffects(id:string):StatusEffectType|undefined {
	return StatusEffectIDs[id];
}

//Function
function createCallBackFunction<A1,R>(func:(arg1:A1)=>R, arg1:A1):()=>R;
function createCallBackFunction<A1,A2,R>(func:(arg1:A1,arg2:A2)=>R, arg1:A1, arg2:A2):()=>R;
function createCallBackFunction<A1,A2,A3,R>(func:(arg1:A1,arg2:A2,arg3:A3)=>R, arg1:A1, arg2:A2, arg3:A3):()=>R;
function createCallBackFunction(func:Function, arg1?:any, arg2?:any, arg3?:any):()=>any;
function createCallBackFunction(func:Function, arg1?:any, arg2?:any, arg3?:any):()=>any {
	if (arg1 != undefined) {
		if (arg2 != undefined) {
			if (arg3 != undefined) {
				return () =>{
					func(arg1, arg2, arg3);
				}
			}
			return () =>{
				func(arg1, arg2);
			}
		}
		return () =>{
			func(arg1);
		}
	}
	return () =>{
		func();
	}
}

function createMapFromPairs<V>(src:[string|number,V][]): {[index:string]:V} {
	let result: {[index:string]:V} = {};
	for (let i = 0; i < src.length; i++) result[src[i][0]] = src[i][1];
	return result;
}

function clamp(min:number,x:number,max:number):number {
	return x < min ? min : x > max ? max : x;
}
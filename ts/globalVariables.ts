//Variables that can be set as development progresses.
let gameVersion = "0.1.2 alpha";
let saveVersion = 1; //If this value is increased, the saves will be upgraded to accommodate the new changes.
let levelCap    = 5; //Determines the maximum level a player can attain. This will be raised as dungeons are added.

//Game settings
let debug         = false;
let silly         = false;
let hyperHappy    = false;
let lowStandards  = false;
let hungerEnabled = false;
let SFWMode       = false;

//Interface settings
let use12Hours = false;
let useMetrics = false;

//Store data for fonts
let buttonFont = "Papyrus";
let mainFont = "Times New Roman";
let mainFontSizeArray = ["0.6em", "0.7em", "0.8em", "0.9em", "1em", "1.1em", "1.2em", "1.3em", "1.4em"];
let mainFontSizeIndex = 4; //Goes from 0 to 8. Will be used to pick font size from array.

//Core variables
let player:Player;// = new Player();
let playerMenu = null;
let gameStarted = false; //Determine if game has already started
let shiftKeyDown = false;

//Time
let time = {
	days:0,
	hours:0,
	minutes:0
};

//Exploration
let exploration = {
	explored:0,
	exploredForest:0,
	exploredLake:0,
	exploredDesert:0,
	exploredMountain:0,
};

//NPC variables
//var flags = [0] * 3000; //For legacy purposes only.
let gameFlags:{
	[index:string]:number
} = {

};

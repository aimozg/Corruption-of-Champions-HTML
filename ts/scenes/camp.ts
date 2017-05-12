addToGameFlags(HAS_KEY_ITEM, CAMP_WALL_PROGRESS);
namespace Camp {
	//MENUS
	export function doCamp() {
		//Set some stuff
		outputText("Got to Camp");
		gameStarted = true;
		showStats();
		showMenus();
		hideUpDown();
		displaySprite();
		setMenuButton("buttonMain", "Main Menu", mainMenu);
		if (player.XP >= player.level * 100 && player.level < levelCap) {
			showMenuButton("buttonLevel");
		}
		else {
			hideMenuButton("buttonLevel");
		}
		playerMenu = doCamp;
		//Display texts
		clearOutput();
		// Display Special events
		CampEvents.checkEvents();
		// Display Pregnancy related events
		pregnancyProgression.updatePregnancy(); // Displays special messages before the main camp message prints.
		/*if (isabellaFollower()) {
		 outputText("Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.  ");
		 }
		 else {*/
		if (time.days < 10) outputText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.  ");
		if (time.days >= 10 && time.days < 20) outputText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.  ");
		if (time.days >= 20) {
			//if (!isabellaFollower()) outputText("Your new home is as comfy as a camp site can be.  ");
			outputText("The fire-pit ");
			//if (flags[kFLAGS.CAMP_BUILT_CABIN] > 0 && flags[kFLAGS.CAMP_CABIN_FURNITURE_BED] > 0) outputText("is ");
			/*else */
			outputText("and tent are both ");
			outputText("set up perfectly, and in good repair.  ");
		}
		//}
		if (time.days >= 20) outputText("You've even managed to carve some artwork into the rocks around the camp's perimeter.<br><br>");
		else outputText("<br><br>");
		outputText("You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon. ");
		outputText("The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.<br><br>");
		if (time.hours < 6 || time.hours > 20)
			outputText("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.<br><br>");
		else {
			if (time.hours == 19) outputText("The sun is close to the horizon, getting ready to set. ");
			if (time.hours == 20) outputText("The sun has already set below the horizon. The sky glows orange. ");
			outputText("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.<br><br>");
		}

		//DEBUGGING CODE FOR AMILY MEETINGS
		//player.gender = 3;
		//player.dynStats("cor", 50);
		//Inventory.takeItem(Items.Consumables.IncubiDraftPurified);
		// gameFlags[AMILY_HERM_QUEST] = 2;
		//gameFlags[AMILY_AFFECTION] = 50;
		//player.HP = 100;
		//outputText(player.gender + "<br>");
		//outputText("AmilyMet = " + gameFlags[AMILY_MET] + "<br>");
		//if (!player.isPregnant()) { player.knockUpForce(PREGNANCY_AMILY, 100); }
		//outputText("Player pregnancy counter is " + player.pregnancyIncubation + "<br>");
		//outputText("Player knockedup by " + player.pregnancyType + "<br>");

		//if (!amily.isPregnant()) amily.knockUpForce(PREGNANCY_PLAYER, INCUBATION_MOUSE);
		//outputText("Amily pregnancy counter is " + amily.pregnancyIncubation + "<br>");
		//outputText("Player knockedup by " + amily.pregnancyType + "<br>");
		//outputText("Player pregnancy event counter is " + amily.pregnancyEventNum + "<br><br>");


		//Display available options
		menu();

		addButton(0, "Explore", Areas.GenericExploration.exploreMenu, null, null, null, "Explore to find new regions and visit any discovered regions.");
		addButton(1, "Places", Places.placesMenu, null, null, null, "Visit any places you have discovered so far.");
		//addButton(5, "Camp Actions", campActionsMenu, null, null, null, "Interact with the camp surroundings.");
		if (followersCount() > 0) addButton(2, "Followers", campFollowersMenu, null, null, null, "Check up on any followers or companions who are joining you in or around your camp. You'll probably just end up sleeping with them.");
		if (loversCount() > 0) addButton(3, "Lovers", campLoversMenu, null, null, null, "Check up on any lovers you have invited so far and interact with them.");
		if (slavesCount() > 0) addButton(4, "Slaves", campSlavesMenu, null, null, null, "Check up on any slaves you have received and interact with them.");
		addButton(6, "Debug", Debug.doDebug, null, null, null, "Debug Menu.");
		addButton(8, "Masturbate", doMasturbate);
		addButton(9, "Sleep", doSleep);
		if (Inventory.showStash() == true) {
			addButton(12, "Stash", Inventory.stashMenu, null, null, null, "The stash allows you to store your items safely until you need them later.");
		}
		addButton(13, "Inventory", Inventory.inventoryMenu, null, null, null, "The inventory allows you to use an item. Be careful as this leaves you open to a counterattack when in combat.");
		//addButton(14, "Codex", Codex.readCodex);
	}


	/* Placeholder
	 placesMenu = function() {
	 clearOutput();
	 doNext(Places.placesMenu);
	 doNext(doCamp);
	 }
	 */

	function campFollowersMenu() {
		clearOutput();
		displaySprite();
		menu();
		if (gameFlags[JOJO_CAMP] == 1) addButton(0, "Jojo", JojoScene.jojoCamp, null, null, null, "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.");
		if (gameFlags[RATHAZUL_CAMP] > 0) addButton(1, "Rathazul", RathazulScene.campRathazul, null, null, null, "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.");
		addButton(14, "Back", doCamp);
	}
	function campLoversMenu() {
		clearOutput();
		menu();
		addButton(14, "Back", doCamp);
	}
	function campSlavesMenu() {
		clearOutput();
		displaySprite();
		menu();
		if (gameFlags[JOJO_CAMP] == 2) addButton(0, "Jojo", JojoScene.jojoCampCorrupt, null, null, null, "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions? He's ever so willing after your last encounter with him.");
		addButton(14, "Back", doCamp);
	}
	//ACTIONS
	function doMasturbate() {
		clearOutput();
		outputText("(Placeholder) You masturbate furiously, cumming buckets.");
		player.orgasm();
		Time.advanceMinutes(30 - Math.floor(player.sens / 4));
		doNext(doCamp);
	}
	function doSleep() {
		//For now
		clearOutput();
		outputText("You lie down and sleep for eight hours.");
		player.changeHP(15 * 8, true);
		player.changeLust(player.lib * 0.04 * 8, false);
		doNext(doCamp);
		Time.advanceHours(8);
	}
	//UTILS
	export function returnToCampUseOneHour() {
		Time.advanceHours(1);
		doCamp();
	}
	export function returnToCampUseTwoHours() {
		Time.advanceHours(2);
		doCamp();
	}
	export function returnToCampUseFourHours() {
		Time.advanceHours(4);
		doCamp();
	}
	export function returnToCampUseEightHours() {
		Time.advanceHours(8);
		doCamp();
	}
	export function returnToCampUseCustomMinutes(minutes:number) {
		Time.advanceMinutes(minutes);
		doCamp();
	}
	export function bedDesc() {
		return "bedroll";
	}
	export function homeDesc() {
		return "tent";
	}
	export function followersCount() {
		let count = 0;
		if (gameFlags[JOJO_CAMP] > 0 && gameFlags[JOJO_CORRUPTION_STAGE] < 5) count++;
		if (gameFlags[RATHAZUL_CAMP] > 0) count++;
		return count;
	}
	export function loversCount() {
		return 0;
	}
	export function slavesCount() {
		let count = 0;
		if (gameFlags[JOJO_CAMP] > 0 && gameFlags[JOJO_CORRUPTION_STAGE] >= 5) count++;
		return count;
	}
}
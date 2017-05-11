// DEBUGGING MENU

namespace Debug {

    export function doDebug() {
        clearOutput();
        outputText("CoC HTML Debug Menu.<br><br>");
        outputText("Be warned that using this can cause very strange behavior. Saving while using this menu can cause a corrupted save. Back up your saves and use at your own risk.<br><br>");
        outputText("<b>Player Variables</b><br>");
        outputText("Player Gender: " + player.gender + "<br>");
        outputText("Player Pregnant by: " + player.pregnancyType + "<br>");
        outputText("Player Anal Pregnant by: " + player.buttPregnancyType + "<br>");
        outputText("Player Anal Pregnancy Duration: " + player.buttPregnancyIncubation + "<br>");
        outputText("Have an armor rack? " + gameFlags[HAS_ARMOR_RACK] + "<br>");
        outputText("Have a weapon rack? " + gameFlags[HAS_WEAPON_RACK] + "<br>");
        outputText("Have a shield rack? " + gameFlags[HAS_EQUIPMENT_RACK] + "<br>");
        outputText("Tamani Pregnancy Type Flag is: " + tamanipreg.pregnancyType + "<br>");
        outputText("Tamani Pregnancy Incubation Flag is: " + tamanipreg.pregnancyIncubation + "<br>");
        outputText("Tamani Pregnancy Event Number is: " + tamanipreg.pregnancyEventNum);
        menu();
        addButton(0, "Gender", genderChange, null, null, null, "Change the Player's Gender.");
        addButton(1, "Fight", fightCreature, null, null, null, "Fight a creature.");
        addButton(2, "StatChange", statChange, null, null, null, "Change a Stat for testing.");
        addButton(3, "PregTest", pregTest, null, null, null, "Start a Pregnancy in the Player.");
        addButton(4, "RackTest", rackTest, null, null, null, "Put items in your inventory for rack checking.");
        addButton(14, "Leave", Camp.doCamp, null, null, null, "Return to Camp.");
    }
    //----------
    // CHANGE THE GENDER OF THE PLAYER
    //----------

    function genderChange() {
        clearOutput();
        outputText("Change the player's gender to...");
        addButton(0, "Male", genderChangeMale, null, null, null, "Change to Male.");
        addButton(1, "Female", genderChangeFemale, null, null, null, "Change to Female.");
        addButton(2, "Herm", genderChangeHerm, null, null, null, "Change to Herm.");
        addButton(3, "Genderless", genderChangeNone, null, null, null, "Change to Genderless.");
        addButton(14, "Back", doDebug, null, null, null, "Go Back to Debug Menu.")
    }
    function genderChangeMale() {
        clearOutput();
        outputText("Player gender changed to MALE.");
        player.gender = 1;
        doNext(doDebug);
    }
    function genderChangeFemale() {
        clearOutput();
        outputText("Player gender changed to FEMALE.");
        player.gender = 2;
        doNext(doDebug);
    }
    function genderChangeHerm() {
        clearOutput();
        outputText("Player gender changed to HERM.");
        player.gender = 3;
        doNext(doDebug);
    }
    function genderChangeNone() {
        clearOutput();
        outputText("Player gender changed to GENDERLESS.");
        player.gender = 0;
        doNext(doDebug);
    }
    //----------
    // Fight a creature
    //----------

    function fightCreature() {
        clearOutput();
        startCombat(new TentacleBeast());
    }

    //-------
    // Change a Stat
    //-------

    function statChange() {
        clearOutput();
        outputText("Which Stat do you want to change?");
        addButton(0, "HP BOOST", changeHP);
        addButton(1, "Main Stats", changeStats);
        addButton(14, "Back", doDebug);
    }

    function changeHP() {
        outputText("Changing HP");
        player.HP = 999;
    }

    function changeStats() {
        clearOutput();
        outputText("Becoming a Beast!");
        player.dynStats(["str", 99], ["tou", 99], ["spe", 99]);

    }
    //----------
    // PregTest
    //----------
    function pregTest() {
        clearOutput();
        outputText("Knocking up Tamani<br>");
        tamanipreg.knockUpForce(PregnancyType.PLAYER, 216, INCUBATION_TAMANI_EVENT);
        tamanipreg.eventFill(INCUBATION_TAMANI_EVENT);
        outputText("Pregnancy Type Flag is: " + tamanipreg.pregnancyType + "<br>");
        outputText("Pregnancy Incubation Flag is: " + tamanipreg.pregnancyIncubation + "<br>");
        doNext(doDebug);
    }
    //---------
    // RackTest
    //---------
    function rackTest() {
        clearOutput();
        outputText("Putting Weapon and Armor into Inventory for testing racks<br><br>");
        Inventory.takeItem(Items.Weapons.Pipe);
        Inventory.takeItem(Items.Armor.BeeArmor);
    }
}
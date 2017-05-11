//------------
// CREATION
//------------
namespace CharCreation {
    export function initializeNewGame() {
        //Initialize player
        player        = new Player();
        player.HP     = player.maxHP();
        player.weapon = Items.NOTHING;
        player.armor  = Items.Armor.ComfortableClothes;
        //Clear Flags
        //flags = [0] * 3000;
        //Route to character naming
        chooseName();
    }
    function chooseName() {
        clearOutput();
        outputText("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.<br><br>What is your name?<br>");
        outputText("<input type=\"text\" name=\"inputname\" id=\"inputname\">");
        doNext(chooseGender);
    }
    function chooseGender() {
        let iname = document.getElementById("inputname")!! as HTMLInputElement;
        if (iname.value.length < 1) {
            clearOutput();
            outputText("You must input a name. Off you go!");
            doNext(chooseName);
            return;
        }
        player.name = iname.value; //Apply name
        clearOutput();
        outputText("You are " + player.name + ". Are you a man or a woman?");
        menu();
        addButton(0, "Man", setGender, Gender.MALE);
        addButton(1, "Woman", setGender, Gender.FEMALE);
        addButton(2, "Hermaphrodite", setGender, Gender.HERM);
    }
    function setGender(gender:Gender) {
        switch (gender) {
            case Gender.NONE:
                break;
            case Gender.MALE: //Male
                //Attribute changes
                player.str += 3;
                player.tou += 2;
                //Body changes
                player.fertility  = 5;
                player.hairLength = 1;
                player.tallness   = 71;
                player.tone       = 60;
                //Genitalia
                player.balls      = 2;
                player.ballSize   = 1;
                player.clitLength = 0;
                player.createCock(5.5, 1, CockTypesEnum.HUMAN);
                player.cocks[0].knotMultiplier = 1;
                //Breasts
                player.createBreastRow();
                break;
            case Gender.FEMALE: //Female
                //Attribute changes
                player.spe += 3;
                player.inte += 2;
                //Body changes
                player.fertility  = 10;
                player.hairLength = 10;
                player.tallness   = 67;
                player.tone       = 30;
                //Genitalia
                player.balls      = 0;
                player.ballSize   = 0;
                player.createVagina(true, 0, 0);
                player.clitLength = 0.5;
                //Breasts
                player.createBreastRow();
                break;
            case Gender.HERM: //Hermaphrodite
                //Attribute changes
                player.str += 1;
                player.tou += 1;
                player.spe += 1;
                player.inte += 1;
                //Body changes
                player.fertility  = 10;
                player.hairLength = 10;
                player.tallness   = 69;
                player.tone       = 45;
                //Genutalia
                player.createVagina();
                player.clitLength = .5;
                player.createCock(5.5, 1, CockTypesEnum.HUMAN);
                player.cocks[0].knotMultiplier = 1;
                //Breasts
                player.createBreastRow();
                break;
            default:
        }
        chooseBuild();
    }
    type BuildPreset = "MaleLean"|"MaleAverage"|"MaleThick"|"MaleGirly"|"FemaleSlender"|"FemaleAverage"|"FemaleCurvy"|"FemaleTomboyish"|"MaleLean"|"MaleAverage"|"MaleThick"|"FemaleSlender"|"FemaleAverage"|"FemaleCurvy";
    function chooseBuild() {
        clearOutput();
        menu();
        switch (player.gender) {
            case Gender.NONE:
                outputText("This isn't supposed to happen. Off you go!");
                doNext(chooseGender);
                break;
            case Gender.MALE:
                outputText("You are a man. Your upbringing has provided you an advantage in strength and toughness.");
                addButton(0, "Lean", setBuild, "MaleLean");
                addButton(1, "Average", setBuild, "MaleAverage");
                addButton(2, "Thick", setBuild, "MaleThick");
                addButton(3, "Girly", setBuild, "MaleGirly");
                break;
            case Gender.FEMALE:
                outputText("You are a woman. Your upbringing has provided you an advantage in speed and intellect.");
                addButton(0, "Slender", setBuild, "FemaleSlender");
                addButton(1, "Average", setBuild, "FemaleAverage");
                addButton(2, "Curvy", setBuild, "FemaleCurvy");
                addButton(3, "Tomboyish", setBuild, "FemaleTomboyish");
                break;
            case Gender.HERM:
                outputText("You are a hermaphrodite. Your upbringing has provided you with the best of both worlds.");
                addButton(0, "Mas. Lean", setBuild, "MaleLean");
                addButton(1, "Mas. Average", setBuild, "MaleAverage");
                addButton(2, "Mas. Thick", setBuild, "MaleThick");
                addButton(5, "Fem. Slender", setBuild, "FemaleSlender");
                addButton(6, "Fem. Average", setBuild, "FemaleAverage");
                addButton(7, "Fem. Curvy", setBuild, "FemaleCurvy");
                break;
            default:
            //This line shouldn't be reached.
        }
        outputText("<br><br>What type of build do you have?");
    }
    function setBuild(build:BuildPreset) {
        switch (build) {
            //Male builds (Hermaphrodites choosing these builds will be a maleherm)
            case "MaleLean":
                player.str -= 1;
                player.spe += 1;

                player.femininity = 34;
                player.thickness  = 30;
                player.tone += 5;

                player.breastRows[0].breastRating = BREAST_CUP_FLAT;
                player.buttRating                 = BUTT_RATING_TIGHT;
                player.hipRating                  = HIP_RATING_SLENDER;
                break;
            case "MaleAverage":
                player.femininity = 30;
                player.thickness  = 50;

                player.breastRows[0].breastRating = BREAST_CUP_FLAT;
                player.buttRating                 = BUTT_RATING_AVERAGE;
                player.hipRating                  = HIP_RATING_AVERAGE;
                break;
            case "MaleThick":
                player.spe -= 4;
                player.str += 2;
                player.tou += 2;

                player.femininity = 29;
                player.thickness  = 70;
                player.tone -= 5;

                player.breastRows[0].breastRating = BREAST_CUP_FLAT;
                player.buttRating                 = BUTT_RATING_NOTICEABLE;
                player.hipRating                  = HIP_RATING_AVERAGE;
                break;
            case "MaleGirly":
                player.str -= 2;
                player.spe += 2;

                player.femininity = 50;
                player.thickness  = 50;
                player.tone       = 26;

                player.breastRows[0].breastRating = BREAST_CUP_A;
                player.buttRating                 = BUTT_RATING_NOTICEABLE;
                player.hipRating                  = HIP_RATING_SLENDER;
                break;
            //Female builds (Hermaphrodites choosing these builds will be a futanari)
            case "FemaleSlender":
                player.str -= 1;
                player.spe += 1;

                player.femininity = 66;
                player.thickness  = 30;
                player.tone += 5;

                player.breastRows[0].breastRating = BREAST_CUP_B;
                player.buttRating                 = BUTT_RATING_TIGHT;
                player.hipRating                  = HIP_RATING_AMPLE;
                break;
            case "FemaleAverage":
                player.femininity = 70;
                player.thickness  = 50;

                player.breastRows[0].breastRating = BREAST_CUP_C;
                player.buttRating                 = BUTT_RATING_NOTICEABLE;
                player.hipRating                  = HIP_RATING_AMPLE;
                break;
            case "FemaleCurvy":
                player.spe -= 2;
                player.str += 1;
                player.tou += 1;

                player.femininity = 71;
                player.thickness  = 70;

                player.breastRows[0].breastRating = BREAST_CUP_D;
                player.buttRating                 = BUTT_RATING_LARGE;
                player.hipRating                  = HIP_RATING_CURVY;
                break;
            case "FemaleTomboyish":
                player.str += 1;
                player.spe -= 1;

                player.femininity = 56;
                player.thickness  = 50;
                player.tone       = 50;

                player.breastRows[0].breastRating = BREAST_CUP_A;
                player.buttRating                 = BUTT_RATING_TIGHT;
                player.hipRating                  = HIP_RATING_SLENDER;
                break;
            default:
        }
        customizeCharacterMenu();
    }
    //Customization menu
    function customizeCharacterMenu() {
        clearOutput();
        outputText("You can customize your character here. You will be able to alter your appearance through the usage of certain items.<br><br>");
        outputText("Height: " + Math.floor(player.tallness / 12) + "'" + player.tallness % 12 + "\"<br>");
        outputText("Skin tone: " + player.skinTone + "<br>");
        outputText("Hair color: " + player.hairColor + "<br>");
        if (player.hasCock()) outputText("Cock size: " + player.cocks[0].cockLength + "\" long, " + player.cocks[0].cockThickness + "\" thick<br>");
        outputText("Breast size: " + player.breastCup(0) + "<br>");
        menu();
        addButton(0, "Complexion", menuSkinComplexion);
        addButton(1, "Hair Color", menuHairColor);
        /*if (player.mf("m", "f") == "m") {
         if (player.hasBeard()) {
         outputText("Beard: " + player.beardDescript() + "<br>");
         }
         addButton(2, "Beard Style", menuBeardSettings);
         }*/
        //addButton(3, "Set Height", setHeight);
        //if (player.hasCock()) addButton(5, "Cock Size", menuCockLength);
        //addButton(6, "Breast Size", menuBreastSize);
        addButton(9, "Done", Intro.arrivalPartOne, true);
    }
//Skin Colours
    function menuSkinComplexion() {
        clearOutput();
        outputText("What is your complexion?");
        menu();
        addButton(0, "Light", confirmComplexion, "light");
        addButton(1, "Fair", confirmComplexion, "fair");
        addButton(2, "Olive", confirmComplexion, "olive");
        addButton(3, "Dark", confirmComplexion, "dark");
        addButton(4, "Ebony", confirmComplexion, "ebony");
        addButton(5, "Mahogany", confirmComplexion, "mahogany");
        addButton(6, "Russet", confirmComplexion, "russet");
        addButton(14, "Back", customizeCharacterMenu);
    }
    function confirmComplexion(complexion:string) {
        player.skinTone = complexion;
        customizeCharacterMenu();
    }
//Hair Colours
    export function menuHairColor() {
        clearOutput();
        outputText("What is your hair color?");
        menu();
        addButton(0, "Blonde", confirmHairColor, "blonde");
        addButton(1, "Brown", confirmHairColor, "brown");
        addButton(2, "Black", confirmHairColor, "black");
        addButton(3, "Red", confirmHairColor, "red");
        addButton(4, "Gray", confirmHairColor, "gray");
        addButton(5, "White", confirmHairColor, "white");
        addButton(6, "Auburn", confirmHairColor, "auburn");
        addButton(14, "Back", customizeCharacterMenu);
    }
    export function confirmHairColor(color:string) {
        player.hairColor = color;
        customizeCharacterMenu();
    }
}
//------------
// PROLOGUE
//------------
namespace Intro {
    export function arrivalPartOne() {
        clearOutput();
        outputText("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.<br><br>");
        outputText("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.<br><br>");
        outputText("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.<br><br>");
        outputText("The cave is unusually warm and damp, ");
        if (player.gender == Gender.FEMALE)
            outputText("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
        else outputText("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
        outputText("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
        showStats();
        player.changeLust(15, false);
        doNext(arrivalPartTwo);
    }
    function arrivalPartTwo() {
        clearOutput();
        hideUpDown();
        time.hours = 18;
        outputText("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
        if (player.gender == Gender.FEMALE)
            outputText("the urge to chase down his rod and impale yourself on it.<br><br>");
        else
            outputText("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.<br><br>");
        outputText("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
        player.dynStats("cor", 2);
        player.changeLust(40, false);
        doNext(arrivalPartThree);
    }
    function arrivalPartThree() {
        clearOutput();
        hideUpDown();
        player.changeLust(-30, false);
        outputText("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.<br><br>In desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.<br><br>");
        outputText("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"<br><br>");
        outputText("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
        doNext(arrivalPartFour);
    }
    function arrivalPartFour() {
        clearOutput();
        outputText("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.<br><br>It does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
        doNext(Camp.doCamp);
    }
}
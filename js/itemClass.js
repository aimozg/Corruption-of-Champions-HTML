//Hold item IDs for purpose of looking up or for save data.
var ItemLib = {};
var ITEM_TYPE_WEAPON = "Weapon";
var ITEM_TYPE_ARMOUR = "Armour";
var ITEM_TYPE_UNDERGARMENT = "Undergarment";
var ITEM_TYPE_CONSUMABLE = "Consumable";
var ITEM_TYPE_MATERIAL = "Material";
var ITEM_TYPE_SHIELD = "Shield";
var Item = (function () {
    function Item(itemId, itemShortName, itemLongName, itemType) {
        this.consumeEffect = null;
        //Equipment values that can be set
        this.equipmentName = "";
        this.attack = 0;
        this.defense = 0;
        this.sexiness = 0;
        this.verb = "";
        //Required values, will be declared by parameters
        this.id = itemId;
        this.shortName = itemShortName;
        this.longName = itemLongName;
        this.type = itemType;
        //Optional
        this.description = ""; //This will appear on tooltip.
        this.value = 6; //The value in gems. Defaults at 6.
        //Add to library for lookup.
        ItemLib[this.id] = this;
    }
    Item.prototype.getTooltipDescription = function () {
        var text = this.description;
        text += "<br><br><b>Type:</b> " + this.type;
        text += "<br><b>Base value:</b> " + this.value;
        if (this.type == ITEM_TYPE_WEAPON) {
            text += "<br><b>Attack:</b> " + this.attack;
        }
        if (this.type == ITEM_TYPE_ARMOUR || this.type == ITEM_TYPE_UNDERGARMENT) {
            if (this.defense > 0)
                text += "<br><b>Defense:</b> " + this.defense;
            if (this.sexiness > 0)
                text += "<br><b>Sexiness:</b> " + this.sexiness;
        }
        return text;
    };
    Item.prototype.canUse = function () {
        return this.type != ITEM_TYPE_MATERIAL;
    };
    Item.prototype.useItem = function () {
        if (this.type == ITEM_TYPE_CONSUMABLE) {
            if (this.consumeEffect != null) {
                this.consumeEffect();
            }
            return false;
        }
        if (this.type == ITEM_TYPE_WEAPON || this.type == ITEM_TYPE_ARMOUR) {
            this.equipItem();
            return false;
        }
        return true;
    };
    Item.prototype.useText = function () {
        return "";
    };
    ;
    Item.prototype.equipItem = function () {
        clearOutput();
        outputText("You equip your " + this.equipmentName + ".");
        var oldItem = null;
        //Determine if it's weapon or armour.
        if (this.type == ITEM_TYPE_WEAPON) {
            if (player.weapon.id != Items.NOTHING.id)
                oldItem = lookupItem(player.weapon.id);
            player.weapon = this;
        }
        if (this.type == ITEM_TYPE_ARMOUR) {
            if (player.armor.id != Items.NOTHING.id)
                oldItem = lookupItem(player.armor.id);
            player.armor = this;
        }
        //Check if you aren't previously using fists or naked.
        if (oldItem != null) {
            outputText(" You still have your old " + oldItem.equipmentName + " left over. ");
            Inventory.takeItem(oldItem, Inventory.inventoryMenu);
        }
        else
            doNext(Inventory.inventoryMenu);
    };
    Item.prototype.unequipItem = function () {
    };
    return Item;
}());
var Items = {
    NOTHING: new Item("Nothing", "NOTHING!", "nothing", ITEM_TYPE_MATERIAL)
};
Items.NOTHING.description = "You know, you are not supposed to see this tooltip. Please let Kitteh6660 know so he can fix it.";
Items.NOTHING.equipmentName = "nothing";
Items.NOTHING.verb = "punch";
Items.NOTHING.value = -1;
Items.NOTHING.defense = 0;
Items.NOTHING.attack = 0;
//# sourceMappingURL=itemClass.js.map
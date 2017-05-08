//Hold item IDs for purpose of looking up or for save data.
const ItemLib: { [index: string]: Item } = {};

const ITEM_TYPE_WEAPON       = "Weapon";
const ITEM_TYPE_ARMOUR       = "Armour";
const ITEM_TYPE_UNDERGARMENT = "Undergarment";
const ITEM_TYPE_CONSUMABLE   = "Consumable";
const ITEM_TYPE_MATERIAL     = "Material";
const ITEM_TYPE_SHIELD       = "Shield";

class Item {
	public id: string;
	public shortName: string;
	public longName: string;
	public type: string;

	public description: string;
	public value: number;

	public consumeEffect: Function | null = null;
	//Equipment values that can be set
	public equipmentName: string          = "";
	public attack: number                 = 0;
	public defense: number                = 0;
	public sexiness: number               = 0;
	public verb: string                   = "";

	constructor(itemId:string, itemShortName:string, itemLongName:string, itemType:string) {
		//Required values, will be declared by parameters
		this.id        = itemId;
		this.shortName = itemShortName;
		this.longName  = itemLongName;
		this.type      = itemType;

		//Optional
		this.description = ""; //This will appear on tooltip.
		this.value       = 6; //The value in gems. Defaults at 6.

		//Add to library for lookup.
		ItemLib[this.id] = this;
	}

	public getTooltipDescription():string {
		let text = this.description;
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
	}
	public canUse():boolean {
		return this.type != ITEM_TYPE_MATERIAL;
	}

	public useItem():boolean {
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
	}

	public useText():string {
		return "";
	};

	public equipItem() {
		clearOutput();
		outputText("You equip your " + this.equipmentName + ".");
		let oldItem = null;
		//Determine if it's weapon or armour.
		if (this.type == ITEM_TYPE_WEAPON) {
			if (player.weapon.id != Items.NOTHING.id) oldItem = lookupItem(player.weapon.id);
			player.weapon = this;
		}
		if (this.type == ITEM_TYPE_ARMOUR) {
			if (player.armor.id != Items.NOTHING.id) oldItem = lookupItem(player.armor.id);
			player.armor = this;
		}
		//Check if you aren't previously using fists or naked.
		if (oldItem != null) {
			outputText(" You still have your old " + oldItem.equipmentName + " left over. ");
			Inventory.takeItem(oldItem, Inventory.inventoryMenu);
		}
		else
			doNext(Inventory.inventoryMenu);
	}

	public unequipItem(){

	}
}

const Items = {
	NOTHING: new Item("Nothing", "NOTHING!", "nothing", ITEM_TYPE_MATERIAL)
};

Items.NOTHING.description   = "You know, you are not supposed to see this tooltip. Please let Kitteh6660 know so he can fix it.";
Items.NOTHING.equipmentName = "nothing";
Items.NOTHING.verb          = "punch";
Items.NOTHING.value         = -1;
Items.NOTHING.defense       = 0;
Items.NOTHING.attack        = 0;

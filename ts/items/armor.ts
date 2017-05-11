namespace Items {
	export namespace Armor {
		export const ComfortableClothes = new Item("C.Cloth", "C.Cloth", "a set of comfortable clothes", ITEM_TYPE_ARMOUR);
		ComfortableClothes.description = "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.";
		ComfortableClothes.equipmentName = "comfortable clothes";
		ComfortableClothes.value = 6;
		ComfortableClothes.defense = 0;

		export const GelArmor = new Item("GelArmr", "Gel Armor", "a suit of gel armour", ITEM_TYPE_ARMOUR);
		GelArmor.description = "This suit of interlocking plates is made from a strange green material. It feels spongy to the touch but is amazingly resiliant.";
		GelArmor.equipmentName = "glistening gel-armor plates";
		GelArmor.value = 150;
		GelArmor.defense = 10;

		export const BeeArmor = new Item("BeeArmr", "Bee Armor", "a set of chitinous armour", ITEM_TYPE_ARMOUR);
		BeeArmor.description = "A suit of armour cleverly fashioned from giant bee chitin. It comes with a silken loincloth to protect your modesty.";
		BeeArmor.equipmentName = "sexy black chitin armour-plating";
		BeeArmor.value = 200;
		BeeArmor.defense = 18;
		BeeArmor.sexiness = 3;

		export const LustyMaidenArmor = new Item("L.Mad.Arm.", "Lusty Maiden's Armor", "to be added", ITEM_TYPE_ARMOUR);
		LustyMaidenArmor.description = "To Be Added.";
//LustyMaidenArmor.equipmentName
//LustyMaidenArmor.value
//LustyMaidenArmor.defense
//LustyMaidenArmor.sexiness
	}
}


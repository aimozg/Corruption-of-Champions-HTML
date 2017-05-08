class ItemSlot {
	public quantity    = 0;
	public itype: Item = Items.NOTHING;
	setItemAndQty(itype:Item, quant:int) {
		if (itype == null) itype = Items.NOTHING;
		if (quant == 0 && itype == Items.NOTHING) {
			this.emptySlot();
			return;
		}
		if (quant < 0 || quant == 0 && itype != Items.NOTHING || quant > 0 && itype == Items.NOTHING){
			quant = 0;
			itype = Items.NOTHING;
		}
		this.quantity = quant;
		this.itype = itype;
	}
	removeOneItem () {
		if (this.quantity > 0) {
			this.quantity--;
			if (this.quantity <= 0)
				this.itype = Items.NOTHING;
		}
	}
	emptySlot() {
		this.quantity = 0;
		this.itype = Items.NOTHING;
	}
}


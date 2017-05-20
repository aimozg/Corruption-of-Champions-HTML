class ItemSlot {
	public quantity    = 0;
	public itype: Item = Items.NOTHING;
	setItemAndQty(itype:Item|null|undefined, quant:number) {
		if (!itype) itype = Items.NOTHING;
		if (quant <= 0 || itype == Items.NOTHING) {
			this.emptySlot();
			return;
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


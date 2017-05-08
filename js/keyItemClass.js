var KeyItemType = (function () {
    function KeyItemType(id) {
        this.id = id;
    }
    return KeyItemType;
}());
var KeyItem = (function () {
    function KeyItem(ktype, value1, value2, value3, value4) {
        if (value1 === void 0) { value1 = 0; }
        if (value2 === void 0) { value2 = 0; }
        if (value3 === void 0) { value3 = 0; }
        if (value4 === void 0) { value4 = 0; }
        this.ktype = ktype;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
    return KeyItem;
}());
//# sourceMappingURL=keyItemClass.js.map
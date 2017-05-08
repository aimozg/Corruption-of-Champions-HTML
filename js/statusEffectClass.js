var StatusEffectType = (function () {
    function StatusEffectType(id) {
        this.id = id;
        StatusEffectIDs[this.id] = this;
    }
    return StatusEffectType;
}());
var StatusEffect = (function () {
    function StatusEffect(stype, value1, value2, value3, value4) {
        if (value1 === void 0) { value1 = 0; }
        if (value2 === void 0) { value2 = 0; }
        if (value3 === void 0) { value3 = 0; }
        if (value4 === void 0) { value4 = 0; }
        this.stype = stype;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
    return StatusEffect;
}());
//# sourceMappingURL=statusEffectClass.js.map
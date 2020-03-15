import Observable from "./observable.js";

class WalletModel extends Observable {
    constructor() {
        super();
        this.cash = new Map();
        this.cash.set(10, 0);
        this.cash.set(50, 1);
        this.cash.set(100, 5);
        this.cash.set(500, 5);
        this.cash.set(1000, 2);
        this.cash.set(5000, 2);
        this.cash.set(10000, 1);
        this.cashTotal = 0;
        this.init();
    }

    init() {
        this.calculateTotalCash();
    }

    calculateTotalCash() {
        this.cashTotal = 0;
        this.cash.forEach((cashCount, cashUnit) => {
            this.cashTotal += cashCount * cashUnit;
        });
    }

    cashCountDecrease({ target }) {
        if (target.tagName !== "BUTTON") return;
        let curCount = this.cash.get(parseInt(target.value));
        if (curCount <= 0) return;
        this.cash.set(parseInt(target.value), --curCount);
        this.cashTotal -= target.value;
        this.notify("changeCashInfo", this.cash.get(parseInt(target.value)), target.nextElementSibling, this.cashTotal);
    }
}

export default WalletModel;
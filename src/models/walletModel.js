import Observable from "../util/observable.js";

class WalletModel extends Observable {
    constructor() {
        super();
        this.walletData = null
        this.cash = new Map();
        this.cashTotal = 0;
        this.init();
    }

    init() {
        this.getData("http://localhost:8080/vm/wallet");
    }

    async getData(url) {
        const response = await fetch(url);
        this.walletData = await response.json();
        this.setCashInfo(this.walletData);
        this.notify("init", this.walletData);
    }

    setCashInfo(data) {
        data.forEach(cashInfo => {
            this.cashTotal += (cashInfo.cashUnit * cashInfo.cashCount);
            this.cash.set(parseInt(cashInfo.cashUnit), cashInfo.cashCount);
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
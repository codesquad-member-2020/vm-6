import Observable from '../util/observable.js';
import URL from '../util/url.js';

class WalletModel extends Observable {
    constructor() {
        super();
        this.walletData = null;
        this.cash = new Map();
        this.cashTotal = 0;
        this.init();
    }

    init() {
        this.getData(URL.DEV.WALLET_DATA);
    }

    async getData(url) {
        const response = await fetch(url);
        this.walletData = await response.json();
        this.setCashInfo(this.walletData);
        this.notify('init', this.walletData);
    }

    setCashInfo(data) {
        data.forEach(cashInfo => {
            this.cashTotal += (cashInfo.cashUnit * cashInfo.cashCount);
            this.cash.set(parseInt(cashInfo.cashUnit), cashInfo.cashCount);
        });
    }

    decreaseCashCount(cashUnit, cashCountEl) {
        let curCount = this.cash.get(cashUnit);
        if (curCount <= 0) return;
        this.cash.set(cashUnit, --curCount);
        this.cashTotal -= cashUnit;
        this.notify('changeCashInfo', this.cash.get(cashUnit), cashCountEl, this.cashTotal);
    }
}

export default WalletModel;
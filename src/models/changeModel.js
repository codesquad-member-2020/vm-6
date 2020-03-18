import Observable from '../util/observable.js';

class ChangeModel extends Observable {
    constructor(walletModel) {
        super();
        this.walletModel = walletModel;
        this.changeCash = 0;
        this.changeDelay = null;
    }

    change(insertedCash) {
        this.changeCash = insertedCash;
        this.walletModel.cashTotal += this.changeCash;

        [...this.walletModel.cash.keys()].reverse().forEach(cashUnit => {
            const cashCount = this.walletModel.cash.get(cashUnit);
            const cashUnitCount = parseInt(this.changeCash / cashUnit);
            this.walletModel.cash.set(cashUnit, cashCount + cashUnitCount);
            this.changeCash %= cashUnit;
            if (!cashUnitCount) return;
            this.walletModel.notify('changeCash', cashUnit);
            this.walletModel.notify('updateCashInfo', cashCount + cashUnitCount, this.walletModel.cashTotal);
        });
    }
}

export default ChangeModel;
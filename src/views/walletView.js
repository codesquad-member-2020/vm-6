import { getElement } from '../util/util.js';
import { walletPanel } from '../util/template.js';

class WalletView {
    constructor(walletModel, vendingMachineModel, changeModel) {
        this.walletModel = walletModel;
        this.vendingMachineModel = vendingMachineModel;
        this.changeModel = changeModel;
        this.walletModel.subscribe('updateCashInfo', this.cashInfoUpdate.bind(this));
        this.walletModel.subscribe('changeCash', this.searchCashCountEl.bind(this));
        this.walletModel.subscribe('init', this.render.bind(this));
        this.cashCountEl = null;
    }

    render(data) {
        const walletWrap = getElement('.wallet-wrap');
        walletWrap.innerHTML = walletPanel(data);

        const walletBtns = getElement('.wallet-btns');
        walletBtns.addEventListener('click', this.walletBtnsHandler.bind(this));
    }

    walletBtnsHandler({ target }) {
        if (target.tagName !== 'BUTTON') return;
        const cashUnit = parseInt(target.value);
        this.cashCountEl = target.nextElementSibling;
        this.vendingMachineModel.sumInsertedCash(cashUnit, parseInt(this.cashCountEl.innerText));
        this.walletModel.decreaseCashCount(cashUnit);

        clearTimeout(this.changeModel.changeDelay);
        this.changeModel.changeDelay = setTimeout(this.vendingMachineModel.test.bind(this.vendingMachineModel), 5000);
    }

    cashInfoUpdate(cashCount, cashTotal) {
        this.total = getElement('.wallet-cash-total');
        this.cashCountEl.innerHTML = cashCount;
        this.total.innerHTML = cashTotal;
    }

    searchCashCountEl(cashUnit) {
        this.cashCountEl = getElement(`button[value="${cashUnit}"]`).nextElementSibling;
    }
}

export default WalletView;
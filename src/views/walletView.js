import { getElement } from '../util/util.js';
import { walletPanel } from '../util/template.js';

class WalletView {
    constructor(walletModel, vendingMachineModel) {
        this.walletModel = walletModel;
        this.vendingMachineModel = vendingMachineModel;
        this.walletModel.subscribe('changeCashInfo', this.cashInfoUpdate.bind(this));
        this.walletModel.subscribe('init', this.render.bind(this));
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
        const cashCountEl = target.nextElementSibling;
        this.vendingMachineModel.sumInsertedCash(cashUnit, parseInt(cashCountEl.innerText));
        this.walletModel.decreaseCashCount(cashUnit, cashCountEl);
    }

    cashInfoUpdate(data, target, cash_total) {
        this.total = getElement('.wallet-cash-total');
        target.innerHTML = data;
        this.total.innerHTML = cash_total;
    }
}

export default WalletView;
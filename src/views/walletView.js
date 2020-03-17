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

    walletBtnsHandler(evt) {
        this.vendingMachineModel.sumInsertedCash(evt);
        this.walletModel.decreaseCashCount(evt);
    }

    cashInfoUpdate(data, target, cash_total) {
        this.total = getElement('.wallet-cash-total');
        target.innerHTML = data;
        this.total.innerHTML = cash_total;
    }
}

export default WalletView;
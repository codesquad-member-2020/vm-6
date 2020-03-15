import { vm$ } from "../util/util.js";
import { walletPanel } from "../util/template.js";

class WalletView {
    constructor(walletModel, vmModel) {
        this.walletModel = walletModel;
        this.vmModel = vmModel;
        this.walletModel.subscribe("changeCashInfo", this.cashInfoUpdate.bind(this));
        this.walletModel.subscribe("init", this.render.bind(this));
    }

    render(data) {
        const walletWrap = vm$(".wallet-wrap");
        walletWrap.innerHTML = walletPanel(data);

        const walletBtns = vm$('.wallet-btns');
        walletBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.sumInsertedCash(evt);
        this.walletModel.cashCountDecrease(evt);
    }

    cashInfoUpdate(data, target, cash_total) {
        this.total = vm$('.wallet-cash-total');
        target.innerHTML = data;
        this.total.innerHTML = cash_total;
    }
}

export default WalletView;
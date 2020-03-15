import { vm$ } from "./util.js";

class WalletView {
    constructor(walletModel, vmModel) {
        this.total = vm$('.wallet-cash-total');
        this.walletModel = walletModel;
        this.vmModel = vmModel;
        this.walletModel.subscribe("changeCashInfo", this.changeCashInfoRender.bind(this));
        this.init();
    }

    init() {
        this.registerEvent();
    }

    registerEvent() {
        const walletBtns = vm$('.wallet-btns');
        walletBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.sumInsertedCash(evt);
        this.walletModel.cashCountDecrease(evt);
    }

    changeCashInfoRender(data, target, cash_total) {
        target.innerHTML = data;
        this.total.innerHTML = cash_total;
    }
}

export default WalletView;
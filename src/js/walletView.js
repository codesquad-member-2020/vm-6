import { vm$ } from "./util.js";

class WalletView {
    constructor(walletModel, vmModel) {
        this.total = vm$('.wallet-cash-total');
        this.walletModel = walletModel;
        this.vmModel = vmModel;
        this.walletModel.subscribe(this.render.bind(this));
        this.init();
    }

    init() {
        this.eventRegister();
    }

    eventRegister() {
        const walletBtns = vm$('.wallet-btns');
        walletBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.sumInsertCash(evt);
        this.vmModel.productHighlight();
        this.walletModel.cashCountDecrease(evt);
    }

    render(data, target, cash_total) {
        target.innerHTML = `${data}`;
        this.total.innerHTML = `${cash_total}`;
    }
}

export default WalletView;
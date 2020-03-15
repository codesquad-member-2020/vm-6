import { vm$ } from "../util/util.js";

class ProductSelectView {
    constructor(vmModel) {
        this.insertedCash = vm$(".inserted-cash");
        this.selectedProductIndex = vm$(".selected-product-index");
        this.productSelectLog = vm$(".product-select-log");
        this.vmModel = vmModel;
        this.vmModel.subscribe("changeCashInfo", this.insertedCashUpdate.bind(this));
        this.vmModel.subscribe("selectProduct", this.selectIndexUpdate.bind(this));
        this.vmModel.subscribe("purchaseProduct", this.selectProductUpdate.bind(this));
        this.init();
    }

    init() {
        this.registerEvent();
    }

    registerEvent() {
        const productSelectBtns = vm$('.product-select-btns');
        productSelectBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.addSelectedProductIndex(evt);
    }

    makeLog(log) {
        const log_li = document.createElement("li");
        log_li.innerHTML = log;
        return log_li;
    }

    insertedCashUpdate({ bLogRender = true, insertedCash, cash }) {
        if (!bLogRender) return;
        this.insertedCash.innerHTML = insertedCash;
        this.productSelectLog.appendChild(this.makeLog(`${cash}원 투입 됐습니다.`));
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }

    selectIndexUpdate(index) {
        this.selectedProductIndex.innerHTML = parseInt(index);
    }

    selectProductUpdate({ bCashNotEnough = false, insertedCash, product }) {
        if (bCashNotEnough) this.productSelectLog.appendChild(this.makeLog(`잔액이 부족 합니다.`));
        else {
            this.insertedCash.innerHTML = insertedCash;
            this.productSelectLog.appendChild(this.makeLog(`< ${product} > 선택 됐습니다.`));
        }
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }
}

export default ProductSelectView;
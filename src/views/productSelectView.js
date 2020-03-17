import { getElement } from "../util/util.js";
import { productSelectPanel } from "../util/template.js";

class ProductSelectView {
    constructor(vmModel) {
        this.render();
        this.insertedCash = getElement(".inserted-cash");
        this.productSelectLog = getElement(".product-select-log");
        this.vmModel = vmModel;
        this.vmModel.subscribe("changeCashInfo", this.insertedCashUpdate.bind(this));
        this.vmModel.subscribe("selectProduct", this.selectIndexUpdate.bind(this));
        this.vmModel.subscribe("purchaseProduct", this.selectProductUpdate.bind(this));
    }

    render() {
        const productSelectWrap = getElement(".product-select-wrap");
        productSelectWrap.innerHTML = productSelectPanel();

        const productSelectBtns = getElement('.product-select-btns');
        productSelectBtns.addEventListener("click", this.productSelectBtnsHandler.bind(this));
    }

    productSelectBtnsHandler(evt) {
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
        this.selectedProductIndex = getElement(".selected-product-index");
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
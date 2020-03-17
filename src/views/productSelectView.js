import { getElement } from '../util/util.js';
import { productSelectPanel } from '../util/template.js';

class ProductSelectView {
    constructor(vendingMachineModel) {
        this.render();
        this.insertedCash = getElement('.inserted-cash');
        this.productSelectLog = getElement('.product-select-log');
        this.vendingMachineModel = vendingMachineModel;
        this.vendingMachineModel.subscribe('changeCashInfo', this.updateInsertedCash.bind(this));
        this.vendingMachineModel.subscribe('selectProduct', this.updateSelectIndex.bind(this));
        this.vendingMachineModel.subscribe('purchaseProduct', this.updateSelectProduct.bind(this));
    }

    render() {
        const productSelectWrap = getElement('.product-select-wrap');
        productSelectWrap.innerHTML = productSelectPanel();

        const productSelectBtns = getElement('.product-select-btns');
        productSelectBtns.addEventListener('click', this.productSelectBtnsHandler.bind(this));
    }

    productSelectBtnsHandler(evt) {
        this.vendingMachineModel.addSelectedProductIndex(evt);
    }

    makeLog(log) {
        const logElement = document.createElement('li');
        logElement.innerHTML = log;
        return logElement;
    }

    updateInsertedCash({ bLogRender = true, insertedCash, cash }) {
        if (!bLogRender) return;
        this.insertedCash.innerHTML = insertedCash;
        this.productSelectLog.appendChild(this.makeLog(`${cash}원 투입 됐습니다.`));
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }

    updateSelectIndex(index) {
        this.selectedProductIndex = getElement('.selected-product-index');
        this.selectedProductIndex.innerHTML = parseInt(index);
    }

    updateSelectProduct({ bCashNotEnough = false, insertedCash, product }) {
        if (bCashNotEnough) this.productSelectLog.appendChild(this.makeLog(`잔액이 부족 합니다.`));
        else {
            this.insertedCash.innerHTML = insertedCash;
            this.productSelectLog.appendChild(this.makeLog(`< ${product} > 덜컹 ~`));
        }
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }
}

export default ProductSelectView;
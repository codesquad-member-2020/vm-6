import { getElement, getElements } from '../util/util.js';
import { productSelectPanel } from '../util/template.js';

class ProductSelectView {
    constructor(vendingMachineModel) {
        this.render();
        this.insertedCash = getElement('.inserted-cash');
        this.productSelectLog = getElement('.product-select-log');
        this.vendingMachineModel = vendingMachineModel;
        this.vendingMachineModel.subscribe('updateCashInfo', this.updateInsertedCash.bind(this));
        this.vendingMachineModel.subscribe('selectProduct', this.updateSelectIndex.bind(this));
        this.vendingMachineModel.subscribe('purchaseProduct', this.updateSelectProduct.bind(this));
        this.vendingMachineModel.subscribe('changeCash', this.updateChangeCash.bind(this));
    }

    render() {
        const productSelectWrap = getElement('.product-select-wrap');
        productSelectWrap.innerHTML = productSelectPanel();

        const productSelectBtns = getElements('.number-btn');
        productSelectBtns.forEach(numberBtn => {
            numberBtn.addEventListener('click', this.productSelectBtnsHandler.bind(this));
        });

        const resetBtn = getElement('.reset-btn');
        resetBtn.addEventListener('click', this.resetBtnHandler.bind(this));

        const choiceBtn = getElement('.choice-btn');
        choiceBtn.addEventListener('click', this.choiceBtnHandler.bind(this));
    }

    productSelectBtnsHandler({ target }) {
        const selectedIndex = target.value;
        this.vendingMachineModel.addSelectedProductIndex(selectedIndex);
    }

    resetBtnHandler() {
        this.vendingMachineModel.selectResetBtn();
    }

    choiceBtnHandler() {
        this.vendingMachineModel.selectChoiceBtn();
    }

    makeLog(log) {
        const logElement = document.createElement('li');
        logElement.innerHTML = log;
        return logElement;
    }

    updateInsertedCash({ bLogUpdate = true, insertedCash, cash }) {
        if (!bLogUpdate) return;
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

            clearTimeout(this.vendingMachineModel.changeModel.changeDelay);
            this.vendingMachineModel.changeModel.changeDelay = setTimeout(this.vendingMachineModel.test.bind(this.vendingMachineModel), 5000);
        }
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }

    updateChangeCash(changeCash, insertedCash = 0) {
        this.insertedCash.innerHTML = insertedCash;
        this.productSelectLog.appendChild(this.makeLog(`${changeCash}원 반환 되었습니다.`));
        this.productSelectLog.scrollTop = this.productSelectLog.scrollHeight;
    }
}

export default ProductSelectView;
import Observable from '../util/observable.js';
import URL from '../util/url.js';

const OPTION = {
    DEFAULT_PRODUCT_INDEX: '0'
}

class VendingMachineModel extends Observable {
    constructor(changeModel) {
        super();
        this.productData = null;
        this.insertedCash = 0;
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        this.changeModel = changeModel;
        this.init();
    }

    init() {
        this.getData(URL.DEV.PRODUCT_DATA);
    }

    async getData(url) {
        const response = await fetch(url);
        this.productData = await response.json();
        this.notify('init', this.productData);
    }

    sumInsertedCash(cashUnit, cashCount) {
        if (cashCount === 0) return;
        this.insertedCash += cashUnit;
        this.notify('updateCashInfo', { insertedCash: this.insertedCash, cash: cashUnit });
    }

    addSelectedProductIndex(selectedIndex) {
        if (this.selectedProductIndex + selectedIndex > this.productData.length) return;
        this.selectedProductIndex += selectedIndex;
        this.notify('selectProduct', this.selectedProductIndex);
    }

    selectResetBtn() {
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        this.notify('selectProduct', this.selectedProductIndex);
    }

    selectChoiceBtn() {
        if (this.selectedProductIndex === OPTION.DEFAULT_PRODUCT_INDEX) return;
        this.notifySelectedProduct();
    }

    selectProduct(selectedProductIndex) {
        this.selectedProductIndex = selectedProductIndex;
        this.notifySelectedProduct();
    }

    findProductInfo() {
        return {
            name: this.productData[parseInt(this.selectedProductIndex) - 1].name,
            price: this.productData[parseInt(this.selectedProductIndex) - 1].price
        }
    }

    notifySelectedProduct() {
        if (parseInt(this.selectedProductIndex) === 0) return;
        const productInfo = this.findProductInfo();
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        this.notify('selectProduct', this.selectedProductIndex);
        this.purchase(productInfo);
    }

    purchase(productInfo) {
        if (productInfo.price > this.insertedCash) {
            this.notify('purchaseProduct', { bCashNotEnough: true });
            return;
        }
        this.insertedCash -= productInfo.price;
        this.notify('purchaseProduct', { insertedCash: this.insertedCash, product: productInfo.name, index: this.selectedProductIndex });
        this.notify('updateCashInfo', { bLogUpdate: false });
    }

    notifyAddChange() {
        if (!this.insertedCash) return;
        this.changeModel.addChange(this.insertedCash);
        this.notify('changeCash', this.insertedCash);
        this.insertedCash = 0;
        this.notify('updateCashInfo', { bLogUpdate: false });
    }
}

export default VendingMachineModel;
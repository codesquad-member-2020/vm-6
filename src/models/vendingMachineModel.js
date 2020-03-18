import Observable from '../util/observable.js';
import { getElements } from '../util/util.js';
import URL from '../util/url.js';

const OPTION = {
    PRODUCT_LIST_LENGTH: 20,
    PRODUCT_INDEX: 0,
    PRODUCT_NAME_INDEX: 1,
    PRODUCT_PRICE_INDEX: 2,
    DEFAULT_PRODUCT_INDEX: '0'
}

class VendingMachineModel extends Observable {
    constructor() {
        super();
        this.productData = null;
        this.insertedCash = 0;
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
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
        this.notify('changeCashInfo', { insertedCash: this.insertedCash, cash: cashUnit });
    }

    addSelectedProductIndex({ target }) {
        if (target.tagName !== 'BUTTON') return;
        if (this.selectedProductIndex + target.value > OPTION.PRODUCT_LIST_LENGTH) return;
        switch (target.value) {
            case 'reset': {
                this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
                this.notify('selectProduct', this.selectedProductIndex);
            }
                break;
            case 'choice': {
                if (this.selectedProductIndex === OPTION.DEFAULT_PRODUCT_INDEX) return;
                this.notifySelectedProduct();
            }
                break;
            default: {
                this.selectedProductIndex += target.value;
                this.notify('selectProduct', this.selectedProductIndex);
            };
        }
    }

    selectProduct(selectedProductIndex) {
        this.selectedProductIndex = selectedProductIndex;
        this.notifySelectedProduct();
    }

    searchProduct() {
        const productList = getElements('.product-list li');
        return {
            name: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_NAME_INDEX].innerText,
            price: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_PRICE_INDEX].innerText
        }
    }

    notifySelectedProduct() {
        const productInfo = this.searchProduct();
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        this.notify('selectProduct', this.selectedProductIndex);
        if (productInfo.price > this.insertedCash) {
            this.notify('purchaseProduct', { bCashNotEnough: true });
            return;
        }
        this.insertedCash -= productInfo.price;
        this.notify('purchaseProduct', { insertedCash: this.insertedCash, product: productInfo.name, index: this.selectedProductIndex });
        this.notify('changeCashInfo', { bLogRender: false });
    }
}

export default VendingMachineModel;
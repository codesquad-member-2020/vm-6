import Observable from "./observable.js";
import { vm$$ } from "./util.js";

const OPTION = {
    PRODUCT_LENGTH: 20,
    PRODUCT_INDEX: 0,
    PRODUCT_NAME_INDEX: 1,
    PRODUCT_PRICE_INDEX: 2,
    DEFAULT_PRODUCT_INDEX: "0"
}

class VmModel extends Observable {
    constructor() {
        super();
        this.insertedCash = 0;
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
    }

    sumInsertedCash({ target }) {
        if (target.tagName !== "BUTTON") return
        if (parseInt(target.nextElementSibling.innerText) === 0) return
        this.insertedCash += parseInt(target.value);
        this.notify({ insertedCash: this.insertedCash, cash: target.value });
    }

    addSelectedProductIndex({ target }) {
        if (target.tagName !== "BUTTON") return
        if (this.selectedProductIndex + target.value > OPTION.PRODUCT_LENGTH) return
        switch (target.value) {
            case "reset": {
                this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
                this.notify({ index: this.selectedProductIndex });
            }
                break;
            case "choice": {
                if (this.selectedProductIndex === OPTION.DEFAULT_PRODUCT_INDEX) return
                this.notifySelectedProduct();
            }
                break;
            default: {
                this.selectedProductIndex += target.value;
                this.notify({ index: this.selectedProductIndex });
            };
        }
    }

    selectProduct({ target }) {
        if (target.tagName === "SPAN") target = target.parentElement;
        if (target.tagName !== "LI") return
        this.selectedProductIndex = parseInt(target.children[OPTION.PRODUCT_INDEX].innerText);
        this.notifySelectedProduct();
    }

    searchProduct() {
        const productList = vm$$(".product-list li");
        return {
            name: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_NAME_INDEX].innerText,
            price: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_PRICE_INDEX].innerText
        }
    }

    notifySelectedProduct() {
        const productInfo = this.searchProduct();
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        if (productInfo.price > this.insertedCash) {
            this.notify({ index: this.selectedProductIndex, bCashNotEnough: true });
            return
        }
        this.insertedCash -= productInfo.price;
        this.notify({ insertedCash: this.insertedCash, product: productInfo.name, index: this.selectedProductIndex });
    }
}

export default VmModel;
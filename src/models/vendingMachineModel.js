import Observable from "../util/observable.js";
import { getElements } from "../util/util.js";

const OPTION = {
    PRODUCT_LENGTH: 20,
    PRODUCT_INDEX: 0,
    PRODUCT_NAME_INDEX: 1,
    PRODUCT_PRICE_INDEX: 2,
    DEFAULT_PRODUCT_INDEX: "0"
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
        this.getData("http://localhost:8080/vm/product");
    }

    async getData(url) {
        const response = await fetch(url);
        this.productData = await response.json();
        this.notify("init", this.productData);
    }

    sumInsertedCash({ target }) {
        if (target.tagName !== "BUTTON") return;
        if (parseInt(target.nextElementSibling.innerText) === 0) return;
        this.insertedCash += parseInt(target.value);
        this.notify("changeCashInfo", { insertedCash: this.insertedCash, cash: target.value });
    }

    addSelectedProductIndex({ target }) {
        if (target.tagName !== "BUTTON") return;
        if (this.selectedProductIndex + target.value > OPTION.PRODUCT_LENGTH) return;
        switch (target.value) {
            case "reset": {
                this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
                this.notify("selectProduct", this.selectedProductIndex);
            }
                break;
            case "choice": {
                if (this.selectedProductIndex === OPTION.DEFAULT_PRODUCT_INDEX) return;
                this.notifySelectedProduct();
            }
                break;
            default: {
                this.selectedProductIndex += target.value;
                this.notify("selectProduct", this.selectedProductIndex);
            };
        }
    }

    selectProduct({ target }) {
        if (target.tagName === "SPAN") target = target.parentElement;
        if (target.tagName !== "LI") return;
        this.selectedProductIndex = parseInt(target.children[OPTION.PRODUCT_INDEX].innerText);
        this.notifySelectedProduct();
    }

    searchProduct() {
        const productList = getElements(".product-list li");
        return {
            name: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_NAME_INDEX].innerText,
            price: productList[parseInt(this.selectedProductIndex) - 1].children[OPTION.PRODUCT_PRICE_INDEX].innerText
        }
    }

    notifySelectedProduct() {
        const productInfo = this.searchProduct();
        this.selectedProductIndex = OPTION.DEFAULT_PRODUCT_INDEX;
        this.notify("selectProduct", this.selectedProductIndex);
        if (productInfo.price > this.insertedCash) {
            this.notify("purchaseProduct", { bCashNotEnough: true });
            return;
        }
        this.insertedCash -= productInfo.price;
        this.notify("purchaseProduct", { insertedCash: this.insertedCash, product: productInfo.name, index: this.selectedProductIndex });
        this.notify("changeCashInfo", { bLogRender: false });
    }
}

export default VendingMachineModel;
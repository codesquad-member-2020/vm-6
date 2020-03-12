import Observable from "./observable.js";
import { vm$, vm$$, classAdd, classRemove } from "./util.js";

const OPTION = {
    PRODUCT_LENGTH: 20
}

class VmModel extends Observable {
    constructor() {
        super();
        this.insertCash = 0;
        this.selectedProductIndex = "0";
    }

    sumInsertCash({ target }) {
        if (target.tagName !== "BUTTON") return
        if (parseInt(target.nextElementSibling.innerText) === 0) return
        this.insertCash += parseInt(target.value);
        this.notify({ insertCash: this.insertCash, value: target.value });
    }


    addSelectedProductIndex({ target }) {
        if (target.tagName !== "BUTTON") return
        if (this.selectedProductIndex + target.value > OPTION.PRODUCT_LENGTH) return
        switch (target.value) {
            case "reset": this.selectedProductIndex = "0";
                break;
            case "choice": {
                const productList = vm$$(".product-list li");
                console.log(productList);
                this.selectedProductIndex = "0";
                this.insertCash = 0;
            }
                break;
            default: {
                this.selectedProductIndex += target.value;
            }
        }
        this.notify({ index: this.selectedProductIndex });
    }

    productHighlight() {
        const productPrice = vm$$(".product-price");
        Array.from(productPrice).forEach(priceNode => {
            if (parseInt(priceNode.innerText) <= this.insertCash) {
                classAdd(priceNode.parentElement, "on");
            } else if (priceNode.parentElement.classList.contains("on")) {
                classRemove(priceNode.parentElement, "on");
            }
        });
    }
}

export default VmModel;
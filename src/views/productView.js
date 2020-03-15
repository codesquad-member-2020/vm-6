import { vm$, vm$$, classAdd, classRemove } from "../util/util.js";

class ProductView {
    constructor(vmModel) {
        this.vmModel = vmModel;
        this.vmModel.subscribe("changeCashInfo", this.highlightProductUpdate.bind(this));
        this.init();
    }

    init() {
        this.registerEvent();
    }

    registerEvent() {
        const productList = vm$('.product-list');
        productList.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.selectProduct(evt);
    }

    highlightProductUpdate() {
        const productPrice = vm$$(".product-price");
        Array.from(productPrice).forEach(priceNode => {
            if (parseInt(priceNode.innerText) <= this.vmModel.insertedCash) classAdd(priceNode.parentElement, "on");
            else if (priceNode.parentElement.classList.contains("on")) classRemove(priceNode.parentElement, "on");
        });
    }
}

export default ProductView;
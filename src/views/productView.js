import { getElement, getElements, classAdd, classRemove } from "../util/util.js";
import { productPanel } from "../util/template.js";

class ProductView {
    constructor(vmModel) {
        this.vmModel = vmModel;
        this.vmModel.subscribe("changeCashInfo", this.productUpdate.bind(this));
        this.vmModel.subscribe("init", this.render.bind(this));
    }

    render(data) {
        const productWrap = getElement(".product-wrap");
        productWrap.innerHTML = productPanel(data);

        const productList = getElement('.product-list');
        productList.addEventListener("click", this.productListHandler.bind(this));
    }

    productListHandler(evt) {
        this.vmModel.selectProduct(evt);
    }

    productUpdate() {
        const productPrice = getElements(".product-price");
        Array.from(productPrice).forEach(priceNode => {
            if (parseInt(priceNode.innerText) <= this.vmModel.insertedCash) classAdd(priceNode.parentElement, "on");
            else if (priceNode.parentElement.classList.contains("on")) classRemove(priceNode.parentElement, "on");
        });
    }
}

export default ProductView;
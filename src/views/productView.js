import { getElement, getElements, classAdd, classRemove } from '../util/util.js';
import { productPanel } from '../util/template.js';

class ProductView {
    constructor(vendingMachineModel) {
        this.vendingMachineModel = vendingMachineModel;
        this.vendingMachineModel.subscribe('changeCashInfo', this.updateProductHighlight.bind(this));
        this.vendingMachineModel.subscribe('init', this.render.bind(this));
    }

    render(data) {
        const productWrap = getElement('.product-wrap');
        productWrap.innerHTML = productPanel(data);

        const productList = getElement('.product-list');
        productList.addEventListener('click', this.productListHandler.bind(this));
    }

    productListHandler(evt) {
        this.vendingMachineModel.selectProduct(evt);
    }

    updateProductHighlight() {
        const productPrice = getElements('.product-price');
        Array.from(productPrice).forEach(priceNode => {
            if (parseInt(priceNode.innerText) <= this.vendingMachineModel.insertedCash) classAdd(priceNode.parentElement, 'on');
            else if (priceNode.parentElement.classList.contains('on')) classRemove(priceNode.parentElement, 'on');
        });
    }
}

export default ProductView;
import { getElement, getElements, classAdd, classRemove } from '../util/util.js';
import { productPanel } from '../util/template.js';

const OPTION = {
    PRODUCT_INDEX: 0
}

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

    productListHandler({ target }) {
        if (target.tagName === 'SPAN') target = target.closest('li');
        if (target.tagName !== 'LI') return;
        const selectedProductIndex = parseInt(target.children[OPTION.PRODUCT_INDEX].innerText);
        this.vendingMachineModel.selectProduct(selectedProductIndex);
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
import { vm$ } from "./util.js";

const OPTION = {
    SCROLL_UNIT: 20
}

class ProductSelectView {
    constructor(vmModel) {
        this.insertedCash = vm$(".inserted-cash");
        this.selectedProductIndex = vm$(".selected-product-index");
        this.productSelectLog = vm$(".product-select-log");
        this.vmModel = vmModel;
        this.vmModel.subscribe(this.render.bind(this));
        this.init();
    }

    init() {
        this.registerEvent();
    }

    registerEvent() {
        const productSelectBtns = vm$('.product-select-btns');
        productSelectBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.addSelectedProductIndex(evt);
    }

    render({ index, insertedCash, value, product, bCashNotEnough }) {
        if (insertedCash >= 0) this.insertedCash.innerHTML = insertedCash;
        if (value) {
            this.productSelectLog.innerHTML += `${value}원 투입<br>`;
            this.productSelectLog.scrollTop += OPTION.SCROLL_UNIT;
        }
        if (product) {
            this.productSelectLog.innerHTML += `${product} 선택<br>`;
            this.productSelectLog.scrollTop += OPTION.SCROLL_UNIT;
        }
        if (bCashNotEnough) {
            this.productSelectLog.innerHTML += `잔액 부족<br>`;
            this.productSelectLog.scrollTop += OPTION.SCROLL_UNIT;
        }
        if (index) this.selectedProductIndex.innerHTML = parseInt(index);
    }
}

export default ProductSelectView;
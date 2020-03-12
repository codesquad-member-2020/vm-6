import { vm$ } from "./util.js";

class ProductSelectView {
    constructor(vmModel) {
        this.insertCash = vm$(".insert-cash");
        this.selectedProductIndex = vm$(".selected-product-index");
        this.productSelectLog = vm$(".product-select-log");
        this.vmModel = vmModel;
        this.vmModel.subscribe(this.render.bind(this));
        this.init();
    }

    init() {
        this.eventRegister();
    }

    eventRegister() {
        const productSelectBtns = vm$('.product-select-btns');
        productSelectBtns.addEventListener("click", this.eventHandler.bind(this));
    }

    eventHandler(evt) {
        this.vmModel.addSelectedProductIndex(evt);
    }

    render({ index, insertCash, value }) {
        if (insertCash || value) {
            this.insertCash.innerHTML = insertCash;
            this.productSelectLog.innerHTML += `${value}원이 투입됐음<br>`;
            this.productSelectLog.scrollTop += 20;
        }
        if (index) this.selectedProductIndex.innerHTML = parseInt(index);
    }
}

export default ProductSelectView;
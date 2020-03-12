import { vm$ } from "./util.js";

class ProductSelectView {
    constructor(walletModel) {
        this.insertPrice = vm$(".insert-cash");
        this.productSelectLog = vm$(".product-select-log");
        this.walletModel = walletModel;
        this.walletModel.subscribe(this.render.bind(this));
    }

    render(insertCash, value) {
        this.insertPrice.innerHTML = insertCash;
        this.productSelectLog.innerHTML += `${value}원이 투입됐음<br>`;
        this.productSelectLog.scrollTop += 20;
    }
}

export default ProductSelectView;
import Observable from "./observable.js";

class VmModel extends Observable {
    constructor() {
        super();
        this.insertCash = 0;
    }

    sumInsertCash({ target }) {
        if (target.tagName !== "BUTTON") return
        if (parseInt(target.nextElementSibling.innerText) === 0) return
        this.insertCash += parseInt(target.value);
        this.notify(this.insertCash, target.value);
    }
}

export default VmModel;
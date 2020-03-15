class Observable {
    constructor() {
        this._observers = {
            "changeCashInfo": new Set(),
            "selectProduct": new Set(),
            "purchaseProduct": new Set(),
        };
    }

    subscribe(type, observer) {
        this._observers[type].add(observer);
    }

    unsubscribe(type, observer) {
        this._observers[type] = [...this._observers].filter(
            subscriber => subscriber !== observer
        );
    }

    notify(type, ...data) {
        this._observers[type].forEach(observer => observer(...data));
    }
}

export default Observable;
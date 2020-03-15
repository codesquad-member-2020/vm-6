export function productPanel(data) {
    const productList = data.reduce((list, product) => {
        list += `<li>
                    <span class="product-index">${product.index}</span>
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price}</span>
                </li>`
        return list;
    }, "");
    return `<ul class="product-list">${productList}</ul>`
}

export function productSelectPanel() {
    return `
        <div class="product-select-info-wrap">
            <div class="selected-product-index-wrap">
                <span class="selected-product-index">0</span>
            </div>

            <div class="inserted-cash-wrap">
                <span class="inserted-cash">0</span>
                <span class="cash-unit">원</span>
            </div>
        </div>


        <div class="product-select-btns">
            <button value="1">1</button>
            <button value="2">2</button>
            <button value="3">3</button>
            <button value="4">4</button>
            <button value="5">5</button>
            <button value="6">6</button>
            <button value="7">7</button>
            <button value="8">8</button>
            <button value="9">9</button>
            <button value="reset">취소</button>
            <button value="0">0</button>
            <button value="choice">선택</button>
        </div>

        <ul class="product-select-log"></ul>
            `
}

export function walletPanel(data) {
    let cashTotal = 0;
    const walletList = data.reduce((list, cashInfo) => {
        cashTotal += (cashInfo.cashUnit * cashInfo.cashCount);
        list += `<li>
                    <button value="${cashInfo.cashUnit}">${cashInfo.cashUnit}원</button>
                    <span class="cash-count">${cashInfo.cashCount}</span>
                </li>`
        return list;
    }, "");
    return `<ul class="wallet-btns">${walletList}</ul>
            <div class="wallet-cash-total-wrap">
                <span class="wallet-cash-total">${cashTotal}</span>
                <span>원</span>
            </div>
            `
}
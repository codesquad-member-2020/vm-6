import WalletView from "./src/views/walletView.js";
import ProductSelectView from "./src/views/productSelectView.js";
import ProductView from "./src/views/productView.js";
import WalletModel from "./src/models/walletModel.js";
import VendingMachineModel from "./src/models/vendingMachineModel.js";

(function main() {
    const walletModel = new WalletModel();
    const vendingMachineModel = new VendingMachineModel();

    new WalletView(walletModel, vendingMachineModel);
    new ProductSelectView(vendingMachineModel);
    new ProductView(vendingMachineModel);
})();
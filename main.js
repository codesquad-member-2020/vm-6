import WalletView from "./src/views/walletView.js";
import ProductSelectView from "./src/views/productSelectView.js";
import ProductView from "./src/views/productView.js";
import WalletModel from "./src/models/walletModel.js";
import VmModel from "./src/models/vmModel.js";

(function main() {
    const walletModel = new WalletModel();
    const vmModel = new VmModel();

    new WalletView(walletModel, vmModel);
    new ProductSelectView(vmModel);
    new ProductView(vmModel);
})();
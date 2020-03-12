import { vm$ } from "./util.js";
import WalletView from "./walletView.js";
import WalletModel from "./walletModel.js";
import VmModel from "./vmModel.js";
import ProductSelectView from "./productSelectView.js";

const walletModel = new WalletModel();
const vmModel = new VmModel();
new WalletView(walletModel, vmModel);
new ProductSelectView(vmModel);
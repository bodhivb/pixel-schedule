import Overlay from "./overlay";
import App from "./app";

const overlay = new Overlay();
const app = new App(overlay);
document.body.appendChild(app.view);
document.body.appendChild(overlay.view);

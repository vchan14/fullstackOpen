import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStoreObj } from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={configureStoreObj}>
    <App />
  </Provider>,
);

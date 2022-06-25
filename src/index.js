import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom/client";
import store, { persistor } from "./redux/store";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </PersistGate>
  </BrowserRouter>
);

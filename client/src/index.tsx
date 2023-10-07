import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import UserStore from "./store/UserStore.js";
import DeviceStore from "./store/DeviceStore.js";

type ContextType = {
    user: UserStore;
    device: DeviceStore;
} | null;

const defaultContextValue: ContextType = {
    user: new UserStore(),
    device: new DeviceStore(),
};

export const Context = createContext(defaultContextValue);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Context.Provider
            value={{
                user: new UserStore(),
                device: new DeviceStore(),
            }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);

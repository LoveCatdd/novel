import React from "react";
import userStore from "./UserStore"

class Store {
    constructor() {
        this.userStore = userStore;
    }
}

const store = new Store();

const StoreContext = React.createContext(store);
const useStore = () => React.useContext(StoreContext);

export {useStore,store};

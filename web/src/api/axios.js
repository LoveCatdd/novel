import axios from "axios"
import { store } from "../store/store";


const userStore = store.userStore;
userStore.updateUserInfoFromSessionStorage();
console.log(userStore.jwt_token);

const unAuthAxios = (type, url, data) => {
    switch (type) {
        case "get":
            return axios.get(url); 
        case "post":
            return axios.post(url,data); 
    }
}

const authAxios = (type, url, data) => {
    switch (type) {
        case "get":
            return axios.get(url, {
                headers: {
                    Authorization: "Bearer " + userStore.jwt_token,
                    "Content-Type": "application/json",
                },
            });
        case "post":
            return axios.post(url,data, {
                headers: {
                    Authorization: "Bearer " + userStore.jwt_token,
                    "Content-Type": "application/json",
                },
            });
    }
}

export {
    unAuthAxios, authAxios
}
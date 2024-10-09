import axios from "axios";
import { makeAutoObservable } from "mobx";

export class UserStore {

  constructor() {
    this.is_logined = false;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.jwt_token = '';
    this.uid = '';

    makeAutoObservable(this);
  }

  login = async (email, password) => {
    let message = '';
    try {
      const resp = await axios.post('http://localhost:8088/api/v1/auth/login', {
        email: email,
        password: password
      });
      const data = resp.data;
      if (data.error_message === "success") {
        this.jwt_token = data.jwtToken;
        this.is_logined = true;
        message = await this.getInfo();
      } else {
        message = "邮箱或密码错误"
      }
    } catch (error) {
      message = "邮箱或密码错误"
    }
    return message;
  };

  getInfo = async () => {
    let message = '';
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8088/api/v1/user/get-info",
        {},
        {
          headers: {
            Authorization: "Bearer " + this.jwt_token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = resp.data;
      console.log(data);
      if (data.error_message === "success") {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.uid = data.uid;
        message = '';
        sessionStorage.setItem('user', JSON.stringify(this.getUserInfoForStorage()));
      } else message = "获取用户信息失败";
    } catch (error) {
      message = "获取用户信息失败";
    }
    return message;
  };

  logout = async () => {
    this.is_logined = false;
    this.first_name = '';
    this.last_name = '';
    this.jwt_token = '';
    this.uid = '';
    sessionStorage.removeItem('user');
  };

  getUserInfoForStorage() {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      uid: this.uid,
      is_logined: this.is_logined,
      jwt_token: this.jwt_token,
    };
  }

  updateUserInfoFromSessionStorage = () => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('user'));

    if (storedUserInfo) {
      this.is_logined = storedUserInfo.is_logined;
      this.first_name = storedUserInfo.first_name;
      this.last_name = storedUserInfo.last_name;
      this.email = storedUserInfo.email;
      this.jwt_token = storedUserInfo.jwt_token;
      this.uid = storedUserInfo.uid;
      // makeAutoObservable(this,storedUserInfo);
      return "success";
    }
     return "";
  };


}
const userStore = new UserStore();
export default userStore;

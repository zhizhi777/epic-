//维护所有登录注册有关的行为和状态 
import { makeAutoObservable, observable, action } from "mobx";
import { Auth } from "../models";
import UserStore from "./user";
import HistoryStore from "./history";
import ImageStore from "./image";
import { message } from "antd";

class AuthStore{
  constructor() {
    makeAutoObservable(this)
}

  @observable values = {
    username: '',
    password: ''
  }

  @action setUsername(username){
    this.values.username = username
  }

  @action setPassword(password){
    this.values.password = password
  }

  @action login(){
    return new Promise((resolve, reject)=>{
      Auth.login(this.values.username, this.values.password)
        .then(user=> {
          UserStore.pullUser()
          resolve(user)
        }).catch(error=> {
          UserStore.resetUser()
          switch (error.code) {
            case -1:
              message.error('请求已终止，请查看网络连接')
              break;
            case 210:
              message.error('用户名或密码错误')
            break;
            case 211:
              message.error('用户不存在')
            break;
            case 219:
              message.error('登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。')
            break;
            default:
              break;
          }
          reject(error)
        })
    })
  }

  @action register(){
    return new Promise((resolve, reject)=>{
      Auth.register(this.values.username, this.values.password)
    .then(user=> {
      UserStore.pullUser()
      resolve(user)
    })
    .catch(error=> {
      UserStore.resetUser()
      switch (error.code) {
        case -1:
          message.error('请求已终止，请查看网络连接')
          break;
        case 202:
          message.error('用户名已存在')
        break;
        
        default:
          break;
      }
      reject(error)
    })
    })
  }

  @action logOut(){
    Auth.logOut()
    UserStore.resetUser()
    HistoryStore.reset()
    ImageStore.reset()
  }
}

export default new AuthStore()
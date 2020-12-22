//维护所有登录注册有关的行为和状态 
import { observable, action } from "mobx";

class AuthStore{
  @observable isLogin = false
  @observable isLoding = false
  @observable values = {
    username: '',
    password: ''
  }

  @action setIsLogin(isLogin){
    this.isLogin = isLogin
  }

  @action setUsername(username){
    this.values.username = username
  }

  @action setPassword(password){
    this.values.password = password
  }

  @action login(){
    console.log('登录中..')
    this.isLoding = true
    setTimeout(()=>{
      console.log('登录成功')
      this.isLogin = true
      this.isLoding = false
    }, 1000)
  }

  @action register(){
    console.log('注册中..')
    this.isLoding = true
    setTimeout(()=>{
      console.log('注册成功')
      this.isLogin = true
      this.isLoding = false
    }, 1000)
  }

  @action logOut(){
    console.log('已注销..')
  }

}

export { AuthStore }
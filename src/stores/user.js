import { makeAutoObservable, observable, action } from "mobx";
import { Auth } from "../models";

class UserStore{
  constructor() {
    makeAutoObservable(this)

    this.pullUser()
  }
  @observable currentUser = null;

  @action pullUser(){
    this.currentUser = Auth.getCurrentUser()
  }

  @action resetUser(){
    this.currentUser = null
  }
}

export default new UserStore()
import { message } from "antd";
import { makeAutoObservable, observable, action } from "mobx";
import { Uploader } from "../models";

class HistoryStore{
  constructor() {
    makeAutoObservable(this)
  }
  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList){
    this.list = this.list.concat(newList)
  }

  @action find(){
    this.isLoading = true
    Uploader.find({page: this.page, limit: this.limit}).then(newList => {
      this.append(newList)
      this.page++
      if(newList.length < this.limit){
        this.hasMore = false
      }
    }).catch(err => {
      message.error('加载数据失败！')
    }).finally(() => {
      this.isLoading = false
    })
  }

  @action delete(fileId){
    Uploader.delete(fileId).then(result => {
      message.success('删除成功')
      this.list = this.list.filter(item => item.id !== fileId)
      // this.list = this.list.splice(this.list.indexOf(this.list.filter(item => item.id == fileId)[0]),1)
    }).catch(err => {
      message.error('删除失败')
    })
  }

  @action reset(){
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  }
}

export default new HistoryStore()
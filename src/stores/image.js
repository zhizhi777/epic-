import { makeAutoObservable, observable, action } from "mobx";
import { Uploader } from "../models";
import { message } from "antd";

class ImageStore{
  constructor() {
    makeAutoObservable(this)
  }
  @observable filename = '';
  @observable file = null;
  @observable isUploading = false;
  @observable serverFile = null;

  @action setFilename(filename){
    this.filename = filename
  }

  @action setFile(file){
    this.file = file
  }

  @action upload(){
    this.isUploading = true
    this.serverFile = null
    return new Promise((resolve, reject)=>{
      Uploader.add(this.file, this.filename).then(serverFile=>{
        this.serverFile = serverFile
        resolve(serverFile)
      }).catch(err =>{
        reject(err)
        message.error('上传失败！')
      }).finally(()=>{
        this.isUploading = false
      })
    })
  }

  @action reset(){
    this.serverFile = null;
    this.isUploading = false;
  }
}

export default new ImageStore()
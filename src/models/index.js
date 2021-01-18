import Avatar from "antd/lib/avatar/avatar";
import AV, { Query, User } from "leancloud-storage";


AV.init({
  appId: "2kn3uNRmbJ020gk4UEYl2Gti-gzGzoHsz",
  appKey: "quqhs0ykhyzpN2CXfWRTRnDW",
  serverURL: "https://2kn3unrm.lc-cn-n1-shared.com"
});



const Auth = {
  register(username, password){
    let user = new User()
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then( user => resolve(user), error => reject(error))
    })
  },

  login(username, password){
    return new Promise((resolve, reject)=>{
      User.logIn(username, password).then(user => resolve(user), error=>reject(error))
    })
    
  },

  logOut(){
    User.logOut();
  },

  getCurrentUser(){
    return User.current()
  }
}

const Uploader = {
  add(file, filename){
    const image = new AV.Object('Image')
    const avFile = new AV.File(filename, file)
    image.set('filename', filename)
    image.set('owner', User.current())
    image.set('url', avFile)
    return new Promise((resolve, reject) => {
      image.save().then(serverFile => resolve(serverFile), error => reject(error))
    })
  },

  find({page=0, limit=10}){
    const query = new AV.Query('Image')
    query.include('owner');
    query.equalTo('owner', User.current());
    query.limit(limit);
    query.skip(limit*page);
    query.descending('createdAt')
    return new Promise((resolve, reject)=>{
      query.find().then((results) => {
        resolve(results)
      }).catch(err => {
        reject(err)
      })
    })
  },

  delete(fileId){
    const file = AV.Object.createWithoutData('Image', fileId);
    return new Promise((resolve, reject)=>{
      file.destroy().then(result=>{
        resolve(result)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}

export {
  Auth,
  Uploader
}
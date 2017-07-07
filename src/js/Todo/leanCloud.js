import AV from 'leancloud-storage';
var APP_ID = 'Olxk4NWKifF56MesmP8y5mP6-gzGzoHsz';
var APP_KEY = 'yOOePg1IUofUKlcxpOSmpY4l';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
}); 

export default AV;

export function signUp(userName, passWord, successFn, errorFn){
    //创建AVUser对象实例
    let user = new AV.User()
    //设置用户名
    user.setUsername(userName)
    //设置用户密码
    user.setPassword(passWord)
    //设置邮箱

    user.signUp().then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error){
        errorFn.call(null, error)
    })

    return undefined
}

function getUserFromAVUser(AVUser){
    return{
        id: AVUser.id,
        ...AVUser.attributes
    }
}
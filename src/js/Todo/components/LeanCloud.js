import AV from 'leancloud-storage';
var APP_ID = 'Olxk4NWKifF56MesmP8y5mP6-gzGzoHsz';
var APP_KEY = 'yOOePg1IUofUKlcxpOSmpY4l';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
}); 

export default AV;

//注册的方法
// export function signUp(userName, passWord, email, successFn, errorFn){
//     //创建AVUser对象实例
//     let user = new AV.User()
//     //设置用户名
//     user.setUsername(userName)
//     //设置用户密码
//     user.setPassword(passWord)
//     //设置邮箱
//     user.setEmail(email)

//     user.signUp().then(function(loginedUser){
//         let user = getUserFromAVUser(loginedUser)
//         successFn.call(null, user)
//     }, function(error){
//         errorFn.call(null, error)
//     })

//     return undefined
// }

//注册的方法
export function signUp(userObj){
    //创建AVUser对象实例
    let user = new AV.User()
    //设置用户名
    user.setUsername(userObj.userName)
    //设置用户密码
    user.setPassword(userObj.password)
    //设置邮箱
    user.setEmail(userObj.email)

    return user.signUp().then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        console.log('注册成功', user)
        return user
    }, function(error){
         console.log('注册失败', error)
        return error
    })
}

//登录的方法
// export function signIn(userName, passWord, successFn, errorFn){
   
//     AV.User.logIn(userName, passWord).then(function(loginedUser){
//         let user = getUserFromAVUser(loginedUser)
//         successFn.call(null, user)
//     }, function(error){
//         errorFn.call(null, error)
//     })

// }

//登录的方法
export function signIn(userObj){
   
    return AV.User.logIn(userObj.userName, userObj.password).then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        console.log('登录成功', user)
        return user
    }, function(error){
         console.log('登录失败', error)
         return error
    })

}

//解析返回的用户数据
function getUserFromAVUser(AVUser){
    return{
        id: AVUser.id,
        ...AVUser.attributes
    }
}

//查找上次登录的用户
export function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

//登出的处理方法
export function signOut(){
    AV.User.logOut()
    console.log('我是登出！！')
    return undefined
}

export function getErrorCodeMessage(errorCode){
    const errorCodeMesage = {
        202: '用户名已被占用',
        210: '用户名获取密码有误，请检查',
        211: '用户名不存在，请检查',
        125: '电子邮箱地址无效'
    }
    // console.log('errorCodeMesage[' + errorCode + '] = ' + errorCodeMesage[errorCode])
    return errorCodeMesage[errorCode]
}


//定义url
let config={
    'login':'/login',
    'register':'/register',
    'userValidate':'/userValidate'
};
const loginUser = [
    {
        'id':1,
        'username':'admin',
        'password':'123456',
        'avatar':'http://lorempixel.com/200/200/',
        'name':'张三',
        'token':'etye0fgkgk4ca2aabd20ae9a5dd77471fg'
    },
    {
        'id':2,
        'username':'lisi',
        'password':'123456',
        'avatar':'http://lorempixel.com/200/200/',
        'name':'李四',
        'token':'880fed4ca2aabd20ae9a5dd774711de2'
    }
];
let _loginUser = loginUser;
// 1、模拟登录
let userLogin = function (options) {
    let userData = JSON.parse(options.body);
    let userToken='';
    let name='';
    console.log(_loginUser);
    let hasUser = _loginUser.some(user => {
        if(user.username === userData.name && user.password === userData.password){
            userToken = user.token;
            name =user.name;
            return true
        }else {
            return false
        }
    });
    if(hasUser){
        return {code:200, msg:'请求成功',userToken,name}
    }else{
        return {code:500, msg:'账号或密码错误'}
    }
};
//2、模拟注册用户
let userValidate = function(options){
    let getName =JSON.parse(options.body);
    let hasName = _loginUser.some((userItem) => {
        if(userItem.username === getName.name){
            return true
        }else{
            return false
        }
    });
    if(hasName){
        return {valid:0, msg:'用户名已注册过'}
    }else{
        return {valid:1, msg:'用户名可注册'}
    }
};
let userRegister = function(options){
    let regisData = JSON.parse(options.body);
    let newData = {
        id:_loginUser.length + 1,
        username: regisData.rName,
        password: regisData.rPassword,
        name: regisData.rNickname,
        avatar:'http://lorempixel.com/200/200/',
        token:'880fed4ca2aabd20ae9a5dd774711de2'
    };
    _loginUser.push(newData);
    console.log(_loginUser);
};
//设置url
Mock.mock(config.login,/get|post/i, userLogin);
Mock.mock(config.register,/get|post/i, userRegister);
Mock.mock(config.userValidate,/get|post/i, userValidate);

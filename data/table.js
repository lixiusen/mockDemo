//------定义url------
let config = {
    "userList": "user/list",
    "userDelete": "user/delete",
    "userEdit":"user/editList",
    "userAdd":"user/addList",
    "goodsList": "goods/list"
};
// 获取 mock.Random 对象
const Random = Mock.Random;
// ------生成mock数据------
let mackUserData=[];
for(let i=0; i< 42; i++){// 随机生成42个数组元素
    let userItem={
        'name': Random.cname(5, 30), // 中文名称
        'id': Random.increment(),    // ID从1开始
        'age': Random.float(18, 28, 0, 0),   // 18至28以内随机整数, 0只是用来确定类型
        'birthday': Random.date("yyyy-MM-dd"),  // 日期
        'city': Random.city(true),   // 中国城市
        'isMale': true,  // 布尔值
        'isFat': Random.boolean(),  // true的概率是1/3
        'brother': ['jack', 'jim'], // 随机选取 1 个元素
    };
    mackUserData.push(userItem);
}
//1-1、用户数据列表
let _Users = mackUserData;
let userData = function(options){
    //先获取数据总数
    let userList = _Users;
    let totalLength = _Users.length;
    //分页
    let currentPage = JSON.parse(options.body).currentPage;//获取前端传过来的页码
    let pageSize = JSON.parse(options.body).pageSize;

    userList = userList.filter(
        //(u, index) => index < 10 * page && index >= 10 * (page - 1)
        function (u,index) {
            return index < pageSize * currentPage && index >= pageSize * (currentPage - 1)
        }
    );
    return{
        dataArr: userList,
        total: totalLength
    }
};
//1-2、模拟删除用户
let deleteUserData = function(options){
    let id = parseInt(JSON.parse(options.body).id);
    _Users = _Users.filter(u => u.id !== id);
    return {
        dataArr: _Users,
        code: 200,
        msg: '删除成功'
    }
};
//1-3、模拟编辑用户
let editUserData = function(options){
    var editData = JSON.parse(options.body);
   _Users.some((aa) => {
        if(aa.id == editData.id){
            aa.name = editData.name;
            aa.age = editData.age;
            aa.city = editData.city;
        }
    });
    //console.log(_Users);
};
//1-4、模拟新增用户
let addUserData = function(option){
    let addData = JSON.parse(option.body);
    let newData=Object.assign({id: Random.increment()},addData);
    console.log(newData);
    _Users.unshift(newData)
};


//------设置url------
Mock.mock(config.userList,/get|post/i,userData );
Mock.mock(config.userDelete,/get|post/i,deleteUserData );
Mock.mock(config.userEdit,/get|post/i, editUserData);
Mock.mock(config.userAdd,/get|post/i, addUserData);


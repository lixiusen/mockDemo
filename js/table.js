//import  {addTextToBody} from './lib/axios-mock-adapter.min.js'
new  Vue({
    el:"#app",
    data(){
        return {
            dataTable:[],
            total:20,
            currentPage:1,
            pageSize:10,
            nickName:localStorage.getItem('name'),
            title:'编辑',
            form:{
                id:'',
                name:'',
                age:'18',
                city:''
            },
            dialogFormVisible: false,
            dialogStatus:'',
            editFormRules:{
                name: [{
                    required:true, message:'请输入名称', trigger:'blur'
                }]
            }
        }
    },
    mounted:function(){
        this.getData();
        this.loadData();
        let user= window.localStorage.getItem('userObj');
        // let user=false;
        // if(user){
        //     console.log("1")
        // }else{
        //     window.location.href='login.html';
        // }
        console.log(user);
    },
    methods:{
        getData : function () {
            let self = this;//this必须要缓存起来！！！！
            let data= {'currentPage':this.currentPage, 'pageSize':this.pageSize};
            $.ajax({
                url: 'user/list',
                type: 'post',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function (result) {
                    self.dataTable = result.dataArr;
                    self.total = result.total;
                },
                error: function (result) {
                    console.log(result)
                }
            });
            // axios.post('user/list')
            //     .then(function (result) {
            //         self.dataTable = result.data.dataArr;//使用axios为什么多了一个data
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     })

        },
        deleteList: function (id) {
            //data.splice(index,1)
            //https://www.jb51.net/article/126526.htm
            let self = this;
            let _data= {id: id};
            let _headers = {
                Accept: "application/json; charset=utf-8",
                userToken: localStorage.getItem('token')
            };
            this.$confirm('确认删除该用户吗?', '提示', {
                type: 'warning'
            })
                .then(() => {
                $.ajax({
                    url:'user/delete',
                    type:'post',
                    dataType:'json',
                    data: JSON.stringify(_data),
                    headers: _headers,
                    success: function (result) {
                        //self.dataTable = result.dataArr;
                        if(result.code === 200){
                            self.$message({
                               message: result.msg,
                               type: 'success'
                            });
                            self.getData();
                        }

                    },
                    error: function () {
                        console.log("网络错误")
                    }
                });
            })
                .catch(() => {
                    console.log("取消删除");
                })
            ;

            // this.$http.post('user/delete', data).then(result => {
            //     console.log("删除成功");
            //     this.dataTable = result.data.dataArr
            // })

        },
        loadData: function () {
            $.ajax({
                url:'http://rap2api.taobao.org/app/mock/84388/goods',
                data:'{id:2}',
                type:'post',
                dataType:'json',
                success:function (result) {
                   //console.log(JSON.stringify(result))
                    console.log(result);
                }
            })
            // axios.post('http://rap2api.taobao.org/app/mock/84388/goodsList')
            //     .then(function (result) {
            //         console.log(result.data);
            //     })
            //     .catch(function (error) {
            //         console.log("2");
            //     })
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage= currentPage;
            this.getData();
        },
        editList: function (scope) {
            let self = this;
            self.title = '编辑';
            self.dialogFormVisible = true;
            this.form.id= scope.id;
            this.form.name = scope.name;
            this.form.age = scope.age;
            this.form.city = scope.city;
        },
        updateList: function () {
            let self = this;
            this.$refs.editForm.validate((aa) => {
                if(aa){
                    this.$confirm("确认提交吗？","提示",{type: 'warning'})
                        .then(() => {
                            let data= {
                                id: this.form.id,
                                name: this.form.name,
                                age: this.form.age,
                                city:this.form.city
                            };

                            $.ajax({
                                url:'user/editList',
                                type:'post',
                                dataType:'json',
                                data: JSON.stringify(data),
                                contentType:'application/x-www-form-urlencoded; charset=UTF-8',//解决发送数据乱码
                                success: function (result) {
                                    self.dialogFormVisible = false;
                                    self.$message({
                                        message: '提交成功',
                                        type:'success'
                                    });
                                    self.getData();
                                    //console.log(result);
                                }
                            });
                         });
                }
            });

        },
        addUser: function () {
            let self = this;
            self.dialogFormVisible = true;
            self.title = '新增';
            self.dialogStatus= 'create';
            self.form={
                name:'',
                age:'18',
                city:''
            }
        },
        createList: function () {
            let self = this;
            $.ajax({
                url: 'user/addList',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(self.form),
                success:function (result) {
                    console.log(result);
                    self.dialogFormVisible = false;
                    self.getData();
                }
            })
        }

    }
});

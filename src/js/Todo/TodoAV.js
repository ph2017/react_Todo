import AV from './LeanCloud'
import MyUtil from './Util'

//云端数据库 Todo表的操作对象
var TodoAV = AV.Object.extend('Todo')

//保存todo数据到云端
export function saveTodo(todo, successFn, errorFn) {

    var saveTodo = new TodoAV();;

    for (var key in todo) {
        if (todo.hasOwnProperty(key)) {
            saveTodo.set(key, todo[key])
        }
    }

    // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
    // 这样做就可以让这个 Todo 只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)

    saveTodo.setACL(acl);

    // console.log('要保存的todo：', todo)
    saveTodo.save()
        .then(function (response) {
                console.log('保存todo成功  objectId is' + response.id)
                return response.id
            },
            function (error) {
                console.error('保存todo失败：', error);
            }).then(function (response) {
            if (successFn) {
                // console.log('到底有没有来到这个then？？', response)
                // successFn.call(null, {'objectId': response});
                successFn();

            }
        })


}

//根据条件查询云端的todo数据
export function queryTodoByCondition(condition, successFn, errorFn) {

    //构造查询条件，等值查询
    var queryArr = [];
    for (var key in condition) {
        var equalQuery = new AV.Query('Todo');
        if (condition.hasOwnProperty(key)) {
            equalQuery.equalTo(key, condition[key]);
            queryArr.push(equalQuery)
        }
    }

    var query = null;
    if (queryArr.length > 0) {
        //可根据条件查询的查询对象
        query = AV.Query.and.apply(null, queryArr);

        query.find().then(function (response) {
            // 获取到本地
            console.log('queryTodoByCondition 查询成功：', response)
            var todoList = MyUtil().deepCopy(response)

            return todoList
        }, function (error) {
            // 异常处理
            console.error('queryTodoByCondition 查询失败：', error);
        }).then(function (result) {
            if (successFn) {
                successFn(result);
            }
        });
    } else {
        //不根据条件查询的查询对象
        query = new AV.Query('Todo')

        query.find().then((response) => {
            console.log('queryTodoByCondition 查询成功：', response)
            let array = response.map((t) => {
                return {
                    objectId: t.id,
                    ...t.attributes
                }
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    }



}

//更新todo的方法
export function updateTodo(todo) {
    // 第一个参数是 className，第二个参数是 objectId
    var todoSave = AV.Object.createWithoutData('Todo', todo.objectId);
    // 修改属性
    for (var key in todo) {
        if (todo.hasOwnProperty(key)) {
            var element = todo[key];
            if (key !== 'objectId') {
                todoSave.set(key, element);
            }
        }
    }
    // 保存到云端
    todoSave.save();
}

//批量保存todo数据到云端
// export function saveTodos(toDoArr){
//   // 批量创建（更新）
//   AV.Object.saveAll(objects).then(function (objects) {
//     // 成功
//   }, function (error) {
//     // 异常处理
//   });
// }
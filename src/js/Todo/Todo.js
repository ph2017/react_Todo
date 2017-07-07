import React from 'react';
import 'normalize.css';
import 'reset.css';
import '../../css/todo.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut} from './LeanCloud';

class Todo extends React.Component{
    constructor(props){
        super(props);

          /**数据例子
             * [
                {id:1, title:'第1个代办任务', status:'completed'},
                {id:2, title:'第2个代办任务', status:''}
            ]
             */
        this.state = {
            user: getCurrentUser() || {},
            todoList: [],
            newTodo: ''
        }

        this.addTodo = this.addTodo.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    addTodo(event){
        let newTodoList = this.state.todoList;
        let idx = Math.random().toString().substr(-5);
        newTodoList.push({
            id: idx,
            title: event.target.value
        })

        this.setState({
            todoList: newTodoList,
            newTodo: ''
        })

        // console.log('传递进来的参数：' + event.target.value);
        // console.log('我要添加一个todo了!!');
    }

    //注册组件的注册处理方法
    onSignUpOrSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)

        console.log('todo 的 onSignUp', this.state.user)
    }

    onSignOut(){
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)

        console.log('todo 的 onSignOut', this.state.user)
    }

    componentDidUpdate(){
        //组件更新后，保存todoList到localStorage
        // localStorage.save('todoList', this.state.todoList);
    }

    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    changeStatus(event, todo){
        todo.status = todo.status === 'completed' ? '':'completed'
        this.setState(this.state)

        // console.log('todoList', this.state.todoList)
    }

    deleteTodo(event, todo){
        todo.deleted = true
        this.setState(this.state)

    }

    render(){

        let todos = this.state.todoList
            .filter((item)=> !item.deleted)
            .map((element, idex)=>{
            return (
                <li key={element.id}>
                    <TodoItem todo={element} onToggle={this.changeStatus} onDelete={this.deleteTodo}/>
                </li>
            )
        })

        return (
            <div className="todoCt">
                {/*登出功能按钮*/}
                {this.state.user.id ? <button className="logoutBtn" onClick={this.onSignOut.bind(this)}>登出</button> : null}
                <h1>{this.state.user.username}的代办：</h1>
                <div className="inputWrapper">
                    <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} onChange={this.changeTitle}/> 
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
                {/*注册/登录成功，则关闭登录dialog*/}
                {this.state.user.id ? null : <UserDialog onSignUpOrSignIn={this.onSignUpOrSignIn.bind(this)} />}
                
            </div>
        );
    }
}

export default Todo;
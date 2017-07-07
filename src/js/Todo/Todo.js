import React from 'react';
import 'normalize.css';
import 'reset.css';
import '../../css/todo.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStorage from './lacolStorage';


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
            todoList: localStorage.load('todoList') || [],
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

        localStorage.save('todoList', this.state.todoList);

        // console.log('传递进来的参数：' + event.target.value);
        // console.log('我要添加一个todo了!!');
    }

    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })

        localStorage.save('todoList', this.state.todoList);
    }

    changeStatus(event, todo){
        todo.status = todo.status === 'completed' ? '':'completed'
        this.setState(this.state)

        localStorage.save('todoList', this.state.todoList);
        // console.log('todoList', this.state.todoList)
    }

    deleteTodo(event, todo){
        todo.deleted = true
        this.setState(this.state)

        localStorage.save('todoList', this.state.todoList);
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
                <h1>我的代办：</h1>
                <div className="inputWrapper">
                    <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} onChange={this.changeTitle}/> 
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
            </div>
        );
    }
}

export default Todo;
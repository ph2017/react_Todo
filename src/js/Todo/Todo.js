import React from 'react';
import 'normalize.css';
import 'reset.css';
import '../../css/todo.css'
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';


class Todo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            todoList: [
                {id:1, title:'第1个代办任务'},
                {id:2, title:'第2个代办任务'}
            ],
            newTodo: ''
        }

        this.addTodo = this.addTodo.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
    }

    addTodo(event){
        let newTodoList = this.state.todoList;
        let curDate = new Date();
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

    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    render(){

        return (
            <div className="todoCt">
                <h1>我的代办：</h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} onChange={this.changeTitle}/> 
                <TodoItem todoList={this.state.todoList}/>
            </div>
        );
    }
}

export default Todo;
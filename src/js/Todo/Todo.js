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
    }

    addTodo(todo){
        // this.state.todoList.push({
        //     id: new Date().toTimeString,
        //     title: todo
        // })

        // this.setState({
        //     todoList
        // })

        console.log('我要添加一个todo了!!');
    }

    render(){

        return (
            <div className="todoCt">
                <h1>我的代办：</h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTodo}/> 
                <TodoItem todoList={this.state.todoList}/>
            </div>
        );
    }
}

export default Todo;
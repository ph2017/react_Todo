import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class Todo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            todoList: [{id:1, title:'第1个代办任务'}],
            newTodo: ''
        }
    }

    render(){

        return (
            <div>
                <h1>我的代办：</h1>
                <TodoInput content={this.state.newTodo}/> 
                <TodoItem todoList={this.state.todoList}/>
            </div>
        );
    }
}

export default Todo;
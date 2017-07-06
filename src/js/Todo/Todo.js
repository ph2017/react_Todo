import React from 'react';
import TodoInput from './TodoInput'

class Todo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            todoList: [{id:1, title:'第1个代办任务'}],
            newTodo: ''
        }
    }

    render(){
        let todos = this.state.todoList.map((element, idex)=>{
            return <li key={element.id}>{element.title}</li>
        })

        return (
            <div>
                <h1>我的代办：</h1>
                <TodoInput content={this.state.newTodo}/> 
                <ol>
                    {todos}
                </ol>
            </div>
        );
    }
}

export default Todo;
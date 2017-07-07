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
                {id:1, title:'第1个代办任务', status:'completed'},
                {id:2, title:'第2个代办任务', status:''}
            ],
            newTodo: ''
        }

        this.addTodo = this.addTodo.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
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

        let todos = this.state.todoList.map((element, idex)=>{
            return (
                <li key={element.id}>
                    <TodoItem todo={element} onToggle={this.changeStatus} onDelete={this.deleteTodo}/>
                </li>
            )
        })

        return (
            <div className="todoCt">
                <h1>我的代办：</h1>
                <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} onChange={this.changeTitle}/> 
                <ol>
                    {todos}
                </ol>
            </div>
        );
    }
}

export default Todo;
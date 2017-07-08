import React from 'react';
import '../../css/todoItem.css';

class TodoItem extends React.Component{

    constructor(props){
        super(props);

        this.changeStatus = this.changeStatus.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    changeStatus(e){
        this.props.onToggle(e, this.props.todo);
    }

    deleteTodo(e){
        this.props.onDelete(e, this.props.todo)
    }

    render(){
        return (
            <div className="ToDoItem">
                <input type="checkbox" value={this.props.todo.status || ''} checked={this.props.todo.status} onChange={this.changeStatus}/>
                <span className="todoTitle">{this.props.todo.title}</span>
                <button onClick={this.deleteTodo} disabled={this.props.todo.deleted}>删除</button>
            </div>
        )
    }
}
export default TodoItem
import React from 'react';
import '../../css/todoItem.css';

class TodoItem extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            status: this.props.todo.status
        }

        this.changeStatus = this.changeStatus.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    changeStatus(e){
        this.props.onToggle(e, this.props.todo);
    }

    deleteTodo(e){
        this.props.onDelete(e, this.props.todo)
    }

    //随着父组件传入的props更新state
    componentWillReceiveProps(){
        this.setState({
            status: this.props.todo.status
        })
    }

    render(){
        return (
            <div className="ToDoItem">
                <input type="checkbox" value={this.state.status} checked={this.state.status === 'completed'} onChange={this.changeStatus}/>
                <span className="todoTitle">{this.props.todo.title}</span>
                <button onClick={this.deleteTodo} disabled={this.props.todo.deleted}>删除</button>
            </div>
        )
    }
}
export default TodoItem
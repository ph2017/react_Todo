import React from 'react';

class TodoItem extends React.Component{

    constructor(props){
        super(props);

        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(e){
        this.props.onToggle(e, this.props.todo);
    }

    render(){
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status} onChange={this.changeStatus}/>
                {this.props.todo.title}
            </div>
        )
    }
}
export default TodoItem
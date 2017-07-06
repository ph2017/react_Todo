import React from 'react';

class TodoItem extends React.Component{

    render(){
        let todos = this.props.todoList.map((element, idex)=>{
            return <li key={element.id}>{element.title}</li>
        })
        
        return (
            <ol>
                {todos}
            </ol>
        )
    }
}
export default TodoItem
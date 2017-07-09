import React from 'react'
import {Panel} from 'react-bootstrap'
import '../../../css/todoItemBoot.scss'


class ToDoItemBoot extends React.Component {
    constructor(props){
        super(props)

        //优先级todo.pripority： 1：紧急 2：挺紧急 3：一般 4：已完成
        this.state = {
            todo: this.props.todo
        }
    }

    //根据优先级生成对应的class
    getPriorityClass(priority) {
        const priorityClass = {
            '1': 'danger',
            '2': 'warning',
            '3': 'info',
            '4': 'success',
        }

        return priorityClass[priority]
    }

    render() {
        return (
            <div className="col-sm-11 col-md-11 todoItemPanel"> 
                <Panel header={
                        <div className="todoTitle-ct"> 
                            <input type="checkbox" className="todoItemCheck" /> 
                            <span>Todo的标题</span>  
                        </div>
                    } bsStyle={this.getPriorityClass(this.state.todo.priority)}>

                    <p> 创建时间： {this.state.todo.updatedAt} </p>
                    {this.state.todo.completeDate ? <p> 完成时间： {this.state.todo.completeDate} </p> : null}

                    <ul className="function-group">
                        <li className="function-item"><i className="glyphicon glyphicon-pencil"></i></li>
                        <li className="function-item"><i className="glyphicon glyphicon-cog"></i></li>
                        <li className="function-item"><i className="glyphicon glyphicon-trash"></i></li>
                    </ul>
                </Panel>
            </div> 
        )
        
    }

}

export default ToDoItemBoot
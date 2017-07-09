import React from 'react'
import {Panel} from 'react-bootstrap'
import '../../../css/todoMainContainer.scss'
import ToDoItemBoot from './ToDoItemBoot'


class ToDoMainContainer extends React.Component{

    render(){
        return (
            <div className="col-sm-9 col-md-9 todoMainCt"> 
                <Panel header={'我是Panel的title' || this.props.title}>
                    <ToDoItemBoot todo={{title:'我是todo的title', priority:1, updatedAt:'2017-07-09 13:38:10'}}/>
                    <ToDoItemBoot todo={{title:'我是todo的title', priority:2, updatedAt:'2017-07-09 13:38:10'}}/>
                    <ToDoItemBoot todo={{title:'我是todo的title', priority:3, updatedAt:'2017-07-09 13:38:10'}}/>
                    <ToDoItemBoot todo={{title:'我是todo的title', priority:4, updatedAt:'2017-07-09 13:38:10'}}/>
                </Panel>
            </div> 
        )
    }
}

export default ToDoMainContainer
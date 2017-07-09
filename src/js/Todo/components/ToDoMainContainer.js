import React from 'react'
import {Panel} from 'react-bootstrap'
import '../../../css/todoMainContainer.scss'


class ToDoMainContainer extends React.Component{

    render(){
        return (
            <div className="col-sm-9 col-md-9 todoMainCt"> 
                <Panel header={'我是Panel的title' || this.props.title}>
                    Panel content
                </Panel>
            </div> 
        )
    }
}

export default ToDoMainContainer
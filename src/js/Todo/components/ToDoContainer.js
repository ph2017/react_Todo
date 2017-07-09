import React from 'react'
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
// import 'jquery'
import Sidebar from './Sidebar'
import ToDoMainContainer from './ToDoMainContainer'


class ToDoContainer extends React.Component{

    render(){
        return (
            <div className="container">
                <div className="row">
                    <Sidebar></Sidebar>
                    <ToDoMainContainer></ToDoMainContainer>
                </div>
            </div>
        )
    }
}

export default ToDoContainer
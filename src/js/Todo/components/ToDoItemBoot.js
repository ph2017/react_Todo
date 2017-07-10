import React from 'react'
import {Panel} from 'react-bootstrap'
import '../../../css/todoItemBoot.scss'
import MyUtil from '../Util'
// import EventHandler from '../EventHandler'


class ToDoItemBoot extends React.Component {
    constructor(props){
        super(props)

        //优先级todo.pripority： 1：紧急 2：挺紧急 3：一般 4：已完成
        this.state = {
            todo: this.props.todo,
            //是否显示优先级菜单，默认为false，表示不显示
            showPriporityMenu: false
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

    //修改优先级的方法
    onChangePriorty(event) {
        let target =  event.target
        let copyState = MyUtil().deepCopy(this.state)
        if(target.className.indexOf('childMenu-item') > -1 || target.className.indexOf('priority-color') > -1){
            //点击的是li 或 li里的 span
            copyState.todo.priority = target.value
        }
        //隐藏自己（子菜单）
        //event.currentTarget.remove('active')
        //更新showPriporityMenu的状态，可以设置优先级菜单是否显示
        copyState.showPriporityMenu = !copyState.showPriporityMenu
        this.setState(copyState)
        event.stopPropagation()
        console.log(target)
    }

    //点击设置优先级按钮的处理方法
    setPriorityOpProcess(event){
        let copyState = MyUtil().deepCopy(this.state)
        //更新showPriporityMenu的状态，可以设置优先级菜单是否显示
        copyState.showPriporityMenu = !copyState.showPriporityMenu
        this.setState(copyState)
    }

    //改变完成状态的处理方法
    changeCompleted(event) {
        let copyState = MyUtil().deepCopy(this.state)
        copyState.todo.status =  copyState.todo.status ? '':'completed'
        copyState.todo.priority = copyState.todo.status === '' ? '3':'4'
        this.setState(copyState)
    }

    render() {
        return (
            <div className="col-sm-11 col-md-11 todoItemPanel"> 
                <Panel header={
                        <div className="todoTitle-ct"> 
                            <input type="checkbox" className="todoItemCheck" checked={this.state.todo.priority === '4'} onChange={this.changeCompleted.bind(this)}/> 
                            <span>Todo的标题</span>  
                        </div>
                    } bsStyle={this.getPriorityClass(this.state.todo.priority)}>

                    <p className="text-ellipsis todoTime"> 创建时间： {this.state.todo.updatedAt} </p>
                    {this.state.todo.completeDate ? <p className="text-ellipsis todoTime"> 完成时间： {this.state.todo.completeDate} </p> : null}

                    <ul className="function-group">
                        {/*编辑*/}
                        <li className="function-item"><i className="glyphicon glyphicon-pencil"></i></li>
                        {/*优先级修改*/}
                        <li className="function-item" onClick={this.setPriorityOpProcess.bind(this)}> 
                            <i className="glyphicon glyphicon-cog"></i>
                            <ul className={ 'childMenu' + (this.state.showPriporityMenu ? ' active':'')} onClick={this.onChangePriorty.bind(this)}>
                                <li className="childMenu-item" value="1"><span className="priority-color" value="1"></span>紧急</li>
                                <li className="childMenu-item" value="2"><span className="priority-color" value="2"></span>挺紧急</li>
                                <li className="childMenu-item" value="3"><span className="priority-color" value="3"></span>一般</li>
                            </ul>
                        </li>
                        {/*删除*/}
                        <li className="function-item"><i className="glyphicon glyphicon-trash"></i></li>
                    </ul>

                </Panel>
            </div> 
        )
        
    }

}

export default ToDoItemBoot
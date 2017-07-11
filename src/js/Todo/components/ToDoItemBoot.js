import React from 'react'
import {Panel} from 'react-bootstrap'
import '../../../css/todoItemBoot.scss'
import MyUtils from '../Util'
// import EventHandler from '../EventHandler'


class ToDoItemBoot extends React.Component {
    // constructor(props){
    //     super(props)
        
    //     //优先级todo.pripority： 1：紧急 2：挺紧急 3：一般 4：已完成
    //     // this.state = {
    //     //     todo: this.props.todo,
    //     //     //是否显示优先级菜单，默认为false，表示不显示
    //     //     showPriporityMenu: false
    //     // }

    // }

    //根据优先级生成对应的class 1:紧急 2:挺紧急 3:一般 4:已完成
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
         //点击的是li 或 li里的 span
        if(target.className.indexOf('childMenu-item') > -1 || target.className.indexOf('priority-color') > -1){
           
            this.props.onPriortyChange.call(null, this.props.todo.id, target.value)

        }
        //传入''参数，表示不显示子菜单
        this.props.onPriorityMenuShow.call(null, '')
        event.stopPropagation()
    }

    //点击设置优先级按钮的处理方法(是否显示优先级子菜单)
    setPriorityOpProcess(event){
        this.props.onPriorityMenuShow.call(null, this.props.todo.id)
    }

    //改变完成状态的处理方法
    changeCompleted(event) {
        // let copyState = MyUtils.deepCopy(this.state)
        // copyState.todo.priority = copyState.todo.priority === '4' ? '3':'4'
        // this.setState(copyState)
    }

    render() {
        return (
            <div className="col-sm-12 col-md-12 todoItemPanel"> 
                <Panel header={
                        <div className="todoTitle-ct"> 
                            <input type="checkbox" className="todoItemCheck" checked={this.props.todo.priority === '4'} onChange={this.changeCompleted.bind(this)}/> 
                            <span>{ this.props.todo.title }</span>  
                        </div>
                    } bsStyle={this.getPriorityClass(this.props.todo.priority)}>

                    <p className="text-ellipsis todoTime"> 创建时间： {this.props.todo.updatedAt} </p>
                    {this.props.todo.completeDate ? <p className="text-ellipsis todoTime"> 完成时间： {this.props.todo.completeDate} </p> : null}

                    <ul className="function-group">
                        {/*编辑*/}
                        <li className="function-item"><i className="glyphicon glyphicon-pencil"></i></li>
                        {/*优先级修改*/}
                        <li className="function-item" onClick={this.setPriorityOpProcess.bind(this)}> 
                            <i className="glyphicon glyphicon-cog"></i>
                            {/*showPriporityMenu 是个todo的id，表示当前选中哪个todo的子菜单*/}
                            <ul className={ 'childMenu' + (this.props.todoPriorityMenu === this.props.todo.id? ' active':'')} onClick={this.onChangePriorty.bind(this)}>
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
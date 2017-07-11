import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, VisibilityFilter} from '../action/action'
import {Panel} from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import ToDoItemBoot from '../components/ToDoItemBoot'
import '../../../css/todoMainContainer.scss'

class TodoApp extends React.Component{

    render(){
        //通过react-redux的connect注入进来的props
        const {dispatch, visibileTodos, visibilityFilter} = this.props
        
        let TodoItems = visibileTodos.map(item => {
            return (
                <ToDoItemBoot todo={item}/>
            )
        })

        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar></Sidebar>
                    <div className="col-sm-9 col-md-9 col-xs-12 todoMainCt"> 
                        <Panel header={'我是Panel的title' || this.props.title}>
                            {TodoItems}
                        </Panel>
                    </div> 
                </div>
            </div>
        )
    }
}

TodoApp.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    pripority: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    '1',
    '2',
    '3',
    '4'
  ]).isRequired
}

/**
 * 过滤显示方法
 * @param {store的state中的todos} todos 
 * @param {store的state中的VisibilityFilter} filter 
 */
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilter.SHOW_ALL:
      return todos
    default:
     //根据todo.priority过滤
     return todos.filter(todo => todo.priority === filter)
  }
}

//return要注入到组件的props
const mapStateToProps = (state, ownProps) => {
  return {
    visibileTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// const mapDispatchToProps = (state, ownProps) => {
//     return {

//     }
// }

//通过connect方法注入mapStateToProps
export default connect(mapStateToProps)(TodoApp)



import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {addTodo, priorityTodo, todoPriorityMenuDisplay, mobileSideBarDisplay, setVisibilityFilter, ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, VisibilityFilter, queryTodos} from '../action/action'
import {Panel} from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import ToDoItemBoot from '../components/ToDoItemBoot'
import AddTodo from '../components/AddTodo'
import '../../../css/todoMainContainer.scss'

class TodoApp extends React.Component{

    componentDidMount(){
        const {dispatch} = this.props
        dispatch(queryTodos({}))
    }

    render(){
        //通过react-redux的connect注入进来的props
        const {dispatch, visibileTodos, visibilityFilter, todoPriorityMenu, isMobileSideBarDisplay } = this.props
        
        {/*todoPriorityMenu 表示当前显示优先级子菜单的todo的id*/}
        let TodoItems = visibileTodos.map(item => {
            return (  
                <ToDoItemBoot todo={item} todoPriorityMenu={todoPriorityMenu}
                    onPriortyChange={(id, priority) => 
                        dispatch(priorityTodo(id, priority)) 
                    
                    }
                    onPriorityMenuShow={(id) => 
                        dispatch(todoPriorityMenuDisplay(id))
                    } />
            )
        })

        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar mobileSideBarDisplay={isMobileSideBarDisplay} 
                        onDisplayToggle={(isMobileSideBarDisplay) => 
                            dispatch(mobileSideBarDisplay(isMobileSideBarDisplay))
                        }
                        onVisibilityFilterChange={(visibaleFilter) => 
                            dispatch(setVisibilityFilter(visibaleFilter))
                        }>
                    </Sidebar>
                    <div className="col-sm-9 col-md-9 col-xs-12 todoMainCt"> 
                        <Panel header={'我是Panel的title' || this.props.title}>
                            <AddTodo onSubmit={(todoObj) => 
                                dispatch(addTodo(todoObj))
                            } />
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
     //根据todo.priority过滤,把filter转换成数字再比较
     return todos.filter(todo => todo.priority === parseInt(filter) )
  }
}

//return要注入到组件的props
const mapStateToProps = (state, ownProps) => {
  return {
    //react-route会自动为组件注入match.params.filter，这个参数是在<Route path="/:filter">这里设置的
    visibileTodos: selectTodos(state.todos, ownProps.match.params.filter), //selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    todoPriorityMenu: state.todoPriorityMenu,
    isMobileSideBarDisplay: state.isMobileSideBarDisplay
  }
}

// const mapDispatchToProps = (state, ownProps) => {
//     return {

//     }
// }

//通过connect方法注入mapStateToProps
export default connect(mapStateToProps)(TodoApp)



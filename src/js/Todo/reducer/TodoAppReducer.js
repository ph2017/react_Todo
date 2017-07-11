import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, VisibilityFilter} from '../action/action'
const { SHOW_ALL } = VisibilityFilter

/**
 * 处理添加todo，删除todo，修改todo的reducer方法
 * @param {传入的是todoList的数组(这个reducer只处理state.todoList)} state 
 * @param {传入是action} action 
 */
 function todos(state = [], action){

    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    title: action.title,
                    priority: 3
                }
            ]

        case DELETE_TODO:
            //遍历todoList，返回objectId != action.id 的todo，则可以删除某个todo
            return [...state].filter((item) => {return item.objectId !== action.id})

        case PRIORITY_TODO:
            return [...state].map(
                (item, index) => {
                    if(item.objectId === action.id){
                        item.pripority = action.pripority
                    }

                    return item
                })
        
        default: 
            return state
    }
}

/**
 * 修改过滤显示filter的reducer
 * @param {传入store中的visibilityFilter作为参数(这个reducer只处理state.visibilityFilter)} state 
 * @param {传入action作为参数} action 
 */
function visibilityFilter(state=SHOW_ALL, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        
        default:
            return state
    }
}

//使用combineReducers合并所有reducer
const TodoAppReducer = combineReducers({
    todos,
    visibilityFilter
    //上面的写法等价于下面这种写法：
    //todos: todos(state.todos, action),
    //visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    // 每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理 ！！
    // 函数名改名真有技巧！！
})

export default TodoAppReducer
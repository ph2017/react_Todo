import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, SET_PRIORITY_MENU_DISPLAY, SET_MOBILE_SIDE_MENU_DISPLAY, VisibilityFilter, QUERY_REQUEST_POSTS, QUERY_RECEIVE_POSTS} from '../action/action'
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
                    id: action.id,
                    priority: 3
                }
            ]

        case DELETE_TODO:
            //遍历todoList，返回objectId != action.id 的todo，则可以删除某个todo
            return [...state].filter((item) => {return item.objectId !== action.id})

        case PRIORITY_TODO:
            return [...state].map(
                (item, index) => {
                    
                    if(item.objectId === action.id || item.id === action.id){
                        item.priority = action.priority
                    }

                    return item
                })
        
        //处理从云端查询到的todo数据，把todo数据放入state
        case QUERY_RECEIVE_POSTS: 
            return [...(action.result)]

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

/**
 * 
 * @param {传入store中的toDoPriorityMenu作为参数} state 
 * @param {传入action作为参数} action 
 */
function todoPriorityMenu(state='', action){
    switch(action.type){

        case SET_PRIORITY_MENU_DISPLAY: 
            if(state === ''){
                return action.id || ''
            }else if(state === action.id){
                //如果action.id与之前的相同，则返回’‘，表示不展示优先级菜单
                return ''
            }else {
                 //如果action.id与之前的不相同，则返回action.id，表示展示新选中的优先级菜单
                return action.id
            }
        
        default:
            return state
    }
}

/**
 * 
 * @param {传入store中的isMobileSideBarDisplay作为参数} state 
 * @param {传入action作为参数} action 
 */
function mobileSideBarDisplay(state=false, action){
    
    switch(action.type){
        case SET_MOBILE_SIDE_MENU_DISPLAY:
            return action.isDisplay

        default: 
            return state
    }
}
/**
 * 查询，添加，修改云端todo的处理方法
 * @param {处理state里的isQueringTodo, todos} state 
 * @param {传入action作为参数} action 
 */
function todoCloudOperation(state={
    isQueringTodo: false
}, action) {
    switch(action.type){
        
        case QUERY_REQUEST_POSTS:
            return Object.assign({}, state, {
                isQueringTodo: true
            })
        
        case QUERY_RECEIVE_POSTS:
            return Object.assign({}, state, {
                isQueringTodo: false
            })

        default: 
            return state
    }
}

//使用combineReducers合并所有reducer
const TodoAppReducer = combineReducers({
    todos,
    visibilityFilter,
    todoPriorityMenu,
    isMobileSideBarDisplay: mobileSideBarDisplay,
    isQueringTodo: todoCloudOperation,

    //上面的写法等价于下面这种写法：
    //todos: todos(state.todos, action),
    //visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    // 每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理 ！！
    // 函数名改名真有技巧！！
})

export default TodoAppReducer
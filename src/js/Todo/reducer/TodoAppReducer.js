import { combineReducers } from 'redux'
import { ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, 
            SET_PRIORITY_MENU_DISPLAY, SET_MOBILE_SIDE_MENU_DISPLAY, VisibilityFilter, 
            QUERY_REQUEST_POSTS, QUERY_RECEIVE_POSTS, SAVE_REQUEST_POSTS, SAVE_RECEIVE_POSTS,
            MODIFY_TODO, EDIT_TODO, SELECT_SIDE_BAR_ITEM} from '../action/action'
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

        case MODIFY_TODO: 
            return [...state].map(
                (item, index) => {
                    //更新state中的action.todoObj
                    if(item.objectId === action.todoObj.objectId){
                        for (let key in action.todoObj) {
                            if (action.todoObj.hasOwnProperty(key)) {
                                let val = action.todoObj[key];
                                item[key] = val
                            }
                        }
                    }
                    return item
                })

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
        
        //处理从云端查询到的todo数据，把todo数据放入state
        case SAVE_RECEIVE_POSTS: 
            return [...state].map(
                (item, index) => {
                    //把保存的todo的objectId字段更新
                    if(item.id === action.whichTodo.id){
                        item.objectId = action.result
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
 * 查询云端todo的处理方法,设置state.isQueringTodo
 * @param {处理state里的isQueringTodo} state 
 * @param {传入action作为参数} action 
 */
function queryCloudOperation(state=false, action) {
    switch(action.type){
        
        case QUERY_REQUEST_POSTS:
            return true
        
        case QUERY_RECEIVE_POSTS:
            return false

        default: 
            return state
    }
}

/**
 * 添加，修改 云端todo的处理方法,设置state.isSavingTodo
 * @param {处理state里的isQueringTodo, todos} state 
 * @param {传入action作为参数} action 
 */
function saveCloudOperation(state=false, action){
    switch(action.type) {
        case SAVE_REQUEST_POSTS:
            return false
        case SAVE_RECEIVE_POSTS:
            return false
        default:
            return state
    }
}

/**
 * 编辑中todo的处理方法
 * @param {正在编辑中的todo的objectId} state 
 * @param {*} action 
 */
function editingTodoId(state='', action){
    switch(action.type) {
        case EDIT_TODO:
            return action.id
        default: 
            return state
    }
}

/**
 * 处理侧边栏选中显示样式的方法
 * @param {选中的侧边栏item的序号sideBarItemIndex} state 
 * @param {*} action 
 */
function sideBarItemIndex(state=0, action){
    switch(action.type) {
        case SELECT_SIDE_BAR_ITEM:
            return action.index
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
    isQueringTodo: queryCloudOperation,
    isSavingTodo: saveCloudOperation,
    editingTodoId,
    sideBarItemIndex
    //上面的写法等价于下面这种写法：
    //todos: todos(state.todos, action),
    //visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    // 每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理 ！！
    // 函数名改名真有技巧！！
})

export default TodoAppReducer
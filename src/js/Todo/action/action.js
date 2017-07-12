/**
 * action 类型 
 * 定义所有应用中会出现的action
 * 
 */
import {queryTodoByCondition, saveTodo, updateTodo} from '../components/TodoAV'

export const ADD_TODO = 'ADD_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const PRIORITY_TODO = 'PRIORITY_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
//设置todo的优先级子菜单是否显示
export const SET_PRIORITY_MENU_DISPLAY = 'SET_PRIORITY_MENU_DISPLAY'
//设置移动端侧边栏是否显示
export const SET_MOBILE_SIDE_MENU_DISPLAY = 'SET_MOBILE_SIDE_MENU_DISPLAY'
//查询异步请求正在执行
export const QUERY_REQUEST_POSTS = 'QUERY_REQUEST_POSTS'
//查询异步请求结束
export const QUERY_RECEIVE_POSTS = 'QUERY_RECEIVE_POSTS'
//写数据异步请求正在执行
export const SAVE_REQUEST_POSTS = 'SAVE_REQUEST_POSTS'
//写数据异步请求结束
export const SAVE_RECEIVE_POSTS = 'SAVE_RECEIVE_POSTS'
//编辑中的todo
export const EDIT_TODO = 'EDIT_TODO'


/**
 * 其他常量
 */
export const VisibilityFilter = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_FILTER: 'SHOW_FILTER'
}

/**
 * action 创建函数
 */

export function addTodo(todoObj){
    return {type: ADD_TODO, title:todoObj.title, id:todoObj.id}
}

export function modifyTodo(todoObj){
    return {type: MODIFY_TODO, todoObj}
}

export function priorityTodo(id, priority) {
    return {type: PRIORITY_TODO, id, priority}
}

export function setVisibilityFilter(filter){
    return {type: SET_VISIBILITY_FILTER, filter}
}

export function deleteTodo(id){
    return {type: DELETE_TODO, id}
}

export function todoPriorityMenuDisplay(id){
    return {type: SET_PRIORITY_MENU_DISPLAY, id}
}

export function mobileSideBarDisplay(isDisplay) {
    return {type: SET_MOBILE_SIDE_MENU_DISPLAY, isDisplay}
}

function queryRequestPosts(condition) {
  return {
    type: QUERY_REQUEST_POSTS,
    condition
  }
}

function queryReceivePosts(todoArr) {
    return {
        type: QUERY_RECEIVE_POSTS,
        result: todoArr,
        receivedAt: Date.now()
    }
}

/**
 * 查询todo的action
 * @param {查询条件对象} condition 
 */
export function queryTodos(condition){
    return dispatch => {
        dispatch(queryRequestPosts(condition))
        
        //queryTodoByCondition执行完后，如果成功，则会返回Promise,带有todoArr参数
        return queryTodoByCondition(condition)
                        .then(todoArray => dispatch(queryReceivePosts(todoArray)))
    }
}

function saveRequestPosts(todo) {
  return {
    type: SAVE_REQUEST_POSTS,
    todo
  }
}

function saveReceivePosts(resultValue, localTodo) {
    return {
        type: SAVE_RECEIVE_POSTS,
        result: resultValue,
        whichTodo: localTodo,
        receivedAt: Date.now()
    }
}
/**
 * 保存todo的action
 * @param {要保存的todo对象} todos 
 */
export function saveTodoToCloud(todo){
    return dispatch => {
        dispatch(addTodo(todo))
        dispatch(saveRequestPosts(todo))
        
        //saveTodo执行完后，如果成功，则会返回Promise,带有objectId参数
        //传入todo，表示操作的是哪个todo
        return saveTodo(todo)
                        .then((returnVal) => dispatch(saveReceivePosts(returnVal.result, returnVal.whichTodo)))
    }
}


/**
 * 更新todo的action
 * @param {要更新的todo对象} id 
 */
export function updateTodoToCloud(todo){
    return dispatch => {
        dispatch(modifyTodo(todo))

        dispatch(saveRequestPosts(todo))
        
        //updateTodo执行完后，如果成功，则会返回Promise,带有objectId参数
        return updateTodo(todo)
                        .then(returnVal => dispatch(saveReceivePosts(returnVal.result, returnVal.whichTodo)))
    }
}

/**
 * 编辑todo的action，记录正在编辑的todo的objectId
 * @param {正在编辑的todo的objectId} id 
 */
export function editTodo(id){
    return {type: EDIT_TODO, id}
}
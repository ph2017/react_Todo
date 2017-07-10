/**
 * action 类型 
 * 定义所有应用中会出现的action
 * 
 */
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const PRIORITY_TODO = 'PRIORITY_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

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

export function addTodo(text){
    return {type: ADD_TODO, text}
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
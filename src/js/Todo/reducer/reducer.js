import {combineReducers} from 'react-redux'
import {ADD_TODO, DELETE_TODO, PRIORITY_TODO, SET_VISIBILITY_FILTER, VisibilityFilter} from '../action/action'
const {SHOW_ALL} = VisibilityFilter

/**
 * 处理添加todo，删除todo，修改todo的reducer方法
 * @param {传入的是todoList的数组} state 
 * @param {传入是action} action 
 */
export function todos(state = [], action){

    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    pripority: 3
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

    /**
     * 修改过滤显示filter的reducer
     * @param {传入store中的filter作为参数} state 
     * @param {传入action作为参数} action 
     */
    export function visibilityFilter(state=SHOW_ALL, action){
        switch(action.type){
            case SET_VISIBILITY_FILTER:
                return action.filter
        }
    }
}
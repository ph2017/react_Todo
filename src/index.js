import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Welcome from './Welcome';
// import Todo from './js/Todo/components/Todo';

// import ToDoContainer from './js/Todo/components/ToDoContainer'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import  TodoAppReducer  from './js/Todo/reducer/TodoAppReducer'
import TodoApp from './js/Todo/container/TodoApp'
import { addTodo, currentUserProcess } from './js/Todo/action/action'
import MyUtils from './js/Todo/Util'
import Root from './js/Todo/components/Root'
import {getCurrentUser} from './js/Todo/components/LeanCloud'
import './css/media.scss'


// ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render( < h1 > Hello, world! < /h1> , document.getElementById('root'));
        registerServiceWorker();*/

// ReactDOM.render( <Welcome name="react component!"/> , document.getElementById('root'));

// ReactDOM.render( <Todo /> , document.getElementById('root'));


//通过createStore，传入reducer参数，创建一个唯一的全局store
let store = createStore(TodoAppReducer,
        applyMiddleware(
                thunkMiddleware,
                createLogger
        )
)

//测试代码
// let unsubscribe = store.subscribe(() =>
//   console.log('监听store的state,当前state:',store.getState())
// )
// store.dispatch(addTodo({title:'测试1', id: MyUtils.getRandom(0, 99999) }))

//先获取上次登录的用户，注入state中，可避免每次都重新登录
let user = getCurrentUser()
store.dispatch(currentUserProcess(user))

/*ReactDOM.render(
         <Provider store={store}>
            <TodoApp/>
         </Provider>, 
        document.getElementById('root'));*/

ReactDOM.render(
         <Root store={store}/>,
        document.getElementById('root'));
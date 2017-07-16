import React, {PropTypes} from 'react'
import {Router, Route, Switch} from 'react-router'
import {Redirect, BrowserRouter} from 'react-router-dom'
import {Provider, connect} from 'react-redux'
import TodoApp from '../container/TodoApp'
import LoginContainer from '../container/LoginContainer'
// import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

const history = createHashHistory({
    //加入basename参数，可以使路由跳转时url自动加上basename前缀
    basename: '/react_Todo/build/index.html#'
})

const Root = ({store}) => {

    return(

        <Provider store={store}>
            
            <BrowserRouter history={history}
                basename="/react_Todo/build/index.html#">
                <Switch>
                    <Route path="/signin" component={LoginContainer} />
                    <Route path="/signup" component={LoginContainer} />
                    <Route path="/:filter" component={TodoApp} />
                </Switch>
        
            </BrowserRouter>
        </Provider>
)}

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

//return要注入到组件的props
const mapStateToProps = (state, ownProps) => {
  return {
    // user: state.userInfo.user ? state.userInfo.user : {}
  }
}

//通过connect方法注入mapStateToProps
export default connect(mapStateToProps)(Root)

// export default Root
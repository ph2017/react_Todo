import React, {PropTypes} from 'react'
import {Router, Route} from 'react-router'
import {Provider} from 'react-redux'
import TodoApp from '../container/TodoApp'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/:filter" component={TodoApp}></Route>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root
import React from 'react'
import '../../../css/loginContainer.scss'
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {signUpProcess, signInProcess} from '../action/action'
import Loading from '../components/Loading'

class LoginContainer extends React.Component {

    onSignIn(event) {
        event.preventDefault()
        event.stopPropagation()

        let target = event.target
        let userName = target.inputUserName.value
        let password = target.inputPassword.value
        const {dispatch, onSignIn} = this.props
        
        dispatch(onSignIn({
            'userName': userName,
            'password': password
        }))
    }

    onSignUp(event) {
        event.preventDefault()
        event.stopPropagation()

        const {dispatch, onSignUp} = this.props
        let target = event.target
        let userName = target.inputUserName2.value
        let password = target.inputPassword2.value
        let email = target.inputEmail2.value
        if(password.length < 6){
            alert('密码长度不小于6位')
            return false
        }
        
        debugger;

        dispatch(onSignUp({
            'userName': userName,
            'password': password,
            'email': email
        }))
        // signUp(userName, password, email, console.log, alert)
    }

    render(){
        const {user, isRequiringUser} = this.props

        const userId = user ? user.id : undefined

        let isSiginin = this.props.location.pathname === '/signin'
        let isSignup = this.props.location.pathname === '/signup'

        if(userId){
            return (
                <Redirect to={{
                    pathname: '/SHOW_ALL',
                    state: { from: this.props.location }
                }}/>
            )
        }

        

        return (

            <div className="container">
                
                <div className="from-ct">
                    <div className="todo-logo">
                        <img src="https://react-bootstrap.github.io/assets/logo.png" alt="todo"/>
                        <h1>Todo</h1>
                    </div>
                    <div className="signin-signup-ct">
                        <Link className={(isSiginin ? 'selected ': '') + "item"} to="/signin">登录</Link>
                        <Link className={(isSignup ? 'selected ': '') + "item"} to="/signup">注册</Link>
                        <span className="active-item-bar" data-active-index={isSiginin ? '0':'1' }></span>
                    </div>

                    {
                        isSiginin ? (
                             <form id="fromSignIn" className="form-signin" onSubmit={this.onSignIn.bind(this)}>
                                <label htmlFor="userName" className="sr-only">用户名</label>
                                <input type="text" id="inputUserName" name="userName" className="form-control" placeholder="用户名" required autoFocus/>
                                <label htmlFor="password" className="sr-only">密码</label>
                                <input type="password" id="inputPassword" name="passWord" className="form-control" placeholder="密码(不小于6位)" required/>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/> 记住我
                                    </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" >登录</button>
                            </form>
                        ): null
                    }
                   
                    {  
                        isSignup ? (
                            <form id="fromSignUp" className="form-signup" onSubmit={this.onSignUp.bind(this)}>
                                <label htmlFor="inputUserName" className="sr-only">用户名</label>
                                <input type="text" id="inputUserName2" name="userName2" className="form-control" placeholder="用户名" required autoFocus/>
                                <label htmlFor="inputEmail" className="sr-only">邮箱</label>
                                <input type="email" id="inputEmail2" name="email2" className="form-control" placeholder="邮箱" required/>
                                <label htmlFor="inputPassword" className="sr-only">密码</label>
                                <input type="password" id="inputPassword2" name="passWord2" className="form-control" placeholder="密码(不小于6位)" required/>
                            
                                <button className="btn btn-lg btn-primary btn-block" type="submit">注册</button>
                            </form>
                        ) : null
                    }
                    </div>

                    {isRequiringUser ? <Loading/> : null}
            </div> 
        )
    }
}

//return要注入到组件的props
const mapStateToProps = (state, ownProps) => {
  return {
    onSignUp: signUpProcess,
    onSignIn: signInProcess,
    user: state.userInfo.user,
    isRequiringUser: state.userInfo.isRequiringUser
  }
}

//通过connect方法注入mapStateToProps
export default connect(mapStateToProps)(LoginContainer)

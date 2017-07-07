import React, { Component } from 'react'
import '../../css/userDialog.css'
import {signUp, signIn, getErrorCodeMessage} from './LeanCloud'

export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp',
      formDate: {
          userName: '',
          passWord: ''
      }
    }
  }
  //切换 注册/登录 的处理方法
  switch(e){
    this.setState({
      selected: e.target.value
    })
  }

  //登录处理方法
  signIn(event){
    event.preventDefault();

    let {userName, passWord} = this.state.formDate

    let success = (user)=>{
        // console.log('用户登录成功！！')
        // console.log(user)
        this.props.onSignUpOrSignIn.call(null, user)
    }

    let error = (error)=>{
        console.log('用户登录失败！！')
        this.errorTip(error)
    }

    signIn(userName, passWord, success, error)

    console.log('我是登录')
  }

  //注册处理方法
  signUp(event){
    event.preventDefault();

    let {userName, passWord} = this.state.formDate

    let success = (user)=>{
        // console.log('用户注册成功！！')
        // console.log(user)
        this.props.onSignUpOrSignIn.call(null, user)
    }

    let error = (error)=>{
        console.log('用户注册失败！！')
        
        this.errorTip(error)
    }

    signUp(userName, passWord, success, error)

    console.log('我是注册')
  }

  //error提示方法
  errorTip(error){
      alert(getErrorCodeMessage(error.code))
  }

  //输入用户名更改时的处理方法
  changeFormData(key, event){
    let curState = JSON.parse(JSON.stringify(this.state))

    curState.formDate[key] = event.target.value

    // console.log(JSON.stringify(curState))

    this.setState(curState)
  }

  render(){
    let signUpFrom = (
        <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
            <div className="row">
                <label>用户名</label> 
                <input type="text" value={this.state.formDate.userName} onChange={this.changeFormData.bind(this, 'userName')}/>
                {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={this.state.formDate.passWord} onChange={this.changeFormData.bind(this, 'passWord')}/>
            </div>
            <div className="row actions">
                <button type="submit">注册</button>
            </div>
        </form>
    )
    let signInFrom = (
        <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
            <div className="row">
                <label>用户名</label>
                <input type="text" value={this.state.formDate.userName} onChange={this.changeFormData.bind(this, 'userName')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={this.state.formDate.passWord} onChange={this.changeFormData.bind(this, 'passWord')}/>
            </div>
            <div className="row actions">
                <button type="submit">登录</button>
            </div>
        </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav>
            <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.switch.bind(this)}/> 注册</label>
            <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.switch.bind(this)}/> 登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpFrom : null}
            {this.state.selected === 'signIn' ? signInFrom : null}
          </div>
        </div>
      </div>
    )
  }
}
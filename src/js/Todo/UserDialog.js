import React, { Component } from 'react';
import '../../css/userDialog.css'
export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp',
      formDate: {
          userName: '',
          password: ''
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
  signIn(e){
    e.preventDefault();
    console.log('我是登录')
  }

  //注册处理方法
  signUp(e){
    e.preventDefault();
    console.log('我是注册')
  }

  //输入用户名更改时的处理方法
  changeUserName(event){
    let curState = JSON.parse(JSON.stringify(this.state))

    curState.formDate.userName = event.target.value

    this.setState(curState)
  }

  //输入密码变更时的处理方法
  changePassword(event){
    let curState = JSON.parse(JSON.stringify(this.state))

    curState.formDate.password = event.target.value

    this.setState(curState)
  }

  render(){
    let signUpFrom = (
        <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
            <div className="row">
                <label>用户名</label> 
                <input type="text" onChange={this.changeUserName.bind(this)}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" onChange={this.changePassword.bind(this)}/>
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
                <input type="text" onChange={this.changeUserName.bind(this)}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" onChange={this.changePassword.bind(this)}/>
            </div>
            <div className="row actions">
                <button type="submit">登录</button>
            </div>
        </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange={this.switch.bind(this)}>
            <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'}/> 注册</label>
            <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'}/> 登录</label>
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
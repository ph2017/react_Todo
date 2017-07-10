import React from 'react'
// import {Navbar, NavItem, Brand, Header, NavDropdown,MenuItem,Nav } from 'react-bootstrap'
import '../../../css/sideBar.scss'
// import '../../../imgs/menu.png'
import MyUtil from '../Util'


class Sidebar extends React.Component{

    constructor(props){
      super(props)

      this.state = {
        //表示移动端侧边栏的显示状态，默认是false，表示不显示
        showMobileSideBar: false
      }
    }

    //显示/隐藏移动端侧边栏的方法
    toggleMobileBar(){
      let copyState = MyUtil().deepCopy(this.state)
      copyState.showMobileSideBar = !copyState.showMobileSideBar
      this.setState(copyState)
    }

    render(){
        return (

          <div>
            <div className="mobile-bar" >
              <a href="#mobilr-bar" className="mobile-bar-toggle" onClick={this.toggleMobileBar.bind(this)}>
                <i className="glyphicon glyphicon-th-large"></i>
              </a>
              <span className="mobile-bar-item">Todo</span> 
            </div>

            <div className={'col-sm-3 col-md-3 col-xs-6 sidebar ' + (this.state.showMobileSideBar? 'active':'')}>
            
              <div className="row">
                  <div className="col-sm-10 col-md-9 col-xs-10 user-avatar">
                    <img src='https://avatars2.githubusercontent.com/u/28702748?v=3&s=40'/>
                     <span className="user-name">{'Hello,' + (this.props.user || '')}</span>
                  </div> 
              </div>

              <ul className="list-group sidebar-item-group" onClick={this.toggleMobileBar.bind(this)}>
                <li className="list-group-item list-group-item-primary sidebar-item"><a href="#allTodo">全部</a></li>
                <li className="list-group-item list-group-item-danger sidebar-item"><a href="#dangerTodo">紧急</a></li>
                <li className="list-group-item list-group-item-warning sidebar-item"><a href="#warnTodo">也挺紧急</a></li>
                <li className="list-group-item list-group-item-info sidebar-item"><a href="#infoTodo">一般</a></li>
                <li className="list-group-item list-group-item-success sidebar-item"><a href="#completeTodo">已完成</a></li>
              </ul>
            </div>
          </div>
        )
    }
}

export default Sidebar
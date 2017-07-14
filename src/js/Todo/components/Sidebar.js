import React from 'react'
import { Link } from 'react-router-dom'
import '../../../css/sideBar.scss'
// import '../../../imgs/menu.png'


class Sidebar extends React.Component{


    //显示/隐藏移动端侧边栏的方法
    toggleMobileBar(){
      this.props.onDisplayToggle.call(null, !this.props.mobileSideBarDisplay)
    }

    //切换todo过滤条件的方法
    visibilityChange(event) {
      let target = event.target
      if(target.className.indexOf('childMenu-item') > -1 || target.className.indexOf('priority-color') > -1){
           
            this.props.onPriortyChange.call(null, this.props.todo.id, target.value)

        }
      this.props.onVisibilityFilterChange.call(null, )
    }

    handleSelectSideBarItem(event) {
      this.props.onDisplayToggle.call(null, !this.props.mobileSideBarDisplay)
    }

    //登出处理方法
    signOut(event) {
      this.props.onSignOut.call(null, undefined)
    }

    render(){
        let sideItemArr = [
          {to: '/SHOW_ALL', chName: '全部', class:'list-group-item sidebar-item'},
          {to: '/1', chName: '紧急', class:'list-group-item list-group-item-danger sidebar-item'},
          {to: '/2', chName: '也挺紧急', class:'list-group-item list-group-item-warning sidebar-item'},
          {to: '/3', chName: '一般', class:'list-group-item list-group-item-info sidebar-item'},
          {to: '/4', chName: '已完成', class:'list-group-item list-group-item-success sidebar-item'}   
        ]
   
        const sideBarItems = sideItemArr.map(item => {
              return (
                  <Link className={(this.props.selecedtSideBarItem === item.to.substr(1) ? 'selected ' : '') + item.class} to={item.to}>
                    {item.chName}
                  </Link>
              )
          })
          

        return (

          <div>
            <div className="mobile-bar" >
              <a href="#mobilr-bar" className="mobile-bar-toggle" onClick={this.toggleMobileBar.bind(this)}>
                <i className="glyphicon glyphicon-th-large"></i>
              </a>
              <span className="mobile-bar-item">Todo</span> 
            </div>

            <div className={'col-sm-3 col-md-3 col-xs-6 sidebar ' + (this.props.mobileSideBarDisplay ? 'active':'')}>
            
              <div className="row">
                  <div className="col-sm-10 col-md-9 col-xs-10 user-avatar">
                    <img src='https://avatars2.githubusercontent.com/u/28702748?v=3&s=40' alt="user.avatar"/>
                     <span className="user-name">{'Hello, ' + (this.props.user ? this.props.user.username : '')}</span>
                  </div> 
                  <div className="col-sm-10 col-md-9 col-xs-10 op-icon">
                     <span onClick={this.signOut.bind(this)}><i className="glyphicon glyphicon-log-out"></i>退出</span>
                  </div>
              </div>

              <nav className="list-group sidebar-item-group" onClick={this.handleSelectSideBarItem.bind(this)}>                
                {sideBarItems}
              </nav>
            </div>
          </div>
        )
    }
}

export default Sidebar
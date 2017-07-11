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

    render(){
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
                     <span className="user-name">{'Hello,' + (this.props.user || '')}</span>
                  </div> 
              </div>

              <ul className="list-group sidebar-item-group">
                
                <li className="list-group-item list-group-item-primary sidebar-item">
                  {/*<a href="#SHOW_ALL">全部</a>*/}
                  <Link to="/SHOW_ALL">全部</Link>
                </li>
                <li className="list-group-item list-group-item-danger sidebar-item"><Link to="/1">紧急</Link></li>
                <li className="list-group-item list-group-item-warning sidebar-item"><Link to="/2">也挺紧急</Link></li>
                <li className="list-group-item list-group-item-info sidebar-item"><Link to="/3">一般</Link></li>
                <li className="list-group-item list-group-item-success sidebar-item"><Link to="/4">已完成</Link></li>
              </ul>
            </div>
          </div>
        )
    }
}

export default Sidebar
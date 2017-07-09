import React from 'react'
// import {Navbar, NavItem, Brand, Header, NavDropdown,MenuItem,Nav } from 'react-bootstrap'
import '../../../css/sideBar.scss'

class Sidebar extends React.Component{

    render(){
        return (
            /*<div className="col-sm-3 col-md-2 sidebar">
                <ul className="sidebar-item-ct">
                    <li className="sidebar-item"><a href="#jinji">紧急</a></li>
                    <li className="sidebar-item"><a href="#tingjinji">也挺急</a></li>
                    <li className="sidebar-item"><a href="#normal">一般</a></li>
                    <li className="sidebar-item"><a href="#">可不做</a></li>
                </ul>
            </div>*/
            <div className="col-sm-3 col-md-3 sidebar">
            
              <div className="row">
                  <div className="col-sm-10 col-md-9 user-avatar">
                    <img src='https://avatars2.githubusercontent.com/u/28702748?v=3&s=40'/>
                     <span className="user-name">{'Hello,' + (this.props.user || '')}</span>
                  </div> 
                 
              </div>

              <ul className="list-group sidebar-item-group">
                <li className="list-group-item list-group-item-danger sidebar-item"><a href="#jinji">紧急</a></li>
                <li className="list-group-item list-group-item-warning sidebar-item"><a href="#jinji">也挺紧急</a></li>
                <li className="list-group-item list-group-item-info sidebar-item"><a href="#jinji">一般</a></li>
                <li className="list-group-item list-group-item-success sidebar-item"><a href="#jinji">已完成</a></li>
              </ul>
            </div>
            
            /*<Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">React-Bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="#">Link</NavItem>
                  <NavItem eventKey={2} href="#">Link</NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">Link Right</NavItem>
                  <NavItem eventKey={2} href="#">Link Right</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>*/

        )
    }
}

export default Sidebar
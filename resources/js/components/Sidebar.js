import React from 'react'
import {NavLink} from "react-router-dom";
import "../index.css"
import {CDBSidebarHeader, CDBSidebarMenuItem} from "cdbreact";

export default function Sidebar() {
    return (
        <sidebar>
            <div className="offcanvas offcanvas-start sidebar sidebar-content" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" >
                <div className="offcanvas-header" prefix={<i className="fa fa-bars fa-large"></i>}>
                    <NavLink  className="sidebar_li" to="/#"  activeClassName="activeClicked">
                        <li  className="sidebar_li">
                            Sidebar
                        </li>
                    </NavLink>
                    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Закрыть"></button>
                </div>
                <div className="offcanvas-body  nav" >
                    <ul className="sidebar_ul">

                        <NavLink  className="sidebar_li" to="/videoCard"  activeClassName="activeClicked">
                            <li className="nav-item">Video Card</li>
                        </NavLink>
                        <NavLink className="sidebar_li" exact to="/monitor" activeClassName="activeClicked">
                            <li className="nav-item">Monitor</li>
                        </NavLink>
                        <NavLink className="sidebar_li" exact to="/processor" activeClassName="activeClicked">
                            <li className="nav-item">Processor</li>
                        </NavLink>
                        <NavLink className="sidebar_li" exact to="/motherboard" activeClassName="activeClicked">
                            <li className="nav-item">Motherboard</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </sidebar>
    )
}

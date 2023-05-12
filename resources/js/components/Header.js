import React, {useState} from 'react'
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Nav } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

export default function Header() {
    const [device,setDevice]=useState('');
    const navigate=useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    let count = JSON.parse(localStorage.getItem('count'));
    function basket_nav(){
        window.location.replace("/basket");
    }
    function navigate_login(){
        window.location.replace("/login");
    }
    function navigate_register(){
        window.location.replace("/register");
    }
    function clear(){
        localStorage.clear()
        window.location.replace('/');
    }
    function searchDevice(){
        window.location.replace("/search/"+device);
    }
    console.log(device);
    return (
        <header>
            <div className='sidebar'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                        <button className="btn btn-dark block border rounded" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                            Categories
                        </button>

                    <div className="container-fluid">

                        <a className="navbar-brand" href="/">E-Shop</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className=" collapse navbar-collapse" id="navbarTogglerDemo03">

                            <form className="d-flex input-group w-50">
                                <input onChange={(e)=>setDevice(e.target.value)} type="search" className="form-control" placeholder="Search" aria-label="Search" />
                                <button onClick={searchDevice} className="btn btn-outline-light" type="button" data-mdb-ripple-color="light" >
                                    Search
                                </button>
                            </form>

                            <Nav className="me-auto navbar_warapper block">
                                {
                                    localStorage.getItem('user-info') ?
                                        <>
                                            <button className="btn btn-dark block border rounded" type="button" >Hello {user.name}!</button>
                                            <button onClick={basket_nav} className="btn btn-dark block border rounded"> Basked {count}</button>
                                            <button onClick={clear} className="btn btn-dark block border rounded" type="button" >Exit</button>
                                        </>
                                        :
                                        <>
                                            <button onClick={navigate_login} className="btn btn-dark block border rounded" type="button" >Login</button>
                                            <button onClick={navigate_register} className="btn btn-dark block border rounded" type="button" >Register</button>
                                        </>
                                }
                                {
                                    localStorage.getItem('admin') ?
                                    <>

                                        <div className="dropdown">
                                            <a className="btn btn-dark block border rounded dropdown-toggle" href="#" role="button"
                                               id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                Admin menu
                                            </a>

                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <li><a className="dropdown-item" href="/Product">Product</a></li>
                                                <li><a className="dropdown-item" href="/Users">User</a></li>
                                                <li><a className="dropdown-item" href="/orderList">Order List</a></li>
                                            </ul>
                                        </div>
                                    </>
                                    :
                                    <>

                                    </>
                                }
                            </Nav>

                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}

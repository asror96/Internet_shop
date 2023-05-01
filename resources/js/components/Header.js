import React from 'react'
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Register from "./Register";

export default function Header() {
    const navigate=useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    function clear(){
        localStorage.clear()
        navigate('/')
    }
    function navigate_addProduct(){
        navigate('/addProduct')
    }
    function navigate_updateProduct(){
        navigate('/updateProduct')
    }
    function navigate_login(){
        navigate('/login')
    }
    function navigate_register(){
        navigate('/register')
    }
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
                                <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-light" type="button" data-mdb-ripple-color="light" >
                                    Search
                                </button>
                            </form>

                            <Nav className="me-auto navbar_warapper block">
                                {
                                    localStorage.getItem('user-info') ?
                                        <>
                                            <button className="btn btn-dark block border rounded" type="button" >Hello {user.name}!</button>
                                            <Link to="/register" className="block border rounded"> Basked </Link>
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
                                                <li><a className="dropdown-item" href="/addProduct">Add product</a></li>
                                                <li><a className="dropdown-item" href="/updateProduct">Update product</a></li>
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

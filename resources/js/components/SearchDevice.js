import React, {useEffect, useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {Nav, Table} from "react-bootstrap";
import {toString} from "lodash";

export default function SearchDevice() {
    const device=useParams().device;
    const [data,setData]=useState([])

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

    useEffect(()=>{
        search(device);

    },[]);


    function search(key){
        axios.get('http://localhost:8000/api/search/'+key)
            .then((response) => {
                setData(response.data)
                console.log(response)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }
    function searchDevice(){
        window.location.replace("/search/"+device);
    }


    function handleClick(item) {
        if(localStorage.getItem('user-info')==null){
            window.location.replace("/login");
        }
        else {
            const user=JSON.parse(localStorage.getItem('user-info'));
            const postData = JSON.stringify({
                "id":item,
                "email":user.email
            });
            console.log(postData);
            let axiosConfig = {
                headers: {
                    "Content-Type": "application/json;",
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.post('http://localhost:8000/api/addDeviceBasket',postData,axiosConfig)
                .then((response) => {
                    console.log(response);
                    let count=toString( parseInt(localStorage.getItem('count'))+1);

                    localStorage.removeItem('count');
                    localStorage.setItem('count', count);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    }
    return (

        <div>
            <Sidebar/>
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
                                <input defaultValue={device} onChange={(e)=>search(e.target.value)}
                                       type="search" className="form-control" placeholder="Search" aria-label="Search" />
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
            <h1>Search Device</h1>
            <Table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Price </th>
                        <th> Description </th>
                        <th> Image </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((item)=>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td><img  src={'http://localhost:8000/storage/'+item.image_path} className="product_list_photo" /></td>
                            <td> <button onClick={()=>handleClick(item.id)} className="btn btn-success"> Add basked </button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Footer/>
        </div>
    )
}

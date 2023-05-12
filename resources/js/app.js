import AdminOrderList from "./components/AdminOrderList";

require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Routes} from "react-router-dom";
import Home from './components/Home';
import Test from './components/Test';
import VideoCard from './components/VideoCard';
import Register from './components/Register';
import Login from './components/Login';
import Product from './components/Product';
import Basket from "./components/Basket";
import UpdateDevice from "./components/UpdateDevice";
import UserList from "./components/UserList";
import SearchDevice from "./components/SearchDevice";
ReactDOM.render(
    <div className="wrapper">
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/test" element={<Test/>} />
                <Route exact path="/videoCard" element={<VideoCard/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/Product" element={<Product/>}/>
                <Route exact path="/basket" element={<Basket/>}/>
                <Route exact path="/orderList" element={<AdminOrderList/>}/>
                <Route exact path="/Update/:id" element={<UpdateDevice/>}/>
                <Route exact path="/Users" element={<UserList/>} />
                <Route exact path="/search/:device" element={<SearchDevice/>} />
            </Routes>
        </Router>
    </div>,
document.querySelector('#root')
);

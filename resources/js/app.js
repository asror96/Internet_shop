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
import AddProduct from './components/AddProduct';
ReactDOM.render(
    <div className="wrapper">
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/test" element={<Test/>} />
                <Route exact path="/videoCard" element={<VideoCard/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/addProduct" element={<AddProduct/>}/>
            </Routes>
        </Router>
    </div>,
document.querySelector('#root')
);

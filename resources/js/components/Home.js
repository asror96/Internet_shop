import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"

  import { NavLink } from 'react-router-dom';
import Sidebar from "./Sidebar";

export default function Home() {
  return (

    <div>
        <Sidebar/>
        <Header/>
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <div className='presentation'>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

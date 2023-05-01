import  React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import "../index.css"
import Footer from "./Footer";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
import Sidebar from "./Sidebar";

export default function Register() {
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/')
        }
    },[])

    async function signUp(){
        let item={name,password,email}
        console.warn(item)
        let result=await fetch("http://localhost:8000/api/register",{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            },
            body:JSON.stringify(item)
        })
        localStorage.setItem("user-info",JSON.stringify(result))
        console.warn(result,result)
        navigate('/')
    }

  return (
    <div>
        <Sidebar/>
       <Header/>
            <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <div className="col-sm-6 offset-sm-3">
                <h1 className='text_center'>Register</h1>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="name"/>
                <br/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
                <br/>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="email"/>
                <br/>
                <button onClick={signUp} className="btn btn-dark btn_center">Sign up</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

import Header from './Header';
import {useNavigate} from 'react-router-dom';
import "../index.css";
import Footer from "./Footer";
import  React,{useState,useEffect} from 'react';

  import { NavLink } from 'react-router-dom';
import Sidebar from "./Sidebar";

export default function Login() {
    let user=JSON.parse(localStorage.getItem('user-info'))
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/')
        }
    },[]);
    async function login()
    {
        let item={email,password}
        let result=await fetch("http://localhost:8000/api/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result=await result.json();
        if(result[0]==="Error email or password can`t found!"){
            navigate('/register')
            return;
        }

        localStorage.setItem("user-info",JSON.stringify(result))
        result=JSON.stringify(result.role)
        if(result){
            localStorage.setItem("admin",true)
        }
        else{
            localStorage.setItem("admin","")
        }
        navigate("/")
    }
  return (

    <div>
        <Sidebar/>
        <Header/>
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <div className='col-sm-6 offset-sm-3 text-center'>
                <h1 className='text_center'>Login</h1>
                <input type='text' placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='form-control'/>
                <br/>
                <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='form-control'/>
                <br/>
                <button onClick={login} className='btn btn-dark btn_center'>Login</button>
            </div>
        </div>
        <Footer/>
        </div>
  )
}

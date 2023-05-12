import React, {useEffect, useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"


import Sidebar from "./Sidebar";
import ItemCard from "./Itemcard";
import Axios from "axios";
import {useNavigate} from "react-router-dom";


export default function videoCard() {
    const [data,setData]=useState([])

    useEffect(async ()=>{
        const postData = JSON.stringify({'type':'Video Card'});
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            }
        };
         axios.post('http://localhost:8000/api/getItems',postData,axiosConfig)
             .then((response) => {
                setData(response.data);
                console.log(response.data)
             })
             .catch((err) => {
                 console.log("AXIOS ERROR: ", err);
             })

    },[]);

  return (
    <div>
        <Sidebar/>
        <Header/>
        <>
            <h1 className='text-center mt-3'>
                <section className='py-4 container'>
                    <div className='row justify-content-sm-left'>
                        {
                            data.map((item,index)=>{
                                return(
                                    <ItemCard id={item.id} img={item.image_path} title={item.name} description={item.description} price={item.price} />
                                )})
                        }
                    </div>

                </section>
            </h1>
        </>


        <Footer/>
    </div>
  )
}

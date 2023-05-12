import React, {useEffect, useState} from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import {Table} from "react-bootstrap";
import Axios from "axios";
import button from "bootstrap/js/src/button";

export default function AdminOrderList() {
    const [order,setOrder]=useState([]);
    useEffect(()=>{

        getOrder();
    },[]);
    async function getOrder(){
        await Axios.get("http://localhost:8000/api/getAllOrders", {
            headers:{
                'content-type': 'application/json'
            }
        })
            .then((response)=>{

                setOrder( response.data);
                console.log("response",response);

            })
            .catch((e)=>{
                console.error("Failure",e);

            });
    }

    let orders = order.map(function(item) {
        return <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.user_info.name}</td>
            <td>{item.user_info.email}</td>
            <td>{item.telephone}</td>
            <td>{item.address}</td>
            <td>{item.device_info.id}</td>
            <td>{item.device_info.name}</td>
            <td>{item.count}</td>
            <td>{parseInt(item.device_info.price)*parseInt(item.count)}</td>
            <td><button onClick={()=>deleteOrder(item.id)}  type="button" className="btn btn-danger">Cancellations</button></td>
        </tr>;

    });
    function deleteOrder(id){

        let order={
            "id": id
        }

        console.log('request',order)
        Axios.post("http://localhost:8000/api/deleteOrder", order,{
            headers:{
                'content-type': 'application/json'
            }
        })
            .then((response)=>{
                console.log("response",response);

            })
            .catch((e)=>{
                console.error("Failure",e);

            });
        getOrder();
    }

    return (
        <div>
            <Sidebar/>
            <Header/>
                <h1>Admin order list!</h1>
            <Table>
                <thead>
                <tr>
                    <th>Order id</th>
                    <th>User name</th>
                    <th>User email</th>
                    <th>User telephone number</th>
                    <th>User address</th>
                    <th>Device id</th>
                    <th>Device name</th>
                    <th>Device count</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders
                }
                </tbody>
            </Table>
            <Footer/>

        </div>
    )
}

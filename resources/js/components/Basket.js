import React, {useEffect, useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import Sidebar from "./Sidebar";
import {Table} from "react-bootstrap";
import Axios from "axios";
import button from "bootstrap/js/src/button";
import {json} from "react-router-dom";

export default function Basket() {
    const [address,setAddress]=useState(null);
    const [number,setNumber]=useState(null);
    const [data,setData]=useState([]);
    const [order,setOrder]=useState([]);
    useEffect(()=>{
        getData();
        getOrder();
    },[]);
    function buy(){
        let user_info=JSON.parse(localStorage.getItem('user-info'));
        let count=parseInt(localStorage.getItem('count'));
        if(count>0){
            if(address==null||number==null){
                alert('Fill in all fields');
            }
            else {
                let request={
                    "email":user_info.email,
                    "telephone":number,
                    "address":address
                };

               Axios.post("http://localhost:8000/api/addOrder", request,{
                    headers:{
                        'content-type': 'application/json'
                    }
                })
                    .then((response)=>{

                        localStorage.removeItem("count");
                        localStorage.setItem('count','0');
                        console.log("response",response);

                    })
                    .catch((e)=>{
                        console.error("Failure",e);
                        console.log("request",request);

                    });

                window.location.replace('/basket');

            }
        }
        else {
            alert('Basket is empty!')
        }
    }
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
    function deleteOperationOne(id){
        let user_info=JSON.parse(localStorage.getItem('user-info'));

        Axios.post("http://localhost:8000/api/deleteInBasketOne", {
            "email":user_info.email,
            "id":id
        },{
            headers:{
                'content-type': 'application/json'
            }
        })
            .then((response)=>{

                localStorage.removeItem("count");
                localStorage.setItem('count',response.data);
                console.log("response",response);

            })
            .catch((e)=>{
                console.error("Failure",e);

            });
        let count=parseInt(localStorage.getItem('count'))-1;
        localStorage.setItem('count',count.toString());
        getData();
    }




    async function getData(){
             let user_info=JSON.parse(localStorage.getItem('user-info'));

            await Axios.post("http://localhost:8000/api/getBasketDevice", {
            "email":user_info.email
             },{
            headers:{
                'content-type': 'application/json'
            }
             })
            .then((response)=>{

                setData( response.data);
                //console.log("response",response.data);

            })
            .catch((e)=>{
                console.error("Failure",e);

            });
    }
    async function getOrder(){
        let user_info=JSON.parse(localStorage.getItem('user-info'));

        await Axios.post("http://localhost:8000/api/getOrders", {
            "email":user_info.email
        },{
            headers:{
                'content-type': 'application/json'
            }
        })
            .then((response)=>{

                setOrder( response.data);
               // console.log("response",response);

            })
            .catch((e)=>{
                console.error("Failure",e);

            });
    }
   // console.log('Orders',order);
    //console.log('data',data);
    let orders = order.map(function(item) {
        return <tr key={item.id}>
            <td>{item.device_info.name}</td>
            <td>{item.address}</td>
            <td>{item.telephone}</td>
            <td>{item.count}</td>
            <td>{parseInt(item.device_info.price)*parseInt(item.count)}</td>
            <td><button onClick={()=>deleteOrder(item.id)} type="button" className="btn btn-danger">Cancellations</button></td>
        </tr>;

    });
    let res = data.map(function(item) {
        return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td><img  src={'http://localhost:8000/storage/'+item.image_path} className="product_list_photo" /></td>
            <td>{item.count}</td>
            <td><button onClick={()=>deleteOperationOne(item.id)} type="button" className="btn btn-danger">Delete</button></td>
        </tr>;

    });
    return (

        <div>
            <Sidebar/>
            <Header/>
            <h1>Basket</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Photo</th>
                        <th>Count</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {res}

                    </tbody>


                </Table>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Tomsk city</span>
                <input type="text" className="form-control" placeholder="Adress" aria-label="Number" aria-describedby="basic-addon1" onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">+7</span>
                <input type="tel"  className="form-control" placeholder="Number" aria-label="Number" aria-describedby="basic-addon1" onChange={(e)=>setNumber(e.target.value)} />
            </div>
            <div className="but">
                <button onClick={buy} type="button" className="btn btn-success">Buy</button>
            </div>


            <h1>Order list</h1>
            <Table>
                <thead>
                <tr>
                    <th>Device name</th>
                    <th>Delivery address</th>
                    <th>Telephone number</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {orders}
                </tbody>

            </Table>
            <Footer/>
        </div>
    )
};

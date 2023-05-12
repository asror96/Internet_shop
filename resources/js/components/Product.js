import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"

import Sidebar from "./Sidebar";
import {Table} from "react-bootstrap";
import button from "bootstrap/js/src/button";

export default function Product() {
    const [name,setName]=useState(null);
    const [typeName,setType]=useState('');
    const [file,setFile]=useState(null);
    const [price,setPrice]=useState(null);
    const [brandName,setBrand]=useState('');
    const [description,setDescription]=useState(null);
    const [types,setTypes]=useState([]);
    const [brands,setBrands]=useState([]);

    const [devices,setDevices]=useState([]);

    const options = types.map((text, index) => {
        return <option key={index} value={text}>{text}</option>;
    });
    const options1 = brands.map((text, index) => {
        return <option key={index} value={text}>{text}</option>;
    });
    useEffect(()=>{
        getTypeBrand();
        getdevices();

    },[]);
    function getdevices() {
        axios.get('http://localhost:8000/api/getAllDevices')
        .then((response) => {
            setDevices(response.data);
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    }

const addProd=(e)=>{
    e.preventDefault();
    const fData=new FormData();
    fData.append('file',file);
    fData.append('name',name);
    fData.append('price',price);
    fData.append('typeName',typeName);
    fData.append('brandName',brandName);
    fData.append('description',description);

    Axios.post("http://localhost:8000/api/addItem",fData,{
        headers:{
            'content-type': 'application/json'
        }
    })
    .then((res)=>{
        console.log("response",res)
    })
    .catch((e)=>{
        console.error("Failure",e);
        console.warn('typeName ',typeName);
    })
    alert('Products is add!')
    getdevices();

}
function getTypeBrand(){
    axios.get('http://localhost:8000/api/getTypesBrands')
    .then((response) => {
        setTypes(response.data[0]);
        setBrands(response.data[1]);
    })
    .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })
}
function deleteDevice(id){
    Axios.delete("http://localhost:8000/api/deleteDevices/"+id,{
        headers:{
            'content-type': 'application/json'
        }
    })
        .then((response)=>{
            console.log("response",response)
        })
        .catch((e)=>{
            console.error("Failure",e);
        })
    getdevices();
}
function editDevice($id){
    window.location.replace('/update/'+$id);
}
console.log('devices',devices)
let device = devices.map(function(item) {
    return <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.description}</td>
        <td><img  src={'http://localhost:8000/storage/'+item.image_path} className="product_list_photo" /></td>
        <td>
            <button onClick={()=>editDevice(item.id)} type="button" className="btn btn-warning">Edit</button>
            <button onClick={()=>deleteDevice(item.id)} type="button" className="btn btn-danger">Delete</button>
        </td>
    </tr>;

});

function chose(props){
}
  return (

    <div>
        <Sidebar/>
        <Header/>
            <div style={{ display: 'flex', height: '70vh', overflow: 'scroll initial' }}>


            <div className='text-center super_center'>


                    <br/>
                    <input type='text' className="form-control"
                    onChange={(e)=>setName(e.target.value)}
                    placeholder='Name'/><br/>
                    <input type='text'
                    onChange={(e)=>setPrice(e.target.value)}
                    className="form-control" placeholder='price'/><br/>
                    <input type="file"
                    onChange={(e)=>setFile(e.target.files[0])}
                    className="form-control" placeholder='file'/><br/>

                    <select  className="form-select s-1" aria-label="Default select example" onChange={(event) => setType(event.target.value)}>
                        <option  selected disabled hidden>Choose here</option>
                        {options}
                    </select>
                    <br/>
                    <select selected="selected" className="form-select s-1" aria-label="Default select example" onChange={(event) => setBrand(event.target.value)}>
                        <option  selected disabled hidden>Choose here</option>
                        {options1}
                    </select>
                    <br/>
                    <textarea type='text'
                    onChange={(e)=>setDescription(e.target.value)}
                    className="form-control" placeholder='description'/><br/>
                    <button type="submit" onClick={addProd}  className=" b-1 btn btn-dark">Add Product</button>
                </div>
        </div>
        <div>
            <h1>Products</h1>
            <Table>
                <thead>
                <tr>
                    <th>Id </th>
                    <th>Name </th>
                    <th>Price</th>
                    <th>Description </th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    device
                }
                </tbody>
            </Table>
        </div>


        <Footer/>
    </div>
  )
}

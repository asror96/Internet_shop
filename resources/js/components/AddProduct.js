import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"

import Sidebar from "./Sidebar";

export default function AddProduct() {
    const [name,setName]=useState(null);
    const [typeId,setType]=useState(null);
    const [file,setFile]=useState(null);
    const [price,setPrice]=useState(null);
    const [brandId,setBrand]=useState(null);
    const [description,setDescription]=useState(null);
    const [types,setTypes]=useState(null);
    const [brands,setBrands]=useState(null);
    useEffect(async ()=>{


        axios.get('http://localhost:8000/api/getTypesBrands')
            .then((response) => {
                console.log(response.data[0]);
                setTypes(response.data[0]);
                setBrands(response.data[1]);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    },[]);
const addProd=(e)=>{
    e.preventDefault();
    const fData=new FormData();
    fData.append('file',file);
    fData.append('name',name);
    fData.append('price',price);
    fData.append('typeId',typeId);
    fData.append('brandId',brandId);
    fData.append('description',description);
    Axios.post("http://localhost:8000/api/addProduct",fData)
    .then((res)=>{
        console.log("response",res)
    })
    .catch((e)=>{
        console.error("Failture",e);
    })
    navigator("/")
}
function chose(props){
}
  return (

    <div>
        <Sidebar/>
        <Header/>
            <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>


            <div className='text-center super_center'>

                <div className="">
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

                    <select class="form-select s-1" aria-label="Default select example" onChange={(e)=>{chose(e.target.value)}}>

                        <option value="1">Video Card</option>
                        <option value="2">Monitor</option>
                        <option value="3">Processor</option>
                        <option value="4">Motherboard</option>
                    </select>
                    <br/>
                    <select class="form-select s-2" aria-label="Default select example" onChange={(e)=>{setBrand(e.target.value)}} >

                        <option value="1">Asus</option>
                        <option value="2">Gigabyte</option>
                        <option value="3">Msi</option>
                        <option value="4">Palit</option>
                        <option value="5">Inno3D</option>
                        <option value="6">Sapphire</option>
                        <option value="7">KFA2</option>
                        <option value="8">PNY</option>
                        <option value="9">Zotac</option>
                        <option value="10">PowerColor</option>

                    </select>
                    <br/>
                    <textarea type='text'
                    onChange={(e)=>setDescription(e.target.value)}
                    className="form-control" placeholder='description'/><br/>
                    <button type="submit" onClick={addProd}  className=" b-1 btn btn-dark">Add Product</button>
                </div>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

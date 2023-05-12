import React, {useEffect,useState} from 'react'
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import button from "bootstrap/js/src/button";
import Axios from "axios";

export default function UpdateDevice() {
    const id=useParams().id;
    const [device,setDevice]=useState('');
    const [types,setTypes]=useState([]);
    const [brands,setBrands]=useState([]);
    const [name,setName]=useState('');
    const [typeName,setType]=useState('');
    const [file,setFile]=useState('');
    const [price,setPrice]=useState('');
    const [brandName,setBrand]=useState('');
    const [description,setDescription]=useState('');
    useEffect(()=>{
        getTypeBrand()
        getDevice()

    },[]);
    function getDevice(){
        axios.get('http://localhost:8000/api/getDevice/'+id,{
            headers:{
                'content-type': 'application/json'
            }
        })
            .then((response) => {
                setDevice( response.data);
              // console.log(response);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    const options = types.map((text, index) => {
        return <option key={index} value={text}>{text}</option>;
    });
    const options1 = brands.map((text, index) => {
        return <option key={index} value={text}>{text}</option>;
    });
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

     const updateDevice=(e)=>{
         e.preventDefault();
         const fData=new FormData();
         fData.append('id',id);
         fData.append('file',file);
         fData.append('name',name);
         fData.append('price',price);
         fData.append('typeName',typeName);
         fData.append('brandName',brandName);
         fData.append('description',description);
         console.log('fdata',fData);
             Axios.post("http://localhost:8000/api/updateDevice",fData,{
                 headers:{
                     'content-type': 'application/json'
                 }
             })
             .then((res)=>{
                 console.log("response",res)
             })
             .catch((e)=>{
                 console.error("Failure",e);
             })
         window.location.replace('http://localhost:8000/Product/');
     }


    return (

        <div>
            <Sidebar/>
            <Header/>

                <div className='text-center super_center'>
                    <br/>
                    <input defaultValue={device.name} type='text' className="form-control"
                           onChange={(e)=>setName(e.target.value)}
                           placeholder='Name'/><br/>
                    <input defaultValue={device.price} type='text'
                           onChange={(e)=>setPrice(e.target.value)}
                           className="form-control" placeholder='price'/><br/>
                    <img  src={'http://localhost:8000/storage/'+device.image_path} className="product_list_photo" />
                    <input  type="file"
                           onChange={(e)=>setFile(e.target.files[0])}
                           className="form-control" placeholder='file'/><br/>

                    <select  className="form-select s-1" aria-label="Default select example" onChange={(event) => setType(event.target.value)}>
                        <option  selected disabled hidden>Choose here</option>
                        {options}
                    </select>
                    <br/>
                    <select aria-selected="selected" className="form-select s-1" aria-label="Default select example" onChange={(event) => setBrand(event.target.value)}>
                        <option  selected disabled hidden>Choose here</option>
                        {options1}
                    </select>
                    <br/>
                    <textarea defaultValue={device.description}
                              onChange={(e)=>setDescription(e.target.value)}
                              className="form-control" placeholder='description'/><br/>
                    <button type="submit" onClick={updateDevice}  className=" b-1 btn btn-dark">Update Product</button>
                </div>

            <Footer/>
        </div>
    )
}


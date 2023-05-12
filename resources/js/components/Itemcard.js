import React,{useState} from "react";
import "../index.css"
import {json, useNavigate} from "react-router-dom";
import {toString} from "lodash";

const ItemCard=(props)=>{
    const navigate = useNavigate();
    const [itemId,setId]=useState([]);

    function handleClick(item) {
        if(localStorage.getItem('user-info')==null){
            window.location.replace("/login");
        }
        else {
            const user=JSON.parse(localStorage.getItem('user-info'));
            const postData = JSON.stringify({
                "id":item,
                "email":user.email
            });
            console.log(postData);
            let axiosConfig = {
                headers: {
                    "Content-Type": "application/json;",
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.post('http://localhost:8000/api/addDeviceBasket',postData,axiosConfig)
                .then((response) => {
                    console.log(response);
                    let count=toString( parseInt(localStorage.getItem('count'))+1);

                    localStorage.removeItem('count');
                    localStorage.setItem('count', count);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    }
    return(
        <div className='col-10 col-md-6 col-lg-3 mx-0 mb-4' >
            <div  className="card p-0 overflow-hidden h-100 shadow" >
                <img src={'http://localhost:8000/storage/'+props.img} className="card-img-top img-fluid" />
                    <div className="card-body">
                        <h5 className="card-title text-center">{props.title}</h5>
                        <h5 className="card-title text-center">$ {props.price}</h5>
                        <p className="card-text">{props.description}</p>
                        <button onClick={()=>handleClick(props.id)} className="btn btn-success button btn-cont"> Add basked </button>
                    </div>
            </div>
        </div>
    );
};
    export default ItemCard;

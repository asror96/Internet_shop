import React from "react";
import "../index.css"
import { useNavigate } from "react-router-dom";

const ItemCard=(props)=>{
    const navigate = useNavigate();
    function handleClick() {
        if(localStorage.getItem('user-info')==null){
            navigate("/login");
        }
        else {
            const postData = JSON.stringify({'type':'Video Card'});
            let axiosConfig = {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                }
            };
            axios.post('http://localhost:8000/api/getItems',postData,axiosConfig)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
    }
    return(
        <div className='col-10 col-md-6 col-lg-3 mx-0 mb-4' >
            <div className="card p-0 overflow-hidden h-100 shadow" >
                <img src={'http://localhost:8000/storage/'+props.img} className="card-img-top img-fluid" />
                    <div className="card-body">
                        <h5 className="card-title text-center">{props.title}</h5>
                        <h5 className="card-title text-center">$ {props.price}</h5>
                        <p className="card-text">{props.description}</p>
                        <button onClick={handleClick} className="btn btn-success button btn-cont"> Add basked </button>
                    </div>
            </div>
        </div>
    );
};
    export default ItemCard;

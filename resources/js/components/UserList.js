import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import Sidebar from "./Sidebar";
import {Table} from "react-bootstrap";
import button from "bootstrap/js/src/button";

export default function UserList() {
    const [Users,setUsers]=useState([]);
    useEffect(()=>{
        getUsers();
    },[]);
    function getUsers(){
        axios.get('http://localhost:8000/api/getAllUsers')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    function deleteUser(id){
        axios.delete('http://localhost:8000/api/deleteUser/'+id)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.warn("AXIOS ERROR: ", err);
        });
        getUsers();
    }

    let User = Users.map(function(user) {
        console.log(user);
        return <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button onClick={()=>deleteUser(user.id)} type="button" className="btn btn-danger">Delete</button></td>
        </tr>;

    });
    return (

        <div>
            <Sidebar/>
            <Header/>

            <Table>
                <thead>
                    <tr>
                        <th>Id user</th>
                        <th>User name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {User}
                </tbody>
            </Table>
            <Footer/>
        </div>
    )
}

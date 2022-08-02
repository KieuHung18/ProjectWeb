import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AddProduct/AddProduct.css';
import{Form,Dropdown} from "react-bootstrap"
import $ from 'jquery'
import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { textValiDate } from '../../validate';
export default  function AddUser (){
    const [email="",setEmail]=useState();
    const [password="",setPassword]=useState();
    const [name="",setName]=useState();

    const navigate = useNavigate();
    function handleSubmmit(){
        // event.preventDefault();
        $.ajax(
            {
            headers: {
                'authorization':localStorage.getItem("authorization"),
                },
            data: {
            country:"Country",
            name:$("#id-name").val(),
            email:$("#id-email").val(),
            password:$("#id-password").val(),
            },
            method: 'POST',
            url: 'http://localhost:8080/company/users',
            crossDomain: true,
            success: function(res){
                if(res.result==="SUCCESS"){
                    // reset();
                    navigate("/admin")
                    window.location.reload(false);
                }
                else{
                    // reset()
                    alert("Duplicate email")
                }
            },
            error: function(){
                // reset();
                alert("connection error")
            }
            }
        );
    }
    
    return(
        <div className='addproduct-container'>
            <Form onSubmit={(event)=>{
            event.preventDefault();
            (textValiDate($("#id-email").val())&&textValiDate($("#id-password").val())&&textValiDate($("#id-name").val()))?handleSubmmit():alert("invalid data type")
            }}className='add-product-form'>
                <Form.Group className="" controlId="id-email">
                    <Form.Label>User Email</Form.Label>
                    <Form.Control className=''/>
                </Form.Group>
                <Form.Group className="" controlId="id-name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control className='' />
                </Form.Group>
                <Form.Group className="" controlId="id-password">
                    <Form.Label>User Password</Form.Label>
                    <Form.Control className='' />
                </Form.Group>
                <button style={{marginTop: "10px"}} className='product-btn-buynow' type="submit">
                Add
                </button>
                <button style={{marginTop: "10px",background:"gray"}} className='product-btn-buynow' onClick={()=>{navigate("/admin")}}>
                Admin Page
                </button>
            </Form>
        </div>
    );

}
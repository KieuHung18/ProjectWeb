import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProduct.css';
import{Form,Dropdown} from "react-bootstrap"
import $ from 'jquery'
import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import { floatValidate } from '../../validate';
export default  function AddProduct (){
    const [price="",setPrice]=useState();
    const [currentType="Games",setCurrentType]=useState();
    const navigate = useNavigate();
    function handleSubmmit(){
        // event.preventDefault();
        $.ajax(
            {
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            data: {
            name:$("#id-name").val(),
            type:currentType,
            intro:$("#id-intro").val(),
            description:$("#id-desc").val(),
            price: $("#id-price").val(),
            },
            method: 'POST',
            url: 'http://localhost:8080/company/products',
            crossDomain: true,
            success: function(res){
                navigate("/admin")
                window.location.reload(false);
            },
            error: function(){
                
            }
            }
        );
    }
    const type=["Games","Commanders","Announcers","Bundles","Premium Arcade"]
    return(
        <div className='addproduct-container'>
            <Form onSubmit={(event)=>{
            event.preventDefault();
            floatValidate($("#id-price").val())?handleSubmmit():setPrice("Invalid data type")
            }}className='add-product-form'>
                <Form.Group className="" controlId="id-name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control className='' placeholder="name" />
                </Form.Group>

                <Form.Group className="" controlId="id-type">
                <Form.Label>Product Type</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle className='country-btn'  variant="secondary">
                        {currentType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="menu-country" variant="dark">
                        {type.map((t,i)=>(
                            <Dropdown.Item onClick={()=>{setCurrentType(t)}} key={i} eventKey={i}>{t}</Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>


                <Form.Group className="" controlId="id-intro">
                    <Form.Label>Product Introduction</Form.Label>
                    <Form.Control className='' placeholder="introduction" />
                </Form.Group>
                <Form.Group className="" controlId="id-desc">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control className='' placeholder="description" />
                </Form.Group>
                <Form.Group className="" controlId="id-price">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control className='' placeholder="price" />
                </Form.Group>
                {price!==""&&<div className='field-alert'>{price}</div>}
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
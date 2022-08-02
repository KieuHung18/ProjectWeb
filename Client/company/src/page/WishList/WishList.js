import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './WishList.css';
import {Form,Dropdown,Row,Col,Tab,Nav,Button, Card,CardGroup, CardImg} from "react-bootstrap"
import $ from 'jquery';
import {faHeart} from '@fortawesome/free-solid-svg-icons' 

export default function  WishList(){
    const [ productList=[], setProductList] = useState();
    const navigate=useNavigate();
    function loadProduct(){
        let l=JSON.parse(localStorage.getItem("wishList"))
        let wl="";
        for(let i=0;i<l.length;i++){
            wl+=l[i]+","
        }
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/company/wishlist",
            data: {wishList: wl,token:localStorage.getItem("authorization")},
            success: function(res){
                setProductList(res.response)
                console.log(res.response)
            },
            error: function(){
                console.log("err")
            }
        });
    }
    useEffect(() => {
        if (localStorage.getItem("wishList")) {
           loadProduct()
        }
        else {
        localStorage.setItem("wishList",JSON.stringify([]))
        }
      }, []);
      
      function purchase(id){
        console.log("purchase")
        $.ajax({
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            method: "POST",
            url: "http://localhost:8080/company/purchase",
            data: {
                token:localStorage.getItem("authorization"),
                productId: id
            },
            success: function(res){
                let l=JSON.parse(localStorage.getItem("wishList"))
                l.splice(l.findIndex((element) => element==id),1)
                localStorage.setItem("wishList",JSON.stringify(l))
            },
            error: function(){
                navigate("/login")
            }
        });
    }
    function productTable(col,products){
        return(
        <CardGroup className='store-product' style={{marginTop:"50px"}}>
        <Col>
        {Array.from({ length: productList&&(productList.length==1?1:((products.length+products.length%col)/col))}).map((_,rowidx)=>(
            <Row>
                {products.slice(col*rowidx,(rowidx+1)*col).map((_,colidx)=>(
                    <Col style={{display: "contents"}}>
                        <Card className='product' key={"store_"+products[col*rowidx+colidx].name}>
                            <Card.Img variant="top" src={"assets/images/product/"+products[col*rowidx+colidx].id+".png"} />
                            <Card.ImgOverlay className='product-holder'>
                                <Card.Body className='product-body' style={{height:"50%"}}>
                                <Col >
                                <Row >
                                <Card.Title className='product-title' style={{fontSize:"14px"}}>
                                    {products[col*rowidx+colidx].name}
                                </Card.Title>
                                </Row>
                                <Row>
                                <Card.Text>
                                    {products[col*rowidx+colidx].type}
                                </Card.Text>
                                </Row>
                                <Row>
                                <Card.Text className='product-price'>
                                    {products[col*rowidx+colidx].price}
                                </Card.Text>
                                </Row>
                                <Row>
                                <button onClick={()=>{
                                    purchase(products[col*rowidx+colidx].id)
                                    loadProduct()
                                    }} className='product-btn-buynow'>
                                buy now
                                </button>
                                <button onClick={()=>{
                                        let l=JSON.parse(localStorage.getItem("wishList"))
                                        l.splice(l.findIndex((element) => element==products[col*rowidx+colidx].id),1)
                                        localStorage.setItem("wishList",JSON.stringify(l))
                                        loadProduct()
                                        }} className='product-btn-wishlist'>
                                remove
                                </button>
                                </Row>
                                </Col>
                                </Card.Body>
                                
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                ))}
            </Row>
        ))}
        </Col>
        </CardGroup>
        )
    }
    function gen(num){
        let items=[];
        for(let i=0;i<num;i++){
            items.push({name:"name_"+i,type:"type_"+i,price:0,id: 1})
        }
        return items
    }
    return(
        <div className='wishlist-container'>
        <div className='my-wish-list'>My Wish List</div>
        {productTable(4,productList)}
        </div>
    )
}
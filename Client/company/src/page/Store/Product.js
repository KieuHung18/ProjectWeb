import './Product.css';
import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Dropdown,Row,Col,Nav,Button, Card} from "react-bootstrap"
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'

export default function  Product(){
    const [ product={id:0,type: "", name: "", price: 0, intro: "", description: ""}, setProduct] = useState();
    const { id } = useParams()
    const [repaint=false, setRepaint] = useState();
    const [purchased=false,setPurchased]= useState();
    const navigate=useNavigate();
    const [ searchProduct=[], setSearchProduct] = useState();
    useEffect(() => {
        loadProduct()
      }, []);
      function reveal() {
        var reveals = $(".notDisplay");
        for (var i = 0; i < reveals.length; i++) {
        if (searchProduct.length>0) {
            reveals[i].classList.remove("hide");
        } else {
            reveals[i].classList.add("hide");
        }
        }
        
    }
    function loadProduct(){
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/company/products/"+id,
            data: {},
            success: function(res){
                setProduct(res.response);
                checkPurchase(res.response.id)
            },
            error: function(){
                console.log("err")
            }
        });
    }
    function purchase(){
        $.ajax({
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            method: "POST",
            url: "http://localhost:8080/company/purchase",
            data: {
                token:localStorage.getItem("authorization"),
                productId: product.id
            },
            success: function(res){

            },
            error: function(){
                navigate("/login")
            }
        });
    }
    function checkPurchase(id){
        $.ajax({
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            method: "GET",
            url: "http://localhost:8080/company/users/transactions",
            data: {token:localStorage.getItem("authorization")},
            success: function(res){
                for(let i=0;i<res.response.length;i++){
                    if(res.response[i].productID==id){
                        
                        setPurchased(true)
                    }
                    // console.log(id)
                    // console.log(res.response)
                    
                }
            },
            error: function(){
                console.log("err")
            }
        });
    }
    function wishList(){
        let l=[]
        if (localStorage.getItem("wishList")) {
        l=JSON.parse(localStorage.getItem("wishList"))
        if(!l.includes(product.id)){
            l.push(product.id)
        }
        localStorage.setItem("wishList",JSON.stringify(l))
        } else {
        l.push(product.id)
        localStorage.setItem("wishList",JSON.stringify(l))
        }
        setRepaint(repaint?false:true)
    }
    
    function wishListBtn(){
        if(!JSON.parse(localStorage.getItem("wishList"))){
            return (<button disabled={purchased} onClick={wishList} className='product-btn-wishlist'>
            <FontAwesomeIcon icon={faHeart} style={{marginRight: "10px"}}></FontAwesomeIcon>add to wish list
            </button>)
        }
        else{
        if(localStorage.getItem("wishList")!=null&&JSON.parse(localStorage.getItem("wishList")).includes(product.id)){
            return(
            <button disabled={purchased} onClick={()=>{navigate("/wishlist")}} className='product-btn-wishlist'>
            <FontAwesomeIcon icon={faHeart} style={{marginRight: "10px"}}></FontAwesomeIcon>view wish list
            </button>)
        }
        else{
            return(
            <button disabled={purchased} onClick={wishList} className='product-btn-wishlist'>
            <FontAwesomeIcon icon={faHeart} style={{marginRight: "10px"}}></FontAwesomeIcon>add to wish list
            </button>)
        }
        }
    }
        
    function search(){
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/company/products/search",
            data: {
                token:localStorage.getItem("authorization"),
                search: $("#id-search").val()
            },
            success: function(res){
                console.log(res.response)
                if(res.response.length>0){setSearchProduct(res.response)}else{
                    setSearchProduct([])
                }
                reveal()
            },
            error: function(){
                console.log("err")
            }
        });
       
    }
    return(
    <div className='product-detail-container'>
    <Nav className='store-nav'>
            <div className='store-link-group'>
            <Nav.Item >
            <Nav.Link onClick={()=>{navigate("/store")}} className='store-nav-link' >store</Nav.Link>
            </Nav.Item>
            </div>
            {/* <Dropdown>
                <Dropdown.Toggle className=''  variant="secondary">
                Fetured
                </Dropdown.Toggle>
                <Dropdown.Menu className="" variant="dark">
                {["Fetured","Name","Prices: Lowest","Prices: Highest","Discount"
                ].map((items)=>(
                <Dropdown.Item  key={"store_"+{items}} >{items}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
            </Dropdown> */}
            <Form>
            <Form.Control  autocomplete="off" onKeyUp={search} id="id-search" className='search-input'  placeholder="Search" />
            <div className='store-search notDisplay'>
            {searchProduct.map((items)=>(
                <Dropdown.Item onClick={()=>{navigate("/product/"+items.id);window.location.reload(false);}} className='search-items'  key={"sp_"+items.id} >{items.name}</Dropdown.Item>
                ))}
            </div>
            </Form>
            <Button onClick={()=>{navigate("/wishlist")}} variant="secondary">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            {/* {JSON.parse(localStorage.getItem("wishList"))
            ?
            <div style={{position: 'absolute',color:'black',fontWeight:"700",fontSize:"15px",transform:"translate(3px, -23px)"}}>
                {JSON.parse(localStorage.getItem("wishList")).length}
            </div>
            :
            ""
            } */}
            </Button>
        </Nav>
        <div className='product-card-body'>
        <p className='product-card-body-intro'>
        {product.intro}
        </p>
        <p className='product-card-body-desc'>
        {product.description}
        </p>
        </div>
       
        <Card className="">
        <Card.Img src='/assets/images/product-background.jpg'
                className=""
                alt="" />
            <Card.ImgOverlay>
                    <Card className='product-inner-card'>
                        <Card.Header className='product-inner-card-header'>
                        <Card.Text className='product-inner-card-logo'>
                        StarCraft® II: Campaign Collection
                        </Card.Text>
                        <Card.Text className='product-inner-card-type'>
                        {product.type}
                        </Card.Text>
                        </Card.Header>
                        <Card.Body className='product-inner-card-body'>
                        
                        <Card.Text className='product-inner-card-name'>
                        {product.name}
                        </Card.Text>
                        <Card.Text className='product-inner-card-price'>
                        USD {product.price}
                        </Card.Text>
                        {!purchased?
                        <button disabled={purchased} onClick={()=>{
                            purchase()
                            if(localStorage.getItem("wishList")){
                                let l=JSON.parse(localStorage.getItem("wishList"))
                                l.splice(l.findIndex((element) => element==product.id),1)
                                localStorage.setItem("wishList",JSON.stringify(l))
                            }
                            loadProduct()
                            }} className='product-btn-buynow'>
                        buy now
                        </button>
                        :
                        ""}
                        {!purchased?
                        wishListBtn()
                        :
                        ""}
                        </Card.Body>
                    </Card>
            </Card.ImgOverlay>
            <Card.Footer className="product-card-footer">
            < div style={{fontWeight: "700",fontSize: "30px",paddingBottom:"20px"}}>
            System Requirements
            </div>
            <Row>
                <Col>
                <b>Minimum Requirements </b>
                Operating System
                Windows® 7 / Windows® 8 / Windows® 10
                Processor
                Intel® Core™ 2 Duo or AMD Athlon™ 64 X2 5600+
                Video
                NVIDIA® GeForce® 7600 GT or ATI™ Radeon™ HD 2600 XT or Intel® HD Graphics 3000 or better
                Memory
                2 GB RAM
                Storage
                30 GB available HD space
                Internet
                Broadband Internet connection
                Resolution
                1024X768 minimum display resolution
                </Col>
                <Col>
                <b>Recommended Specifications </b>
                Operating System
                Windows® 10 64-bit
                Processor
                Intel® Core™ i5 or AMD FX Series Processor or better
                Video
                NVIDIA® GeForce® GTX 650 or AMD Radeon™ HD 7790 or better
                Memory
                4 GB RAM
                Storage
                30 GB available HD space
                Internet
                Broadband Internet connection
                Resolution
                1024X768 minimum display resolution
                </Col>
            </Row>
           
            </Card.Footer>
        </Card>
    </div> 
    );
}
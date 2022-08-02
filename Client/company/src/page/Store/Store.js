import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Store.css';
import {Form,Dropdown,Row,Col,Tab,Nav,Button, Card,CardGroup, CardImg} from "react-bootstrap"
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons' 
import Fetured from './Feature';
function gen(num){
    let items=[];
    for(let i=0;i<num;i++){
        items.push({name:"name_"+i,type:"type_"+i,price:0,id: 1})
    }
    return items
}

export default function  Store(){
    const navigate=useNavigate();
    const [ searchProduct=[], setSearchProduct] = useState();
    function reveal(trigger) {
        var reveals = $(".notDisplay");
        for (var i = 0; i < reveals.length; i++) {
        if (trigger) {
            reveals[i].classList.remove("hide");
        } else {
            reveals[i].classList.add("hide");
        }
        }
        
    }
    useEffect(() => {
        loadProduct('Games');
      }, []);
    const [ productList=[], setProductList] = useState();
    function toDetail(id){
        navigate("/product/"+id);
    }
    function search(){
        $.ajax({
            headers: {
                'authorization':localStorage.getItem("authorization"),
            },
            method: "POST",
            url: "http://localhost:8080/company/products/search",
            data: {
                token:localStorage.getItem("authorization"),
                search:$("#id-search").val()
            },
            success: function(res){
                if(res.response.length>0){
                    let l=[]
                    for (let i = 0; i < res.response.length; i++) {
                        l.push({
                          id: res.response[i].id,
                          name:res.response[i].name
                        });
                    }
                    setSearchProduct(l)
                    reveal(true)
                }else{
                    setSearchProduct([])
                    reveal(false)
                }
            },
            error: function(){
                console.log("err")
            }
        });
       
    }
    function productTable(col,products){
        return(
        <CardGroup className='store-product'>
        <Col>
        {Array.from({ length: productList.length==1?1:((products.length+products.length%col)/col)}).map((_,rowidx)=>(
            <Row>
                {products.slice(col*rowidx,(rowidx+1)*col).map((_,colidx)=>(
                    <Col style={{display: "contents"}}>
                        <Card className='product' key={"store_"+products[col*rowidx+colidx].name} onClick={()=>{toDetail(products[col*rowidx+colidx].id)}}>
                            <Card.Img variant="top" src={"assets/images/product/"+products[col*rowidx+colidx].id+".png"} />
                            <Card.ImgOverlay className='product-holder'>
                                <Card.Body className='product-body'>
                                <Col className='product-text'>
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
                                </Col>
                                </Card.Body>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                ))}
            </Row>
        ))}
        </Col>
        {/* {products.map((p)=>(
        <Card key={"store_"+p.name}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
            <Card.Title>
                {p.name}
            </Card.Title>
            <Card.Text>
                {p.type}
            </Card.Text>

            <Card.Text>
                {p.price}
            </Card.Text>
            </Card.Body>
        </Card>
        ))} */}
        </CardGroup>
        )
    }
    
    function loadProduct(productType){setSearchProduct([])
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/company/products",
            data: {type: productType},
            success: function(res){
                let prs=[];
                for(let i=0;i<res.response.length;i++){
                prs.push(res.response[i])
                }
                setProductList(prs)
            },
            error: function(){
                console.log("err")
            }
        });
    }
    
    return(
    <div className='store-container'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="Games">
    <Row>
    <Col>
        <Nav className='store-nav'>
            <div className='store-link-group'>
            {["Games","Commanders","Announcers","Bundles","Premium Arcade",
            ].map((items)=>(
            <Nav.Item key={"store_"+items}>
            <Nav.Link className='store-nav-link' eventKey={items} onClick={()=>{loadProduct(items)}}>{items}</Nav.Link>
            </Nav.Item>
            ))}
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
                <Dropdown.Item onClick={()=>{navigate("/product/"+items.id);window.location.reload(false);}} className='search-items'  key={"sp_"+items.id} >
                    {items.name}
                </Dropdown.Item>
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
        
        
        <Tab.Content>
            <Tab.Pane eventKey="Games">
            <Fetured/>
            {(productTable(4,productList))}
            </Tab.Pane>

            <Tab.Pane eventKey="Commanders">
            <div className='store-tab'>
                <div className='store-tab-title'>
                Commanders
                </div>
                <div className='store-tab-desc'>
                Take control of the battlefield with a StarCraft Commander.
                </div>
            </div>
            {(productTable(4,productList))}
            </Tab.Pane>

            <Tab.Pane eventKey="Announcers">
            <div className='store-tab'>
                <div className='store-tab-title'>
                Announcers
                </div>
                <div className='store-tab-desc'>
                Elevate your gameplay with commentary from a StarCraft Announcer!
                </div>
            </div>
            {(productTable(4,productList))}
            </Tab.Pane>

            <Tab.Pane eventKey="Bundles">
            <div className='store-tab'>
                <div className='store-tab-title'>
                Bundles
                </div>
                <div className='store-tab-desc'>
                Grab a bundle of goodies and bring your gameplay to the next level.
                </div>
            </div>
            {(productTable(4,productList))}
            </Tab.Pane>

            <Tab.Pane eventKey="Premium Arcade">
            <div className='store-tab'>
                <div className='store-tab-title'>
                Premium Arcade
                </div>
                <div className='store-tab-desc'>
                </div>
            </div>
            {(productTable(4,productList))}
            </Tab.Pane>
            
        </Tab.Content>

    </Col>
    </Row>
    </Tab.Container>
    </div>
    );
    
}
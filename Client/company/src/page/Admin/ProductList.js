import React from 'react';
import './ProductList.css';
import { Button,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import jquery from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faExclamationCircle, faCircleArrowRight,faAdd} from '@fortawesome/free-solid-svg-icons'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {useNavigate } from 'react-router-dom'; 
const delivered=(<FontAwesomeIcon style={{color:"hsl(123deg 58% 31%)",transform: "scale(1.75)"}} icon={faCheckCircle} />);
const pending=(<FontAwesomeIcon style={{color:"hsl(268deg 83% 24%)",transform: "scale(1.75)"}} icon={faCircleArrowRight} />);
const exception=(<FontAwesomeIcon style={{color:"hsl(345deg 67% 41%)",transform: "scale(1.75)"}} icon={faExclamationCircle} />);

var productTable=[];
export default function ProductList(){
  return (
    <Component navigate={useNavigate()}/>
  );
}
export class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadData: true };
    this.toAddproduct=this.toAddproduct.bind(this)
  }

  componentDidMount() {
    var display=this;
    if(display.state.loadData){
    jquery.ajax({
      headers: {
        'authorization':localStorage.getItem("authorization"),
      },
      data:{type: "All"},
      type: "GET",
      url: "http://localhost:8080/company/products",
      success: function(res){
        if(res.result!="FAIL"){
          for (let i = 0; i < res.response.length; i++) {
            productTable.push({
              id: res.response[i].id,
              name:res.response[i].name,
              type:res.response[i].type,
              price:res.response[i].price,
              active:res.response[i].active?"Active":"Not Active"},
              );
          }
          display.setState({ loadData: false });
        }
        else{console.log("fail");
          //redirect
        }
        },
       error: function(){
         console.log("error");
       }
    });
    }
    
  }
  toAddproduct(){
    this.props.navigate("/addproduct");
  }
  render() {
    const tableRowEvents = {
      onClick: (row,rowElement,rowIndex) => {
        let pid="/editproduct/"+rowElement.id;
        this.props.navigate(pid);
      },
    }
    const columns = [
      { dataField: 'id', text: 'Product ID',filter: textFilter()},
      { dataField: 'name', text: 'Product Name',filter: textFilter()},
      { dataField: 'type', text: 'Product Type',filter: textFilter()},
      { dataField: 'price', text: 'Product Price', onSort: (field, order) => {
      }},
      { dataField: 'active', text: 'Active'},
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 10,
      lastPageText: '>>',
      firstPageText: '<<',
      nextPageText: '>',
      prePageText: '<',
      showTotal: true,
      alwaysShowAllBtns: true,
      hideSizePerPage: true
    });
    
    return (
      <div className="product-list-container">
      <h1 className="productlist-welcome">Product List</h1>
      <BootstrapTable 
      rowEvents={ tableRowEvents } 
      rowClasses="product-list-row"  
      bootstrap4 keyField='id' 
      data={productTable} 
      columns={columns}   
      pagination={pagination}
      filter={ filterFactory() }
       />
       <Button onClick={this.toAddproduct} style={{margin: "20px"}} variant="dark">Add product <FontAwesomeIcon style={{paddingLeft: "5px"}} icon={faAdd}/></Button>
    </div>
    );
  }
 
    
  
  
}



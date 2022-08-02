import "./Transaction.css";
import React from "react";
import jquery from "jquery";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// asdasdasd
// function generator(quantity){
//   const items = [];
//   for (let i = 0; i < quantity; i++) {
//     items.push({
//     userName:"userName"+i,
//     productName:"productName"+i,
//     transactionDate:"transactionDate"+i,
//     });
//   }
//   return items;
// }

var transaction=[];

export default function Transaction() {
  return <Component navigate={useNavigate()} />;
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state={loadData: true}
}
  componentDidMount() {
    var display=this;
    if(display.state.loadData){
    jquery.ajax({
      headers: {
        'authorization':localStorage.getItem("authorization"),
      },
      type: "GET",
      url: "http://localhost:8080/company/transactions",
      success: function(res){
        if(res.result!="FAIL"){
          transaction=[];
          for (let i = 0; i < res.response.length; i++) {
            transaction.push({
              id:res.response[i].id,
              userName:res.response[i].userName,
              productName:res.response[i].productName,
              transactionDate:new Date(res.response[i].transactionDate).toLocaleString(),
              price:res.response[i].price
              });
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

  render() {
    const columns = [
    { dataField: 'id', text: 'Transaction Id', filter: textFilter()},
    { dataField: 'userName', text: 'User Name', filter: textFilter()},
    { dataField: 'productName', text: 'Product Name', filter: textFilter()},
    { dataField: 'transactionDate', text: 'Transaction Date'},
    { dataField: 'price', text: 'Price'},
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
        <h1 className="productlist-welcome">Transaction</h1>
          <BootstrapTable 
          rowClasses="product-list-row"  
          bootstrap4 keyField='id' 
          data={transaction} 
          columns={columns}   
          pagination={pagination}
          filter={ filterFactory() }
          />
        </div>
    );
  }
}


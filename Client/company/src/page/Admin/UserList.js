import React from 'react';
import './UserList.css';
import {Button, Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import jquery from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAdd} from '@fortawesome/free-solid-svg-icons'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {useNavigate } from 'react-router-dom'; 
function generator(quantity){
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      
    userID:"u"+i,
    userName:"userName"+i,
    userAddress:"District"+i,
    userPhone:"099492626"+i,
    role:"ROLE_USER"
    });
  }
  return items;
}

var userTable=[];
userTable=generator(20);


export default function UserList(){
  
  return (
    <Component navigate={useNavigate()}/>
  );
}
export class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadData: true };
  }

  componentDidMount() {
    var display=this;
    if(display.state.loadData){
    jquery.ajax({
      headers: {
        'authorization':localStorage.getItem("authorization"),
      },
      type: "GET",
      url: "http://localhost:8080/company/users",
      success: function(res){
        if(res.result!="FAIL"){
           userTable=[];
          for (let i = 0; i < res.response.length; i++) {
            userTable.push({
              userID:res.response[i].id,
              userName:res.response[i].name,
              userEmail:res.response[i].email,
              userActive:res.response[i].active?"Active":"Not Active",
              role:res.response[i].role,
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
    // const tableRowEvents = {
    //   onClick: (row,rowElement,rowIndex) => {
    //     let pid="/edituser/"+rowElement.userID;
    //     this.props.navigate(pid);
    //   },
    // }
    const columns = [
      { dataField: 'userID', text: 'User ID',filter: textFilter()},
      { dataField: 'userName', text: 'User Name',filter: textFilter()},
      { dataField: 'userEmail', text: 'User Email',filter: textFilter()},
      { dataField: 'userActive', text: 'Active'},
      { dataField: 'role', text: 'Role'},
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
      <h1 className="productlist-welcome">User List</h1>
      <BootstrapTable 
      // rowEvents={ tableRowEvents } 
      rowClasses="product-list-row"  
      bootstrap4 keyField='id' 
      data={userTable} 
      columns={columns}   
      pagination={pagination}
      filter={ filterFactory() }
       />
       <Button onClick={()=>this.props.navigate("/adduser")} style={{margin: "20px"}} variant="dark">Add User <FontAwesomeIcon style={{paddingLeft: "5px"}} icon={faAdd}/></Button>
    </div>
    );
  }
 
    
  
  
}



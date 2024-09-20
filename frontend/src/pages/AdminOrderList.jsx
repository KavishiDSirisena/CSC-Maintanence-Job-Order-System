import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { Input, Button } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import DeleteButtonFeed from "../components/DeleteButtonFeed";
import NavBar from "../components/NavBar.component";
import { Footer } from "antd/es/layout/layout";

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getOrders() {
      axios.get("http://localhost:8000/addorders").then((res) => {
        setOrders(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/addorders/${id}`)
      .then(res => {
        // Update tags list after deletion
        setOrders(orders.filter(order => order._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting Order.');
      });
  };

  const filteredOrders = orders.filter((order) =>
    order.department.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <NavBar/>

<Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}> {/* 64px for NavBar, 70px for Footers */}
    <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>
        
    <div style={{paddingTop:"20vh"}}>
        <a href="/" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold"}}>Analytics</a>
        <br/><hr/>
        <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold"}}>Final Order Report</a>
        <br/><hr/>
        <a href="/StatusApproval" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Status Approval</a>
        <br /><hr />
        <a href="/orderlist" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold"}}>Orders</a>
        <hr/>
    </div>
    

    </Col>
    <Col span={18} style={{ margin: "20px auto", textAlign: "center" }}>
      <Input
        placeholder="Search by Department"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", marginLeft: "400px", marginTop: "10px" }}
      />
      <h1>All Maintainance Orders</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">OrderID</th>
            <th scope="col">Username</th>
            <th scope="col">Department</th>
            <th scope="col">Designation</th>
            <th scope="col">Date</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No orders found.</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.username}</td>
                <td>{order.department}</td>
                <td>{order.designation}</td>
                <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
                <td>{order.reason}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

       <h1>Admin Analysis</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">OrderID</th>
            <th scope="col">Username</th>
            <th scope="col">Department</th>
            <th scope="col">Maintainance Details</th>
            <th scope="col">Maintainer</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No orders found.</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.username}</td>
                <td>{order.department}</td>
                <td>{order.view}</td>
                <td>{order.category}</td>
                <td>{order.status}</td>
                <td><Link to={"edit/"+order._id}><Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }} >Action</Button></Link></td>
               </tr>
            ))
          )}
        </tbody>
      </table> 
      </Col>
      </Row>
      <Footer/>
    </>
  );
}

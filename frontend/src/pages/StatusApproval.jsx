import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import NavBar from "../components/NavBar.component";
import { Footer } from "antd/es/layout/layout";

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#343a40',
    color: '#ffffff',
  },
  tableCol: {
    width: '12.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
});

const PdfDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text>Status Acceptance</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>OrderID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Username</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Department</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Designation</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Reason</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Approval</Text>
          </View>
        </View>
        {data.map((order) => (
          <View key={order._id} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.orderID}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.username}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.department}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.designation}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{new Date(order.date).toLocaleDateString("en-GB")}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.reason}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.status}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{order.approval}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function StatusApproval() {
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
        // Update orders list after deletion
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
      <NavBar />
      <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}> {/* 64px for NavBar, 70px for Footers */}
        <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>
          <div style={{ paddingTop: "20vh" }}>
            <a href="/" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Analytics</a>
            <br /><hr />
            <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Final Order Report</a>
            <br /><hr />
            <a href="/" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold" }}>Status Approval</a>
            <br /><hr />
            <a href="/orderlist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Orders</a>
            <hr />
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
          <h1>Status Acceptance</h1>
          <br></br>
          <PDFDownloadLink
            document={<PdfDocument data={filteredOrders.filter(order => order.status === "Pending" || order.status === "Completed")} />}
            fileName="status_acceptance.pdf"
            style={{ textDecoration: "none", color: "#fff", backgroundColor: "#FD204F", padding: "10px 20px", borderRadius: "5px" }}
          >
            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
          <table className="table table-success table-striped" style={{ marginTop: "20px" }}>
            <thead>
              <tr className="table-dark">
                <th scope="col">OrderID</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
                <th scope="col">Designation</th>
                <th scope="col">Date</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
                <th scope="col">Approval</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>No orders found.</td>
                </tr>
              ) : (
                filteredOrders
                  .filter(order => order.status === "Pending" || order.status === "Completed")
                  .map(order => (
                    <tr key={order._id}>
                      <td>{order.orderID}</td>
                      <td>{order.username}</td>
                      <td>{order.department}</td>
                      <td>{order.designation}</td>
                      <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
                      <td>{order.reason}</td>
                      <td>{order.status}</td>
                      <td>{order.approval}</td>
                      <td>
                        <Link to={"accept/" + order._id}>
                          <Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }}>Acceptance</Button>
                        </Link>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

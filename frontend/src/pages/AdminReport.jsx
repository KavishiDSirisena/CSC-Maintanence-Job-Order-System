import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Input, Button } from "antd";
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import NavBar from "../components/NavBar.component";
import Footers from "../components/Footer.component";

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  section: {
    marginBottom: 10,
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
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#343a40',
    color: '#ffffff',
  },
  tableCol: {
    width: '16.66%',
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
      <View style={styles.section}>
        <Text>Order Details</Text>
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
            <Text style={styles.tableCellHeader}>Reason</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
        </View>
        {data.length === 0 ? (
          <View style={styles.tableRow}>
            <View style={styles.tableCol} colSpan="6">
              <Text style={styles.tableCell}>No orders found.</Text>
            </View>
          </View>
        ) : (
          data.map((order) => (
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
                <Text style={styles.tableCell}>{order.reason}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{new Date(order.date).toLocaleDateString('en-GB')}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </Page>
  </Document>
);

export default function AdminReport() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    function getOrders() {
      axios.get("http://localhost:8000/addorders").then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getOrders();
  }, []);

  const handleSearch = () => {
    const filteredOrders = orders.filter(
      (order) => order.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 order.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filteredOrders);
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      const filteredOrders = orders.filter(
        (order) => new Date(order.date) >= dates[0] && new Date(order.date) <= dates[1]
      );
      setFilteredOrders(filteredOrders);
    }
  };

  return (
    <>
      <NavBar />
      <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}>
        <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>
          <div style={{ paddingTop: "20vh" }}>
            <a href="/" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Analytics</a>
            <br /><hr />
            <a href="/adminReport" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold" }}>Final Order Report</a>
            <br /><hr />
            <a href="/StatusApproval" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Status Approval</a>
            <br /><hr />
            <a href="/orderList" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Orders</a>
            <hr />
          </div>
        </Col>
        <Col span={18} style={{ margin: "20px auto", textAlign: "center" }}>
          <h1>All Orders</h1>
          <DatePicker.RangePicker
            onChange={handleDateChange}
            style={{ marginBottom: "20px", marginLeft: "auto", marginTop: "10px"  }}
          />
          
          <Input
            placeholder="Search by Department or Username"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            style={{ marginBottom: "20px", width: "300px", marginLeft: "20px", marginTop: "10px" }}
          />
          <Button type="primary" icon={<DownloadOutlined />} style={{ marginLeft: "30px", backgroundColor: "#FD204F" }}>
            <PDFDownloadLink document={<PdfDocument data={filteredOrders} />} fileName="order_details.pdf" style={{ textDecoration: "none", color: "#ffffff" }}>
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </Button>
          <table className="table table-success table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">OrderID</th>
                <th scope="col">Username</th>
                <th scope="col">Department</th>
                <th scope="col">Designation</th>
                <th scope="col">Reason</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderID}</td>
                    <td>{order.username}</td>
                    <td>{order.department}</td>
                    <td>{order.designation}</td>
                    <td>{order.reason}</td>
                    <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Col>
      </Row>
      <Footers />
    </>
  );
}

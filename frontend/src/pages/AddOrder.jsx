import "../styles/styles.css";
import { Row, Col } from "antd";
import NavBar from "../components/NavBar.component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "antd/es/layout/layout";

export default function AddOrder() {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [date, setDate] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [reason, setReason] = useState("");
  const [nextOrderID, setNextOrderID] = useState(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = today.getDate().toString().padStart(2, '0'); // Add leading zero
    const formattedDate = `${year}-${month}-${day}`;
    setTodayDate(formattedDate);
    setDate(formattedDate);

    // Fetch the next orderID
    axios.get("http://localhost:8000/addorders/nextOrderID").then((response) => {
      setNextOrderID(response.data.nextOrderID);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  function sendData(e) {
    e.preventDefault();

    const newAddorder = {
      username,
      department,
      designation,
      date,
      reason
    };

    axios.post("http://localhost:8000/addorders/add", newAddorder).then(() => {
      alert("New Order Added to the system");
      window.location.href = '/'; // Redirect to admin home
    }).catch((err) => {
      alert(err);
    });
  }

  return (
    <>
      <NavBar />

      <Row style={{ minHeight: "calc(100vh - 64px - 170px)" }}> {/* 64px for NavBar, 70px for Footers */}
        <Col span={24}>
          <section className="vh-100 bg-image" style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: 15 }}>
                      <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">Add Order</h2>
                        <form onSubmit={sendData}>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="orderID">Order ID</label>
                            <input type="text" id="orderID" className="form-control" value={nextOrderID !== null ? nextOrderID : 'Loading...'} disabled style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input type="text" id="username" className="form-control" required onChange={(e) => {
                              setUsername(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="department">Department</label>
                            <select id="department" className="form-select" required onChange={(e) => {
                              setDepartment(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }}>
                              <option value="" disabled selected>Choose...</option>
                              <option value="IT">IT</option>
                              <option value="Accounts">Accounts</option>
                              <option value="HR">HR</option>
                              <option value="Housekeeping">Housekeeping</option>
                              <option value="Sports Complex">Sports Complex</option>
                              <option value="Front Office">Front Office</option>
                            </select>
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="designation">Designation</label>
                            <input type="text" id="designation" className="form-control" required onChange={(e) => {
                              setDesignation(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="date">Date</label>
                            <input type="date" id="date" className="form-control" value={date} min={todayDate} max={todayDate} required onChange={(e) => {
                              setDate(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="reason">Job Order</label>
                            <input type="text" id="reason" className="form-control" required onChange={(e) => {
                              setReason(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>

                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success btn-block gradient-custom-4 text-body" style={{ fontSize: '14px', height: '35px' ,fontWeight: 'bold',backgroundColor: "beige" }}>Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
}

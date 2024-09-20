import "../styles/styles.css";
import { Row, Col } from "antd";
import NavBar from "../components/NavBar.component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "antd/es/layout/layout";

export default function AddMaintainer() {
  const [empId, setEmpId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newMaintainer = {
      EmpId: empId,
      firstname,
      lastname,
      designation,
      department
    };

    axios.post("http://localhost:8000/maintainers/add", newMaintainer).then(() => {
      alert("New Maintainer Added to the system");
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
                        <h2 className="text-uppercase text-center mb-5">Add Maintainer</h2>
                        <form onSubmit={sendData}>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="empId">Employee ID</label>
                            <input type="text" id="empId" className="form-control" required onChange={(e) => {
                              setEmpId(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" className="form-control" required onChange={(e) => {
                              setFirstname(e.target.value);
                            }} style={{ fontSize: '14px', height: '30px' }} />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" className="form-control" required onChange={(e) => {
                              setLastname(e.target.value);
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

                          <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success btn-block gradient-custom-4 text-body" style={{ fontSize: '14px', height: '35px', fontWeight: 'bold', backgroundColor: "beige" }}>Submit</button>
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
      <Footer />
    </>
  );
}

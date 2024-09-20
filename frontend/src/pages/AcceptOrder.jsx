import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import Footers from "../components/Footer.component";
import NavBar from "../components/NavBar.component";

export default function AcceptOrder() {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [view, setView] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [approval, setApproval] = useState("");
  const [error, setError] = useState();
  const params = useParams();

  const getSelectedOrder = () => {
    axios.get(`http://localhost:8000/addorders/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.username);
        setDepartment(response.data.department);
        setView(response.data.view);
        setCategory(response.data.category);
        setStatus(response.data.status);
        setApproval(response.data.approval);
      });
  };

  useEffect(() => {
    getSelectedOrder();
  }, []);

  const updateOrderDetails = (e) => {
    e.preventDefault();

    let updatedData = {
      username: username,
      department: department,
      view: view,
      category: category,
      status: status,
      approval: approval,
    };

    axios.put(`http://localhost:8000/addorders/${params.id}`, updatedData)
      .then(() => {
        alert("Approval details updated");
        window.location.href = "/StatusApproval";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
            <a href="/StatusApproval" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Status Approval</a>
            <br /><hr />
            <a href="/orderlist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Orders</a>
            <hr />
          </div>
        </Col>
        <Col span={18}>
          <Row justify="center" className="mt-5">
            <Col lg={18} sm={15}>
              <h3>Update Order Status</h3>
              <br /><br />
              <form className="bs1 p-2" onSubmit={updateOrderDetails} style={{
                display: "flex",
                borderRadius: "20px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,1)",
              }}>
                <div style={{ flex: 1, padding: "35px" }}>
                  <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                      className="form-control"
                      id="username" value={username} readOnly />
                  </div>
                  <br />

                  <div className="form-group">
                    <label>Department: </label>
                    <input type="text"
                      className="form-control" id="department" value={department} readOnly />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Maintenance Details: </label>
                    <input type="text"
                      className="form-control"
                      id="view" value={view} readOnly
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Maintainer: </label>
                    <input type="text"
                      className="form-control"
                      id="category" value={category} readOnly
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Status: </label>
                    <input type="text"
                      className="form-control"
                      id="status" value={status} readOnly
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Approval: </label>
                    <select
                      className="form-control"
                      id="approval"
                      value={approval}
                      onChange={(e) => setApproval(e.target.value)}
                      required
                    >
                      <option value="">Select Approval Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Not Approved">Not Approved</option>
                    </select>
                  </div>
                  <br />
                  {error && <div className="error">{error}</div>}
                  <br />

                  <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary" style={{
                      borderRadius: "10px",
                      width: "50%",
                      height: "40px",
                      backgroundColor: "#FD204F",
                      border: "1px solid #FD204F", // Border color
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)" // Shadow
                    }} />
                  </div>
                </div>

                <div
                  // image
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/computer-monitor-virtual-cloud-documents-with-information-isometric-vector-icons_107791-4547.jpg?t=st=1711778078~exp=1711781678~hmac=c7f19c9bd258c97d6f49ead4591b9c3862a3762750478f168340df396c47adaf&w=740"
                    style={{ width: "400px", height: "400px" }}
                  />
                </div>
              </form>
              <br />
            </Col>
          </Row>
        </Col>
      </Row>

      <Footers />
    </>
  );
}

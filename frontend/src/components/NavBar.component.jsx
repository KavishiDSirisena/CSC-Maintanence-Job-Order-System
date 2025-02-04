import React from "react";
import { Dropdown, Row, Col } from "antd";
import { Link } from "react-router-dom";




export default function NavBar(){

    const items = [
        {
          key: "1",
          label: <a href="/maintainanceStaff" style={{ textDecoration: "none" }}>Add Maintainer</a>,
        },
        {
          key: "2",
          label: <a href="/maintainanceOrder" style={{ textDecoration: "none" }}>Add Job Order</a>,
        },
        {
          key: "5",
          label: (
            <li
              onClick={() => {
                //localStorage.removeItem("user");
                //window.location.href = "/login";
              }}
              style={{ textDecoration: "none" }}>
              Logout
            </li>
          ),
        },
      ];
    
    //   const adminItems = [
    //     {
    //       key: "1",
    //       label: <a href="/">Home</a>,
    //     },
    //     {
    //       key: "2",
    //       label: <a href="/allbookings">All Bookings</a>,
    //     },
    //     {
    //       key: "3",
    //       label: (
    //         <li
    //           onClick={() => {
    //             localStorage.removeItem("user");
    //             window.location.href = "/login";
    //           }}
    //         >
    //           Logout
    //         </li>
    //       ),
    //     },
    //   ];



    return(
        <>
        
        <div className="header bs1" style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        //backgroundColor:"#80787b"
        }}>
        <Row  justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link
                    to="/"
                    style={{
                      color: "darkslategray",
                      letterSpacing: "1.5px",
                      fontSize: "30px",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src="https://www.colomboswimmingclub.org/wp-content/themes/csc/images/logo.png"
                      
                      alt="logo"
                      style={{
                        width: "100px",
                        height: "100%",
                        marginRight: "10px",
                        textDecoration: "none",
                      }}
                    />
                    Colombo Swimming Club Job Order System
                  </Link>
                </b>
              </h1>
              </div>
              </Col>
              <Col>
              <div className="d-flex justify-content-between">
              <Dropdown
                menu={{
                  items
                }}
                placement="bottom"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "45px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/desnqqj6a/image/upload/v1683887268/User-Profile-PNG-High-Quality-Image_mwetdc.png"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <p>Admin</p>
                </div>
              </Dropdown>
              </div>
              
            
          </Col>
        </Row>
      </div>
        </>
    )
}
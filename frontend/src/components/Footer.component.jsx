import { Component } from "react";
import { Footer } from "antd/es/layout/layout";

export default class Footers extends Component{


    render() {
        return (
            <>
                <Footer style={{ textAlign: "center",
                // backgroundColor: "#FD204F" 
            }}>
                {" "}
                    <span
                        style={{
                            color: "darkslategray",
                            letterSpacing: "1.5px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "inline-block",
                            width: "100%",
                            marginLeft : "100px",
                            
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        All rights Served ©2024 Colombo Swimming Club
                    </span>
                </Footer>


            </>
        )
    }



}
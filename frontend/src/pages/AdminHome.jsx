import { Row, Col, Card } from "antd";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import NavBar from "../components/NavBar.component";
import Footers from "../components/Footer.component";

export default function AdminHome() {

    const [reactionData, setReactionData] = useState([]);
    const chartRef = useRef(null);
    const [userCount, setUserCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/addorders')
            .then(response => response.json())
            .then(data => {
                const reactionCounts = {};
                data.forEach(addorder => {
                    if (addorder.reaction in reactionCounts) {
                        reactionCounts[addorder.department]++;
                    } else {
                        reactionCounts[addorder.department] = 1;
                    }
                });
                setReactionData(reactionCounts);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/users') 
            .then(response => response.json())
            .then(data => {
                setUserCount(data.length); 
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/addorders')
            .then(response => response.json())
            .then(data => {
                setOrderCount(data.length);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    useEffect(() => {
        if (Object.keys(reactionData).length > 0) {
            if (chartRef.current !== null) {
                chartRef.current.destroy(); // Destroy existing chart if it exists
            }
            const ctx = document.getElementById('myChart').getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(reactionData),
                    datasets: [{
                        data: Object.values(reactionData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            // Add more colors if you have more than 4 reactions 
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            // Add more colors if you have more than 4 reactions
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            chartRef.current = newChart; // Store the chart instance in ref
        }
    }, [reactionData]);

    return (
        <>
            <NavBar />

            <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}>
                <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>

                    <div style={{ paddingTop: "20vh" }}>
                        <a href="/" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold", }}>Analytics</a>
                        <br /><hr />
                        <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Final Order Report</a>
                        <br /><hr />
                        <a href="/StatusApproval" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Status Approval</a>
                        <br /><hr />
                        <a href="/orderlist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Orders</a>
                        <hr />
                    </div>

                </Col>


                <Col span={20}>
                    
                    <Row justify="center"style={{ padding: "20px" }}>
                        <Col xs={24} sm={12} style={{ padding: "20px", }}>
                        <Card title={<h2 style={{ fontSize: "24px", textAlign: "center", }}>Total User Count</h2>} style={{ backgroundColor: "#f0f0f0", textAlign: "center", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}> 
                        <h3 style={{ fontSize: "24px", color: "#FD204F", fontWeight: "bold" }}>{userCount}</h3>
                        </Card>
                        </Col>
                        <Col xs={24} sm={12} style={{ padding: "20px" }}>
                        <Card title={<h2 style={{ fontSize: "24px", textAlign: "center"  }}>Total Order Count</h2>} style={{ backgroundColor: "#f0f0f0", textAlign: "center",boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}>
                            <h3 style={{ fontSize: "24px", color: "#FD204F", fontWeight: "bold" }}>{orderCount}</h3>
                            </Card>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24}style={{ padding: "20px" }}>
                            <canvas id="myChart" width="500" height="500"></canvas>
                        </Col>

                        
                    </Row>

                </Col>
            </Row>

            <Footers />

        </>
    )
}

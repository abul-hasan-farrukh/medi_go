import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { BASE_URL } from "../../config";

function TestList() {

    const [tests, setTests] = useState([]);

    const API = `${BASE_URL}/show-tests`;
    const navigate = useNavigate();

    const checkLogin = (info) => {

        const email = localStorage.getItem("userEmail");

        if (email != null && info === 'sample') {
            alert("Proceeding for sample collection");
            // navigate("/user/sample-form");
        } else {
            navigate("/user/user-login");
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const res = await axios.get(API);
            setTests(res.data);
        } catch (error) {
            console.log("Error fetching tests");
        }
    };

    return (
        <>
            <Header />

            <div className="container py-5">

                <h2 className="text-center mb-4 fw-bold" style={{ color: "#2c3e50" }}>
                    🧪 Available Tests
                </h2>

                <div className="row">

                    {tests.length === 0 ? (
                        <h5 className="text-center">No Tests Available</h5>
                    ) : (
                        tests.map((item, index) => (
                            <div className="col-md-4 mb-4" key={index}>

                                <div
                                    className="card p-4 d-flex flex-column align-items-center"
                                    style={{
                                        borderRadius: "15px",
                                        backgroundColor: "#f8f9fa",
                                        minHeight: "270px",
                                        fontFamily: "Poppins",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        textAlign: "center"
                                    }}

                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                                    }}
                                >

                                    {/* Title */}
                                    <h5 style={{ fontWeight: "600", color: "#333" }}>
                                        {item.testName}
                                    </h5>

                                    {/* Type */}
                                    <p style={{ margin: "5px 0", color: "#555" }}>
                                        <strong>Type:</strong> {item.testType}
                                    </p>

                                    {/* Sample */}
                                    <p style={{ margin: "5px 0", color: "#555" }}>
                                        <strong>Sample:</strong> {item.sampleRequired}
                                    </p>

                                    {/* Report Time */}
                                    <p style={{ margin: "5px 0", color: "#555" }}>
                                        <strong>Report:</strong> {item.reportTime}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-2">
                                        <strong>Price:</strong><br />
                                        <span style={{
                                            color: "green",
                                            fontWeight: "600",
                                            fontSize: "18px"
                                        }}>
                                            ₹ {item.testPrice}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>

            <Footer />
        </>
    );
}

export default TestList;
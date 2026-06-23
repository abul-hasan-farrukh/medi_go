import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FaVial, FaClock, FaFlask } from "react-icons/fa";
import PathologyChatbotPage from '../user/PathologyChatbotPage'
import { BASE_URL } from "../../config";


function TestList() {

    const [tests, setTests] = useState([]);

    const API = `${BASE_URL}/show-tests`;
    const navigate = useNavigate();

    const checkLogin = (info) => {

        const email = localStorage.getItem("userEmail");

        // if (email != null && info === 'sample') {
        //     alert("Proceeding for sample collection");
        //     navigate("/user/sample-form");
        // } else {
        //     navigate("/user/user-login");
        // }
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
            <PathologyChatbotPage />
            {/* HERO SECTION */}
            <section className="bg-primary bg-gradient text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold mb-3">Diagnostic Tests</h1>
                    <p className="lead">
                        Book reliable diagnostic tests with fast reports and home sample collection.
                    </p>
                </div>
            </section>

            <div className="container py-5">

                <h3 className="text-center fw-bold mb-5" style={{ fontFamily: "Poppins" }}>
                    {/* Available Tests */}
                </h3>

                <div className="row">

                    {tests.length === 0 ? (
                        <h5 className="text-center">No Tests Available</h5>
                    ) : (
                        tests.map((item, index) => (
                            <div className="col-md-4 mb-4" key={index}>

                                <div
                                    className="card border-0 h-100"
                                    style={{
                                        borderRadius: "18px",
                                        background: "#ffffff",
                                        fontFamily: "Poppins",
                                        transition: "all 0.35s ease",
                                        cursor: "pointer",
                                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                                        overflow: "hidden"
                                    }}

                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-10px)";
                                        e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.15)";
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
                                    }}
                                >

                                    {/* Top Accent */}
                                    <div style={{
                                        height: "6px",
                                        background: "linear-gradient(90deg, #2563eb, #06b6d4)"
                                    }}></div>

                                    <div className="p-4 d-flex flex-column justify-content-between h-100">

                                        {/* Title */}
                                        <h5 style={{
                                            fontWeight: "600",
                                            color: "#1f2937"
                                        }}>
                                            {item.testName}
                                        </h5>

                                        {/* Details */}
                                        <div className="mt-2" style={{ fontSize: "14px", color: "#4b5563" }}>

                                            <p className="mb-2 d-flex align-items-center gap-2">
                                                <FaFlask style={{ color: "#2563eb" }} />

                                                <span>Type: {item.testType}</span>  
                                            </p>

                                            <p className="mb-2 d-flex align-items-center gap-2">
                                                <FaVial style={{ color: "#2563eb" }} />
                                                <span>Sample: {item.sampleRequired}</span>  
                                            </p>

                                            <p className="mb-2 d-flex align-items-center gap-2">
                                                <FaClock style={{ color: "#2563eb" }} />
                                                <span>Report: {item.reportTime}</span>
                                            </p>
                                        </div>

                                        {/* Bottom Section */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">

                                            {/* Price */}
                                            <div>
                                                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                                                    Starting from
                                                </span>
                                                <br />
                                                <span style={{
                                                    color: "#16a34a",
                                                    fontWeight: "600",
                                                    fontSize: "20px"
                                                }}>
                                                    ₹ {item.testPrice}
                                                </span>
                                            </div>

                                            {/* CTA Button */}
                                            {/* <button
                                                className="btn btn-sm"
                                                style={{
                                                    background: "#2563eb",
                                                    color: "#fff",
                                                    borderRadius: "20px",
                                                    padding: "6px 14px",
                                                    border: "none"
                                                }}
                                                onClick={() => checkLogin('sample')}
                                            >
                                                Book Now
                                            </button> */}

                                        </div>

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
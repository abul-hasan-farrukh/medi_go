import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";
import { BASE_URL } from "../../config";

function RequestStatus() {

    const [requestData, setRequestData] = useState([]);

    const userEmail = localStorage.getItem("userEmail");

    // function to show AM and PM after time.
    const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    let h = parseInt(hour);

    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h}:${minute} ${ampm}`;
};

    // Fetch user's requests
    useEffect(() => {

        const fetchRequests = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/user/myRequests/${userEmail}`
                );
                setRequestData(res.data);
            } catch (error) {
                console.log("ERROR FETCHING USER REQUESTS:", error);
            }
        };

        fetchRequests();

    }, [userEmail]);

    return (
        <>

        <UserHeader/>

        <div
            style={{
                marginLeft: "40px",
                marginTop: "70px",
                padding: "20px",
                fontFamily: "poppins"
            }}
        >

            <h3 className="text-center mb-4 fw-bold">
                Your Sample Requests
            </h3>

            <div className="container-fluid">
                <div className="row">

                    {requestData.length === 0 ? (
                        <p className="text-center">No requests found</p>
                    ) : (

                        requestData.map((robj) => (

                            <div className="col-md-4 mb-4" key={robj.id}>
                                <div className="card shadow-sm h-100 rounded-4">

                                    <div className="card-body">

                                        {/* USER EMAIL */}
                                        <h6 className="fw-bold text-primary">
                                            {/* 📧 {robj.email} */}
                                        </h6>

                                        {/* <hr /> */}

                                        {/* SAMPLE + TIME */}
                                        <p><strong>🧪 Sample:</strong> {robj.sample_type}</p>
                                        <p><strong>⏰ Time:</strong> {formatTime(robj.preferred_time)}</p>

                                        {/* WORKER DETAILS */}
                                        {robj.worker_name ? (
                                            <>
                                                <p><strong>👤 Worker Name:</strong> {robj.worker_name}</p>
                                                <p><strong>📧 Worker Email:</strong> {robj.worker_email}</p>
                                                <p><strong>📞 Worker Phone:</strong> {robj.worker_phone}</p>
                                            </>
                                        ) : (
                                            <p className="text-muted">
                                                ⏳ Worker not assigned yet
                                            </p>
                                        )}

                                        {/* STATUS */}
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span className={`badge ${
                                                robj.status === "pending" ? "bg-warning" :
                                                robj.status === "assigned" ? "bg-primary" :
                                                "bg-success"
                                            }`}>
                                                {robj.status}
                                            </span>
                                        </p>

                                        {/* COMPLETED MESSAGE */}
                                        {robj.status === "completed" && (
    <>
        <p className="text-success fw-bold mt-2">
            ✔ Sample Collected Successfully
        </p>

        {/* ✅ SHOW TEST DETAILS */}
        {robj.testName && (
            <p>
               <strong>🔬 Test Required:</strong> {robj.testName}
            </p>
        )}
    </>
)}

                                    </div>
                                </div>
                            </div>

                        ))
                    )}

                </div>
            </div>

        </div>
        </>
    );
}

export default RequestStatus;
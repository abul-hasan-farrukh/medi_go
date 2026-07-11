import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SampleCollectorHeader from "./SampleCollectorHeader";
import { BASE_URL } from "../../config";

function AssignedRequest() {
    const APIURL = `${BASE_URL}/worker/sampleData`

    const workerEmail = localStorage.getItem("workerEmail");

    const [requestData, setRequestData] = useState([]);

    // const [sampleData, setSampleData] = useState({ id: 0, testName: "", email: workerEmail });

    const [testData, setTestData] = useState({});
    const [editMode, setEditMode] = useState({});

    // function to show AM and PM after time.
    const formatTime = (time) => {
        if (!time) return "";

        const [hour, minute] = time.split(":");
        let h = parseInt(hour);

        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;

        return `${h}:${minute} ${ampm}`;
    };

    //set values for sample test
    const fetchData = (e, id) => {
        setTestData({
            ...testData,
            [id]: e.target.value
        });
    };

    const submitForm = async (e, id) => {
        e.preventDefault();

        if (!testData[id] || !testData[id].trim()) {
            Swal.fire({
                icon: "warning",
                title: "Test Details Required",
                text: "Please enter test details"
            });
            return;
        }

        try {

            await axios.post(APIURL, {
                id: id,
                testName: testData[id]
            });

            Swal.fire({
                icon: "success",
                title: "Test Saved Successfully"
            });

            // update UI
            const updated = requestData.map(obj =>
                obj.id === id ? { ...obj, testName: testData[id] } : obj
            );

            setRequestData(updated);

            // hide textarea after saving
            setEditMode({ ...editMode, [id]: false });

        } catch (err) {
            console.log(err);
        }
    };

    // fetch all assigned requests
    useEffect(() => {

        const fetchAssignedRequest = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/worker/assignedRequests/${workerEmail}`
                );
                setRequestData(res.data);
            } catch (error) {
                console.log("ERROR FETCHING:", error);
            }
        };

        fetchAssignedRequest();

    }, [workerEmail]);

    // mark request as completed
    const markCompleted = async (id) => {

        const req = requestData.find(r => r.id === id);

        if (!req.testName) {
            Swal.fire({
                icon: "warning",
                title: "Test Details Required",
                text: "Please save test details first"
            });
            return;
        }

        try {
            await axios.put(`${BASE_URL}/worker/completeRequest/${id}`);

            const updatedArray = requestData.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, status: "completed" };
                }
                return obj;
            });

            setRequestData(updatedArray);

            Swal.fire({
                icon: "success",
                title: "Sample Collected Successfully"
            });

        } catch (error) {
            console.log(error);
        }
    };

    // REJECT REQUEST
    const rejectRequest = async (id) => {

        const confirm = await Swal.fire({
            title: "Reject Request?",
            text: "This will remove the request",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`${BASE_URL}/worker/deleteRequest/${id}`);

            const updatedArray = requestData.filter((obj) => obj.id !== id);

            setRequestData(updatedArray);

            Swal.fire({
                icon: "success",
                title: "Request Rejected"
            });

        } catch (error) {
            console.log("DELETE ERROR:", error);
        }
    };

    return (
        <>
            <SampleCollectorHeader />

            <div
                style={{
                    marginLeft: "40px",
                    marginTop: "70px",
                    padding: "20px",
                    fontFamily: "poppins"
                }}
            >

                <h3 className="text-center mb-4 fw-bold">
                    📋 Assigned Requests
                </h3>

                <div className="container-fluid">
                    <div className="row">

                        {requestData.length === 0 ? (
                            <p className="text-center">No assigned requests</p>
                        ) : (

                            requestData.map((robj) => (

                                <div className="col-md-4 mb-4" key={robj.id}>
                                    <div className="card shadow-sm h-100 rounded-4">

                                        <div className="card-body">

                                            <h6 className="fw-bold text-primary">
                                                <p><strong>👤 Patient Name:</strong> {robj.userName}</p>
                                            </h6>

                                            <hr />

                                            <p><strong>📧 Email:</strong> {robj.email} </p>
                                            <p><strong>📞 Phone:</strong> {robj.phoneNumber}</p>
                                            <p><strong>🏠 Address:</strong> {robj.address}</p>
                                            <p><strong>🧪 Sample:</strong> {robj.sample_type}</p>
                                            <p><strong>📅 Date:</strong> {robj.sample_collection_date}</p>
                                            <p><strong>⏰ Time:</strong> {formatTime(robj.preferred_time)}</p>

                                            {!robj.testName && robj.status === "assigned" && (
                                                <form onSubmit={(e) => submitForm(e, robj.id)}>

                                                    <textarea
                                                        className="form-control mb-2"
                                                        placeholder="Enter test details"
                                                        value={testData[robj.id] || ""}
                                                        onChange={(e) => fetchData(e, robj.id)}
                                                    ></textarea>

                                                    <button className="btn btn-sm btn-primary mb-2">
                                                        Save Test Details
                                                    </button>

                                                </form>
                                            )}


                                            {/* Show test details and edit option */}
                                            {robj.testName && robj.status !== "completed" && (
                                                <div>
                                                    <p><strong>🔬 Test Required:</strong> {robj.testName}</p>

                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => setEditMode({ ...editMode, [robj.id]: true })}
                                                    >
                                                        ✏ Edit Details
                                                    </button>
                                                </div>
                                            )}

                                            {/* Option to edit test details  */}
                                            {editMode[robj.id] && (
                                                <form onSubmit={(e) => submitForm(e, robj.id)}>

                                                    <textarea
                                                        className="form-control mb-2"
                                                        value={testData[robj.id] || robj.testName}
                                                        onChange={(e) => fetchData(e, robj.id)}
                                                    ></textarea>

                                                    <button className="btn btn-sm btn-success">
                                                        Update
                                                    </button>

                                                </form>
                                            )}

                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span className={`badge ${robj.status === "assigned" ? "bg-primary" :
                                                    robj.status === "completed" ? "bg-success" :
                                                        "bg-danger"
                                                    }`}>
                                                    {robj.status}
                                                </span>
                                            </p>

                                            {/* ACTION BUTTONS */}
                                            {robj.status === "assigned" && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => markCompleted(robj.id)}
                                                    >
                                                        Mark Completed
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => rejectRequest(robj.id)}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {robj.status === "completed" && (
                                                <>
                                                    <p><strong>🔬 Test Required:</strong> {robj.testName}</p>

                                                    <p className="text-success fw-bold mt-2">
                                                        ✔ Sample Collected
                                                    </p>
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

export default AssignedRequest;
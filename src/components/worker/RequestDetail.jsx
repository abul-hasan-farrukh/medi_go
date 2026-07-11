import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UploadReport from "./UploadReport";
import { BASE_URL } from "../../config";


// It is a parent component of UploadReport.jsx because
// It holds main data (requestArray)
// It controls UI state using setRequestData
// It renders multiple requests
function RequestDetail({ requestArray, setRequestData }) {

    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState({});

    // function to show AM and PM after time.
    const formatTime = (time) => {
        if (!time) return "";

        const [hour, minute] = time.split(":");
        let h = parseInt(hour);

        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;

        return `${h}:${minute} ${ampm}`;
    };

    const groupedRequests = requestArray.reduce((acc, obj) => {

        const key = obj.userName; // group by patient name

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(obj);

        return acc;

    }, {});

    // fetching sample collectors 
    useEffect(() => {

        const fetchWorkers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/worker/sampleCollectors`);
                setWorkers(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWorkers();

    }, []);

    // storing selector sample collector
    const handleSelect = (id, value) => {
        setSelectedWorker({
            ...selectedWorker,
            [id]: JSON.parse(value)
        });
    };

    // assign sample collector
    const assignWorker = async (id) => {

        const worker = selectedWorker[id];

        if (!worker) {
            Swal.fire("Please select sample collector");
            return;
        }

        try {
            const res = await axios.put(
                `${BASE_URL}/worker/assignRequest/${id}`,
                {
                    name: worker.name,
                    email: worker.email,
                    phone: worker.phone
                }
            );

            // UPDATE UI WITHOUT RELOAD
            const updatedArray = requestArray.map((obj) => {
                if (obj.id === id) {
                    return {
                        ...obj,
                        status: "assigned",
                        worker_name: worker.name,
                        worker_email: worker.email,
                        worker_phone: worker.phone
                    };
                }
                return obj;
            });

            setRequestData(updatedArray);

            Swal.fire("Assigned Successfully");

        } catch (error) {
            console.log(error);
        }
    };

    // mark request as completed
    const markCompleted = async (id) => {

        try {
            await axios.put(`${BASE_URL}/worker/completeRequest/${id}`);

            const updatedArray = requestArray.map((obj) => {
                if (obj.id === id) {
                    return { ...obj, status: "completed" };
                }
                return obj;
            });

            setRequestData(updatedArray);

            Swal.fire("Marked as completed");

        } catch (error) {
            console.log(error);
        }
    };

    // reject request (DELETE)
    const rejectRequest = async (id) => {

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This request will be removed",
            icon: "warning",
            showCancelButton: true
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`${BASE_URL}/worker/deleteRequest/${id}`);

            // REMOVE FROM UI after deleting
            const updatedArray = requestArray.filter((obj) => obj.id !== id);

            setRequestData(updatedArray);

            Swal.fire("Request Deleted");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid">

            {Object.keys(groupedRequests).map((patientName, index) => (

                <div key={index} className="mb-5">

                    {/* PATIENT HEADER */}
                    <div className="card shadow-sm mb-3" style={{ backgroundColor: "#f8f9fa" }}>
                        <div className="card-body">
                            <h5 className="fw-bold text-primary">
                                👤 Patient: {patientName}
                            </h5>
                        </div>
                    </div>

                    {/*  REQUESTS OF THAT PATIENT */}
                    <div className="row">

                        {groupedRequests[patientName].map((robj) => (

                            <div className="col-md-4 mb-4" key={robj.id}>
                                <div className="card shadow-sm h-100">

                                    <div className="card-body">

                                        <p><strong>📧 Email:</strong> {robj.email}</p>
                                        <p><strong>📞 Phone:</strong> {robj.phoneNumber}</p>
                                        <p><strong>🏠 Address:</strong> {robj.address}</p>
                                        <p><strong>🧪 Sample:</strong> {robj.sample_type}</p>
                                        <p><strong>📅 Date:</strong> {robj.sample_collection_date}</p>
                                        <p><strong>⏰ Time:</strong> {formatTime(robj.preferred_time)}</p>

                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span className={`badge ${robj.status === "pending" ? "bg-warning" :
                                                robj.status === "assigned" ? "bg-primary" :
                                                    "bg-success"
                                                }`}>
                                                {robj.status}
                                            </span>
                                        </p>

                                        {/* SAME BUTTON LOGIC (NO CHANGE) */}

                                        {robj.status === "pending" && (
                                            <>
                                                <select
                                                    className="form-select mb-2"
                                                    onChange={(e) => handleSelect(robj.id, e.target.value)}
                                                >
                                                    <option value="">Select Sample Collector</option>

                                                    {workers.map((wobj) => (
                                                        <option key={wobj.email} value={JSON.stringify(wobj)}>
                                                            {wobj.name} | {wobj.email} | {wobj.phone}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => assignWorker(robj.id)}
                                                >
                                                    Assign
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => rejectRequest(robj.id)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {robj.status === "assigned" && (
                                            <>
                                                <p className="mt-2 text-primary fw-bold">
                                                    Assigned to: {robj.worker_name} | {robj.worker_email} | {robj.worker_phone}
                                                </p>

                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => markCompleted(robj.id)}
                                                >
                                                    Mark Completed
                                                </button>
                                            </>
                                        )}

                                        {robj.status === "completed" && (
                                            <>
                                                <p className="text-success fw-bold mt-2">
                                                    ✔ Sample Collected
                                                </p>

                                                {/* ✅ SHOW TEST DETAILS */}
                                                {robj.testName && (
                                                    <p>
                                                        <strong>🔬 Test Required: </strong> {robj.testName}
                                                    </p>
                                                )}

                                                <UploadReport
                                                    requestId={robj.id}
                                                    onUploadSuccess={(id, fileName) => {

                                                        const updatedArray = requestArray.map((obj) => {
                                                            if (obj.id === id) {
                                                                return { ...obj, reportFile: fileName };
                                                            }
                                                            return obj;
                                                        });

                                                        setRequestData(updatedArray);
                                                    }}
                                                />

                                                {robj.reportFile && (
                                                    <p className="text-success fw-bold">
                                                        You have uploaded {robj.reportFile}
                                                    </p>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>

            ))}

        </div>
    );
}

export default RequestDetail;
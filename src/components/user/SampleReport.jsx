import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";

function SampleReport() {

    
    const [reportData, setReportData] = useState([]);
    
    const userEmail = localStorage.getItem("userEmail");
    const API_URL = `http://localhost:9090/user/myRequests/${userEmail}`

    // Fetch all user requests
    useEffect(() => {

        const fetchReports = async () => {
            try {
                const res = await axios.get(
                    API_URL
                );

                // only show completed + uploaded reports
                const filtered = res.data.filter(
                    (obj) => obj.status === "completed" && obj.reportFile
                );

                setReportData(filtered);

            } catch (error) {
                console.log("ERROR FETCHING REPORTS:", error);
            }
        };

        fetchReports();

    }, [userEmail]);



    // download report
    const downloadReport = (fileName) => {

        const fileURL = `http://localhost:9090/uploads/samplereports/${fileName}`;

        // open file in new tab
        window.open(fileURL, "_blank");
    };



    return (
        <>
            <UserHeader />

            <div
                style={{
                    marginLeft: "40px",
                    marginTop: "70px",
                    padding: "20px",
                    fontFamily: "poppins"
                }}
            >

                {/* HEADING */}
                <h3 className="text-center mb-4 fw-bold">
                    Your Sample Reports
                </h3>

                <div className="container">

                    {reportData.length === 0 ? (
                        <p className="text-center">No reports available</p>
                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover shadow">

                                <thead className="table-dark text-center">
                                    <tr>
                                        <th>Sample</th>
                                        {/* <th>Test Required</th> */}
                                        <th>Download Report</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center">

                                    {reportData.map((robj) => (

                                        <tr key={robj.id}>

                                            {/* SAMPLE */}
                                            <td>{robj.sample_type}</td>

                                            {/* TEST DETAILS */}
                                            {/* <td>{robj.testName}</td> */}

                                            {/* DOWNLOAD BUTTON */}
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => downloadReport(robj.reportFile)}
                                                >
                                                    ⬇ Download
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}

export default SampleReport;
import WorkerHeader from "./WorkerHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import RequestDetail from "./RequestDetail";

function AllRequest() {

    const APIURL = "http://localhost:9090/worker/allSampleRequests"; // backend API defined in workerController

    const [requestData, setRequestData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const serverResponse = await axios.get(APIURL);
                console.log(serverResponse.data);

                setRequestData(serverResponse.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <WorkerHeader />

            <div
                style={{
                    marginTop: "80px",
                    padding: "20px",
                    fontFamily: "poppins"
                }}
            >
                <h3 className="text-center fw-bold mb-4">
                    🧪 Sample Collection Requests
                </h3>

                <RequestDetail requestArray={requestData}
    setRequestData={setRequestData} />
            </div>
        </>
    );
}

export default AllRequest;
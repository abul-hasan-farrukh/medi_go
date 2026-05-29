import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import defaultProfilePic from "../../assets/user.jpeg";
import SampleCollectorHeader from './SampleCollectorHeader';

function SampleCollectorDashboard() {

    const email = localStorage.getItem("workerEmail")
    const location = useLocation();

    const PROFILE_API = `http://localhost:9090/worker/workerProfile/${email}`
    const REQUEST_API = `http://localhost:9090/worker/assignedRequests/${email}`

    const [userdata, setUserdata] = useState({
        name: "",
        type: "",
        phone: "",
        qualification: "",
        experience: ""
    })

    const [profilePic, setProfilePic] = useState(defaultProfilePic)
    const [requests, setRequests] = useState([])

    // FETCH PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(PROFILE_API)
                setUserdata(res.data)

                let imageUrl = defaultProfilePic;

                if (location.state?.imageURL) {
                    imageUrl = location.state.imageURL;
                }
                else if (res.data.profilePic) {
                    imageUrl = `http://localhost:9090/uploads/workerimages/${res.data.profilePic}`;
                }

                setProfilePic(imageUrl)

            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()
    }, [])

    // FETCH REQUESTS
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(REQUEST_API)
                setRequests(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchRequests()
    }, [])

    // UPDATE STATUS
    const updateStatus = async (id, status) => {
    try {

        if (status === "completed") {
            await axios.put(`http://localhost:9090/worker/completeRequest/${id}`);
        } else if (status === "rejected") {
            await axios.delete(`http://localhost:9090/worker/deleteRequest/${id}`);
        }

        setRequests(prev =>
            prev.map(req =>
                req.id === id ? { ...req, status: status } : req
            )
        )

    } catch (error) {
        console.log(error)
    }
}

    return (
        <>
            <SampleCollectorHeader />

            <div style={{ marginTop: "80px", background: "#ffffff", minHeight: "100vh" }}>

                {/* PROFILE CARD */}
                <div className="container mb-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">

                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-4 text-center">

                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="rounded-circle shadow mb-3"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            border: "4px solid #0d6efd"
                                        }}
                                    />

                                    <h5>{userdata.name}</h5>
                                    <p className="text-muted">{userdata.type}</p>

                                    <hr />

                                    <p><strong>📞 Phone:</strong> {userdata.phone}</p>
                                    <p><strong>🎓 Qualification:</strong> {userdata.qualification}</p>
                                    <p><strong>💼 Experience:</strong> {userdata.experience} Years</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SampleCollectorDashboard
import axios from 'axios'
import { useEffect, useState } from 'react'
import WorkerHeader from './WorkerHeader'
import defaultProfilePic from "../../assets/user.jpeg";
import { useLocation } from 'react-router-dom';
//useLocation is used to fetch the value of state object attribute.
import { BASE_URL } from "../../config";



function WorkerDashboard() {
    //fetching value from localstorage
    const email = localStorage.getItem("workerEmail")
    const location = useLocation();

    const APIURL = `${BASE_URL}/worker/workerProfile/${email}` //Injecting email in the path, this is a backend API path

    const [userdata, setUserdata] = useState({
        name: "",
        type: "",
        phone: "",
        qualification: "",
        experience: ""
    })
    const [profilePic, setProfilePic] = useState(defaultProfilePic);


    useEffect(() => {
        const fetchData = async () => {

            try {
                const serverResponse = await axios.get(APIURL)
                console.log(serverResponse.data);
                setUserdata(serverResponse.data); //setting all the worker data returned by Backend to React state variable

                let imageUrl = defaultProfilePic;

                //If image came from navigation (after upload)
                if (location.state?.imageURL) {
                    imageUrl = location.state.imageURL;
                }

                //  If image exists in database
                else if (serverResponse.data.profilePic) {
                    imageUrl = `${BASE_URL}/uploads/workerimages/${serverResponse.data.profilePic}`;
                }

                setProfilePic(imageUrl);


            } catch (error) { //error is simply an object which catches error.
                console.log(error);

            }
        }


        fetchData()
    }, []) //useEffect needs callback function and dependency array


    return (
        <>
            <WorkerHeader name={userdata.name} />
            <div className='main-div'>

                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">

                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-4">

                                    {/* Profile Image */}
                                    <div className="text-center mb-3">
                                        <img
                                            src={profilePic}
                                            alt="Profile"
                                            className="rounded-circle shadow"
                                            style={{
                                                width: "130px",
                                                height: "130px",
                                                objectFit: "cover",
                                                border: "4px solid #0d6efd"
                                            }}
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-user fa-lg text-success me-3"></i>
                                        <div>
                                            <strong>Name</strong>
                                            <div>{userdata.name}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    {/* Worker Type */}
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-briefcase fa-lg text-primary me-3"></i>
                                        <div>
                                            <strong>Worker Type</strong>
                                            <div>{userdata.type}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    {/* Phone */}
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-phone fa-lg text-warning me-3"></i>
                                        <div>
                                            <strong>Phone</strong>
                                            <div>{userdata.phone}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    {/* Qualification */}
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-graduation-cap fa-lg text-info me-3"></i>
                                        <div>
                                            <strong>Qualification</strong>
                                            <div>{userdata.qualification}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    {/* Experience */}
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-briefcase fa-lg text-danger me-3"></i>
                                        <div>
                                            <strong>Experience</strong>
                                            <div>{userdata.experience} Years</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <div className=' d-flex justify-content-between' style={{marginLeft: "90px",marginTop:"70px"}}>
        <span><i className="fas fa-user-circle"></i> Name: {userdata.name}</span> 
        <span><i className="fas fa-briefcase"></i> Type: {userdata.type}</span> 
        <span><i className="fas fa-envelope"></i> Email: {email}</span> 
        </div> */}

            </div>

        </>
    )
}

export default WorkerDashboard
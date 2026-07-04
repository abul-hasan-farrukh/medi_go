import axios from 'axios'
import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import defaultProfilePic from "../../assets/user.jpeg";
import { useLocation } from 'react-router-dom';
//useLocation is used to fetch the value of state object attribute.
import { BASE_URL } from "../../config";



function UserDashboard() {
    //fetching value from localstorage
    const email = localStorage.getItem("userEmail")
    const location = useLocation();

    const APIURL = `${BASE_URL}/user/userProfile/${email}` //Injecting email in the path

    const [userdata, setUserdata] = useState({ name: "", phone: "", city: "" })
    const [profilePic, setProfilePic] = useState(defaultProfilePic);


    useEffect(() => {
        const fetchData = async () => {

            try {
                const serverResponse = await axios.get(APIURL)
                console.log(serverResponse.data);
                setUserdata(serverResponse.data); //setting all the admin data returned by Backend to React state variable

                let imageUrl = defaultProfilePic;

                //If image came from navigation (after upload)
                if (location.state?.imageURL) {
                    imageUrl = location.state.imageURL;
                }

                //  If image exists in database
                else if (serverResponse.data.profilePic) {
                    imageUrl = `${BASE_URL}/uploads/userimages/${serverResponse.data.profilePic}`;
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
            <UserHeader name={userdata.name}/>
            <div className='main-div'>

                <div className="container" style={{ marginTop: "100px" }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">

                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-4">

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

                                    {/* <h4 className="text-center mb-4"> */}
                                        {/* <i className="fas fa-user-circle me-2 text-primary"></i> */}
                                        {/* User Profile */}
                                    {/* </h4> */}

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-user fa-lg text-success me-3"></i>
                                        <div>
                                            <strong>Name</strong>
                                            <div>{userdata.name}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-phone fa-lg text-warning me-3"></i>
                                        <div>
                                            <strong>Phone</strong>
                                            <div>{userdata.phone}</div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-city fa-lg text-danger me-3"></i>
                                        <div>
                                            <strong>City</strong>
                                            <div>{userdata.city}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <div className=' d-flex justify-content-between' style={{marginLeft: "90px",marginTop:"70px"}}>
        <span><i className="fas fa-user-circle"></i> Name: {userdata.name}</span> 
        <span><i className="fas fa-phone"></i> Phone: {userdata.phone}</span> 
        <span><i className="fas fa-home"></i> City: {userdata.city}</span> 
        <span><i className="fas fa-envelope"></i> Email: {email}</span> 
        </div> */}

            </div>

        </>
    )
}

export default UserDashboard

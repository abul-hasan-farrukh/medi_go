import axios from 'axios'
import { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function UserEditProfile() {

    const email = localStorage.getItem("userEmail")
    const navigate = useNavigate();

    const APIURL = `http://localhost:9090/user/userProfile/${email}`
    const EDITAPIURL = `http://localhost:9090/user/editProfile/${email}`

    const [userdata, setUserdata] = useState({
        name: "",
        phone: "",
        city: ""
    })


    useEffect(() => {

        const fetchData = async () => {

            try {

                const serverResponse = await axios.get(APIURL)

                setUserdata({
                    name: serverResponse.data.name,
                    phone: serverResponse.data.phone,
                    city: serverResponse.data.city
                })

            } catch (error) {
                console.log(error);
            }

        }

        fetchData()

    }, [])



    // input validation
    const fillData = (e) => {

        const { name, value } = e.target;

        // Name validation
        if (name === "name") {

            const nameRegex = /^[A-Za-z\s]*$/;

            if (!nameRegex.test(value)) {
                toast.error("Name should contain only letters");
                return;
            }
        }

        // Phone validation
        if (name === "phone") {

            const phoneRegex = /^[0-9]*$/;

            if (!phoneRegex.test(value)) {
                toast.error("Phone number must contain only digits");
                return;
            }

            if (value.length > 10) {
                toast.error("Phone number must be 10 digits");
                return;
            }
        }

        // City validation
        if (name === "city") {

            const cityRegex = /^[A-Za-z\s]*$/;

            if (!cityRegex.test(value)) {
                toast.error("City should contain only letters");
                return;
            }
        }

        setUserdata({ ...userdata, [name]: value })
    }



    // submit form
    const submitData = async (e) => {

        e.preventDefault()

        if (
            userdata.name.trim() === "" ||
            userdata.phone.trim() === "" ||
            userdata.city.trim() === ""
        ) {
            toast.error("All fields are required")
            return
        }

        if (userdata.phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits")
            return
        }

        try {

            const serverResponse = await axios.put(EDITAPIURL, userdata)

            console.log(serverResponse);

            toast.success("Profile Updated Successfully 😊")

            setTimeout(() => {
                navigate("/user/user-dashboard")
            }, 2500)

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }
    }



    return (
        <>
            <UserHeader />

            <ToastContainer position='top-right' autoClose={2500} />

            <div className="container" style={{ marginTop: "90px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6 col-md-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body p-5">

                                <h3 className="text-center mb-4 fw-bold">
                                    <i className="fa-solid fa-user-pen text-primary me-2"></i>
                                    Edit Profile
                                </h3>

                                <form onSubmit={submitData}>

                                    {/* Name */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-user me-2 text-secondary"></i>
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={userdata.name}
                                            className="form-control form-control-lg"
                                            placeholder="Enter your name"
                                            onChange={fillData}
                                        />

                                    </div>



                                    {/* Phone */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-phone me-2 text-secondary"></i>
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            value={userdata.phone}
                                            className="form-control form-control-lg"
                                            placeholder="Enter phone number"
                                            onChange={fillData}
                                        />

                                    </div>



                                    {/* City */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-city me-2 text-secondary"></i>
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={userdata.city}
                                            className="form-control form-control-lg"
                                            placeholder="Enter your city"
                                            onChange={fillData}
                                        />

                                    </div>



                                    {/* Email */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-envelope me-2 text-secondary"></i>
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={email}
                                            className="form-control form-control-lg bg-light"
                                            readOnly
                                        />

                                    </div>



                                    {/* Button */}
                                    <div className="d-grid mt-4">

                                        <button className="btn btn-success btn-lg">

                                            <i className="fa-solid fa-floppy-disk me-2"></i>
                                            Save Changes

                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default UserEditProfile
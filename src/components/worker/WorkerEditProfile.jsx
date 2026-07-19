import axios from 'axios'
import { useEffect, useState } from 'react'
import WorkerHeader from './WorkerHeader'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";


function WorkerEditProfile() {

    const email = localStorage.getItem("workerEmail")
    const navigate = useNavigate();

    const APIURL = `${BASE_URL}/worker/workerProfile/${email}`
    const EDITAPIURL = `${BASE_URL}/worker/editProfile/${email}`

    const [workerdata, setWorkerdata] = useState({
        name: "",
        type: "",
        phone: "",
        qualification: "",
        experience: ""
    })


    useEffect(() => {

        const fetchData = async () => {

            try {

                const serverResponse = await axios.get(APIURL)

                setWorkerdata({
                    name: serverResponse.data.name,
                    type: serverResponse.data.type,
                    phone: serverResponse.data.phone,
                    qualification: serverResponse.data.qualification,
                    experience: serverResponse.data.experience
                })

            } catch (error) {
                console.log(error);
            }

        }

        fetchData()

    }, [])



    // validation + input handler
    const fillData = (e) => {

        const { name, value } = e.target;

        // Name validation
        if (name === "name") {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                toast.error("Name should contain only letters");
                return;
            }
        }

        // Phone validation
        if (name === "phone") {
            if (!/^[0-9]*$/.test(value)) {
                toast.error("Phone must contain only digits");
                return;
            }
            if (value.length > 10) {
                toast.error("Phone must be 10 digits");
                return;
            }
        }

        // Qualification validation
        if (name === "qualification") {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                toast.error("Qualification should contain only letters");
                return;
            }
        }

        // Experience validation (only numbers)
        if (name === "experience") {
            if (!/^[0-9]*$/.test(value)) {
                toast.error("Experience must be in numbers (years)");
                return;
            }
        }

        setWorkerdata({ ...workerdata, [name]: value })

    }



    // submit form
    const submitData = async (e) => {

        e.preventDefault()

        if (
            workerdata.name.trim() === "" ||
            workerdata.type.trim() === "" ||
            workerdata.phone.trim() === "" ||
            workerdata.qualification.trim() === "" ||
            workerdata.experience.trim() === ""
        ) {
            toast.error("All fields are required")
            return
        }

        if (workerdata.phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits")
            return
        }

        try {

            const serverResponse = await axios.put(EDITAPIURL, {
                name: workerdata.name,
                type: workerdata.type,
                phone: workerdata.phone,
                qualification: workerdata.qualification,
                experience: workerdata.experience
            })

            console.log(serverResponse);

            toast.success("Profile Updated Successfully 😊")

            setTimeout(() => {
                navigate("/worker/worker-dashboard")
            }, 2500)

        } catch (error) {

            console.log(error);
            toast.error("Something went wrong!")

        }

    }



    return (
        <>
            <WorkerHeader />

            <ToastContainer position='top-right' autoClose={2500} />

            <div className="container" style={{ marginTop: "110px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6 col-md-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body p-5">

                                <h3 className="text-center mb-4 fw-bold">
                                    <i className="fa-solid fa-user-pen text-primary me-2"></i>
                                    Edit Worker Profile
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
                                            value={workerdata.name}
                                            className="form-control form-control-lg"
                                            onChange={fillData}
                                        />
                                    </div>

                                    {/* Worker Type
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-briefcase me-2 text-secondary"></i>
                                            Worker Type
                                        </label>
                                        <select
                                            name="type"
                                            value={workerdata.type}
                                            className="form-select form-select-lg"
                                            onChange={fillData}
                                        >
                                            <option value="">Select Worker Type</option>
                                            <option value="Sample Collector">Sample Collector</option>
                                            <option value="Executive">Executive</option>
                                        </select>
                                    </div> */}

                                    {/* Phone */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-phone me-2 text-secondary"></i>
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={workerdata.phone}
                                            className="form-control form-control-lg"
                                            onChange={fillData}
                                        />
                                    </div>

                                    {/* Qualification */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-graduation-cap me-2 text-secondary"></i>
                                            Qualification
                                        </label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={workerdata.qualification}
                                            className="form-control form-control-lg"
                                            onChange={fillData}
                                        />
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-briefcase me-2 text-secondary"></i>
                                            Experience (Years)
                                        </label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={workerdata.experience}
                                            className="form-control form-control-lg"
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

export default WorkerEditProfile
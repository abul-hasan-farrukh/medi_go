import axios from "axios";
import { useState } from "react";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";

function ChangePassword() {

    const email = localStorage.getItem("adminEmail")
    const navigate = useNavigate()

    const APIURL = `${BASE_URL}/admin/updatePassword/${email}`

    const [passwordData, setPasswordData] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    })


    //handle input
    const fillData = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })

    }


    //submit form
    const submitData = async (e) => {

        e.preventDefault()

        if (
            passwordData.oldpassword.trim() === "" ||
            passwordData.newpassword.trim() === "" ||
            passwordData.confirmpassword.trim() === ""
        ) {
            toast.error("All fields are required")
            return
        }

        if (passwordData.newpassword !== passwordData.confirmpassword) {
            toast.error("New password and confirm password must match")
            return
        }

        try {

            const serverResponse = await axios.patch(APIURL, passwordData)

            if (serverResponse.data === "success") {

                toast.success("Password Updated Successfully 🔐")

                setTimeout(() => {
                    navigate("/admin/admin-dashboard")
                }, 2500)

            } else {

                toast.error("Old Password is Incorrect")

            }

        } catch (error) {

            console.log(error)
            toast.error("Something went wrong")

        }

    }


    return (
        <>
            <AdminHeader />

            <ToastContainer position="top-right" autoClose={2500} />

            <div className="container" style={{ marginTop: "50px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6 col-md-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-body p-5">

                                <h3 className="text-center mb-4 fw-bold">
                                    <i className="fa-solid fa-key text-primary me-2"></i>
                                    Change Password
                                </h3>

                                <form onSubmit={submitData}>

                                    {/* Old Password */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-lock me-2 text-secondary"></i>
                                            Old Password
                                        </label>

                                        <input
                                            type="password"
                                            name="oldpassword"
                                            className="form-control form-control-lg"
                                            placeholder="Enter old password"
                                            onChange={fillData}
                                        />

                                    </div>


                                    {/* New Password */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-key me-2 text-secondary"></i>
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            name="newpassword"
                                            className="form-control form-control-lg"
                                            placeholder="Enter new password"
                                            onChange={fillData}
                                        />

                                    </div>


                                    {/* Confirm Password */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="fa-solid fa-check me-2 text-secondary"></i>
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            name="confirmpassword"
                                            className="form-control form-control-lg"
                                            placeholder="Confirm new password"
                                            onChange={fillData}
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

export default ChangePassword
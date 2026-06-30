import React, { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import Swal from "sweetalert2"; 
import { BASE_URL } from "../../config";

function ProfileUpload() {

    const fileRef = useRef(null);
    const navigate = useNavigate()
    const UPLOADURL = `${BASE_URL}/admin/uploadPic`

    const [profilePic, setProfilePic] = useState(null)
    const email = localStorage.getItem("adminEmail")

    const [profileData, setProfileData] = useState({
        email: email,
        description: ""
    })

    const fetchData = (e) => {

        const { name, value, files, type } = e.target

        const maxSize = 2 * 1024 * 1024; // 2MB

        if (type === "file") {
            const file = files[0];

            // FILE SIZE VALIDATION
            if (file.size > maxSize) {
                Swal.fire({
                    icon: "error",
                    title: "File too large",
                    text: "File size must be less than 2MB"
                });

                setProfilePic(null)
                fileRef.current.value = "";
                return
            } else {
                setProfilePic(file)
            }

            //FILE TYPE VALIDATION
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid File",
                    text: "Only PNG, JPEG, JPG and WEBP files are allowed"
                });

                setProfilePic(null)
                fileRef.current.value = "";
                return;
            }

        } else {
            setProfileData({ ...profileData, [name]: value })
        }
    }

    const submitForm = async (e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append(
            "profileImageDetail",
            new Blob([JSON.stringify(profileData)], { type: 'application/json' })
        )

        formData.append("imageFile", profilePic)

        try {

            const serverResponse = await axios.post(UPLOADURL, formData)

            Swal.fire({
                icon: "success",
                title: "Uploaded",
                text: "Profile image uploaded successfully"
            });

            navigate("/admin/admin-dashboard", {
                state: { imageURL: serverResponse.data.imageURL }
            })

        }
        catch (err) {
            console.log(err)

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: "Something went wrong"
            });
        }
    }

    return (
        <>
            <AdminHeader />

            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "100px" }}>

                <div className="card shadow-lg p-4" style={{ width: "450px", borderRadius: "15px" }}>

                    <h3 className="text-center mb-4 text-dark">
                        Upload Profile Picture
                    </h3>

                    <form onSubmit={submitForm}>

                        <div className="mb-3">
                            <label className="form-label fw-bold">
                                Select Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                name="profilePic"
                                className="form-control"
                                onChange={fetchData}
                                required
                                ref={fileRef}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">
                                Description
                            </label>

                            <textarea
                                name="description"
                                className="form-control"
                                rows="4"
                                placeholder="Write something about your profile..."
                                onChange={fetchData}
                                value={profileData.description}
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark px-4">
                                Upload Image
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}

export default ProfileUpload
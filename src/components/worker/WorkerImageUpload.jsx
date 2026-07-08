import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import WorkerHeader from './WorkerHeader'
import { BASE_URL } from "../../config";

function WorkerImageUpload() {

  const navigate = useNavigate()
    const UPLOADURL = `${BASE_URL}/worker/uploadPic`

    const [profilePic, setProfilePic] = useState(null)
    const email = localStorage.getItem("workerEmail")

    const [profileData, setProfileData] = useState({
        email: email,
        description: ""
    })

    const fetchData = (e) => {

        const { name, value, files, type } = e.target //destructuring the target object.
        //files is an array that contains multiple file data.

        if (type === "file") {
            setProfilePic(files[0])
        } else {
            setProfileData({ ...profileData, [name]: value })
        }
    }

    const submitForm = async (e) => {

        e.preventDefault()

        const formData = new FormData() //creating object of form data to carry document like images or pdf etc. As well as text data. Formdata accepts data in string format. 

        formData.append(
            "profileImageDetail",
            new Blob([JSON.stringify(profileData)], { type: 'application/json' })
        )

        formData.append("imageFile", profilePic)

        try {

            const serverResponse = await axios.post(UPLOADURL, formData)

            navigate("/worker/worker-dashboard", {
                state: { imageURL: serverResponse.data.imageURL } //state is a built-in object used to passed values
                // from one jsx to another at the time of navigation. 
            })

        }
        catch (err) {
            console.log(err)
        }
    }



  return (
    <>
    <WorkerHeader/>

            <div className="d-flex justify-content-center align-items-center" style={{marginTop:"100px"}}>

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

export default WorkerImageUpload
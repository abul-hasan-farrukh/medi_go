import AdminHeader from "./AdminHeader";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCamp() {

    const APIURL = "http://localhost:9090/admin/addCamp";

    const [camp, setCamp] = useState({
        title: "",
        venue: "",
        description: "",
        date: ""
    });

    const [validate, setValidate] = useState(false);

    const fetchData = (e) => {
        const { name, value } = e.target;

        setCamp({
            ...camp,
            [name]: value
        });
    };

    const submitForm = async (e) => {

        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        }

        setValidate(true);

        try {

            await axios.post(APIURL, camp);

            Swal.fire({
                title: "Camp Added",
                text: "Camp added successfully",
                icon: "success"
            });

            setCamp({
                title: "",
                venue: "",
                description: "",
                date: ""
            });

            setValidate(false);

        } catch (error) {

            Swal.fire({
                title: "Error",
                text: "Failed to add camp",
                icon: "error"
            });

        }

    };

    return (
        <>
            <AdminHeader />

            <div
                style={{
                    marginLeft: "240px",
                    marginTop: "70px",
                    padding: "20px",
                    fontFamily: "poppins"
                }}
            >

                <h3 style={{ textAlign: "center", marginTop: "-50px" }} className="mb-4 fw-bold">
                    🏥 Add New Camp
                </h3>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <form
                            onSubmit={submitForm}
                            className={`needs-validation ${validate ? "was-validated" : ""}`}
                            noValidate
                        >

                            <div className="row">

                                {/* Title */}
                                <div className="col-md-6 mb-3">
                                    <label>Camp Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={camp.title}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Venue */}
                                <div className="col-md-6 mb-3">
                                    <label>Venue</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="venue"
                                        value={camp.venue}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Date */}
                                <div className="col-md-6 mb-3">
                                    <label>Camp Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={camp.date}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-12 mb-3">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="description"
                                        value={camp.description}
                                        onChange={fetchData}
                                    />
                                </div>

                            </div>

                            <div className="text-center mt-3">
                                <button className="btn btn-success px-5">
                                    Add Camp
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddCamp;
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";
import { BASE_URL } from "../../config";

function SampleCollection() {

    const APIURL = `${BASE_URL}/user/sampleCollectionRequest`;

    const [sample, setSample] = useState({
        email: localStorage.getItem("userEmail") || "",
        userName: "",
        phoneNumber: "",
        address: "",
        message: "",
        sample_collection_date: "",
        preferred_time: "",
        sample_type: "",
        status: "pending"
    });

    const [validate, setValidate] = useState(false);

    // Handle input change (same as AddTest)
    const fetchData = (e) => {
        const { name, value } = e.target;

        setSample({
            ...sample,
            [name]: value
        });
    };

    // Submit form
    const submitForm = async (e) => {

        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidate(true);
            return; // stop api hitting if the form is invalid
        }

        setValidate(true);

         //Phone Validation
    if (!sample.phoneNumber || !/^[0-9]{10}$/.test(sample.phoneNumber)) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Phone Number",
            text: "Please enter a valid 10-digit phone number"
        });
        return;
    }

    if (!sample.address.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Address Required",
            text: "Please enter your address"
        });
        return;
    }

    if (!sample.sample_type) {
        Swal.fire({
            icon: "warning",
            title: "Sample Type Required",
            text: "Please select sample type"
        });
        return;
    }

    if (!sample.message.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Message Required",
            text: "Please enter your message"
        });
        return;
    }

    if (!sample.sample_collection_date) {
        Swal.fire({
            icon: "warning",
            title: "Date Required",
            text: "Please select sample collection date"
        });
        return;
    }

    if (!sample.preferred_time) {
        Swal.fire({
            icon: "warning",
            title: "Time Required",
            text: "Please select preferred time"
        });
        return;
    }

        try {

            await axios.post(APIURL, sample);

            Swal.fire({
                title: "Request Sent Successfully",
                text: "Our worker will contact you soon",
                icon: "success"
            });

            // Reset form (keep email and userName)
            setSample({
                email: localStorage.getItem("userEmail") || "",
                userName: "",
                phoneNumber: "",
                address: "",
                message: "",
                sample_collection_date: "",
                preferred_time: "",
                sample_type: "",
                status: "pending"
            });

            setValidate(false);

        } catch (error) {

            Swal.fire({
                title: "Error",
                text: "Failed to send request",
                icon: "error"
            });

        }

    };

    return (
        <>
            <UserHeader />
            <div
                style={{
                    marginTop: "70px",
                    padding: "20px",
                    fontFamily: "poppins"
                }}
            >

                <h3 className="text-center mb-4 fw-bold">
                    Book Sample Collection
                </h3>

                <div className="card shadow-sm">
                    <div className="card-body">

                        <form
                            onSubmit={submitForm}
                            className={`needs-validation ${validate ? "was-validated" : ""}`}
                            noValidate
                        >

                            <div className="row">

                                {/* Email */}
                                <div className="col-md-6 mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={sample.email}
                                        readOnly
                                    />
                                </div>

                                {/* Name */}
                                <div className="col-md-6 mb-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={sample.userName}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Address */}
                                <div className="col-12 mb-3">
                                    <label>Address</label>
                                    <textarea
                                        className="form-control"
                                        name="address"
                                        value={sample.address}
                                        onChange={fetchData}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Address is required
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="col-md-6 mb-3">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={sample.phoneNumber}
                                        onChange={fetchData}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Enter valid 10-digit phone number
                                    </div>
                                </div>

                                {/* Sample Type */}
                                <div className="col-md-6 mb-3">
                                    <label>Sample Type</label>
                                    <select
                                        className="form-select"
                                        name="sample_type"
                                        value={sample.sample_type}
                                        onChange={fetchData}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option>Blood</option>
                                        <option>Urine</option>
                                        <option>Stool</option>
                                        <option>Swab</option>
                                        <option>Sputum</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select sample type
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="col-12 mb-3">
                                    <label>Message</label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={sample.message}
                                        onChange={fetchData}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Message is required
                                    </div>
                                </div>

                                {/* Sample Date */}
                                <div className="col-md-6 mb-3">
                                    <label>Sample Collection Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="sample_collection_date"
                                        value={sample.sample_collection_date}
                                        onChange={fetchData}
                                        min={new Date().toISOString().split("T")[0]} // to prevent past date booking
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please select a date
                                    </div>
                                </div>

                                {/* Preferred Time */}
                                <div className="col-md-6 mb-3">
                                    <label>Preferred Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="preferred_time"
                                        value={sample.preferred_time}
                                        onChange={fetchData}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please select preferred time
                                    </div>
                                </div>


                            </div>

                            <div className="text-center mt-3">
                                <button className="btn btn-primary px-5">
                                    Submit Request
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </>
    );
}

export default SampleCollection;
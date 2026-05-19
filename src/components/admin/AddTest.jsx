import AdminHeader from "./AdminHeader";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddTest() {

    const APIURL = "http://localhost:9090/admin/addTest";

    const [test, setTest] = useState({
        testName: "",
        testType: "",
        testDescription: "",
        preparation: "",
        sampleRequired: "",
        testPrice: "",
        reportTime: "",
        status: "Active",
        createdAt: ""
    });

    const [validate, setValidate] = useState(false);

    //Mapping Test Type with Sample Type
    const sampleMap = {
        "Blood Test": "Blood",
        "Urine Test": "Urine",
        "Stool Test": "Stool",
        "Sputum Test": "Sputum",
        "Swab Test": "Swab",
        "Hormonal Test": "Blood",
        "Biopsy": "Tissue",
        "Microbiology": "Blood/Urine/Swab"
    };

    const fetchData = (e) => {
        const { name, value } = e.target;

        // Auto-filling sample type when test type changes
        if (name === "testType") {
            setTest({
                ...test,
                testType: value,
                sampleRequired: sampleMap[value] || ""
            });
        } else {
            setTest({
                ...test,
                [name]: value
            });
        }
    };

    const submitForm = async (e) => {

        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        }

        setValidate(true);

        try {

            await axios.post(APIURL, test);

            Swal.fire({
                title: "Test Added",
                text: "Test added successfully",
                icon: "success"
            });

            setTest({
                testName: "",
                testType: "",
                testDescription: "",
                preparation: "",
                sampleRequired: "",
                testPrice: "",
                reportTime: "",
                status: "Active",
                createdAt: ""
            });

            setValidate(false);

        } catch (error) {

            Swal.fire({
                title: "Error",
                text: "Failed to add test",
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
                    🧪 Add New Test
                </h3>

                <div className="card shadow-sm">

                    <div className="card-body">

                        <form
                            onSubmit={submitForm}
                            className={`needs-validation ${validate ? "was-validated" : ""}`}
                            noValidate
                        >

                            <div className="row">

                                {/* Test Name */}
                                <div className="col-md-6 mb-3">
                                    <label>Test Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="testName"
                                        value={test.testName}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Test Type */}
                                <div className="col-md-6 mb-3">
                                    <label>Select Test Type</label>
                                    <select
                                        className="form-select"
                                        name="testType"
                                        value={test.testType}
                                        onChange={fetchData}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option>Blood Test</option>
                                        <option>Urine Test</option>
                                        <option>Stool Test</option>
                                        <option>Sputum Test</option>
                                        <option>Swab Test</option>
                                        <option>Hormonal Test</option>
                                        <option>Biopsy</option>
                                        <option>Microbiology</option>
                                    </select>
                                </div>

                                {/* Sample Required (Auto-filled) */}
                                <div className="col-md-6 mb-3">
                                    <label>Sample Required</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="sampleRequired"
                                        value={test.sampleRequired}
                                        readOnly
                                    />
                                </div>

                                {/* Price */}
                                <div className="col-md-6 mb-3">
                                    <label>Test Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="testPrice"
                                        value={test.testPrice}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Report Time */}
                                <div className="col-md-6 mb-3">
                                    <label>Report Time</label>
                                    <select
                                        className="form-select"
                                        name="reportTime"
                                        value={test.reportTime}
                                        onChange={fetchData}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option>Same Day</option>
                                        <option>24 Hours</option>
                                        <option>48 Hours</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="col-md-6 mb-3">
                                    <label>Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={test.status}
                                        onChange={fetchData}
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>

                                {/* Created Date */}
                                <div className="col-md-6 mb-3">
                                    <label>Created Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="createdAt"
                                        value={test.createdAt}
                                        onChange={fetchData}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-12 mb-3">
                                    <label>Test Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="testDescription"
                                        value={test.testDescription}
                                        onChange={fetchData}
                                    />
                                </div>

                                {/* Preparation */}
                                <div className="col-12 mb-3">
                                    <label>Preparation</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="preparation"
                                        value={test.preparation}
                                        onChange={fetchData}
                                    />
                                </div>

                            </div>

                            <div className="text-center mt-3">
                                <button className="btn btn-success px-5">
                                    Add Test
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default AddTest;
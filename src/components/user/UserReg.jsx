import { useState } from 'react'
import Swal from 'sweetalert2'
import Footer from '../common/Footer';
import Header from '../common/Header';
import axios from 'axios'

function UserReg() {

    //Sending request to backend to save data in database
    const APIURL = "http://localhost:9090/user/registration"

    const [data, setData] = useState({ email: "", name: "", phone: "", password: "", city: "" })

    const [validate, setValidate] = useState(false)

    const fetchData = (e) => {
        console.log(e.target); //returns object
        const { name, value } = e.target //destructuring the object, name means control name and value is the value entered by user

        //setting values in state variale setData
        setData({ ...data, [name]: value }) //object is already destructured that's why we are using name and value here.

    }

    const submitForm = async (e) => {
        // alert("in function")
        e.preventDefault()
        console.log(e.currentTarget);
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation()
            e.preventDefault()
        }
        setValidate(true)

        const alphaRegex = /^[A-Za-z\s]*$/;
        const numberRegex = /^[0-9]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {
            // alert("Enter valid email address")

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter vaild email address",
                icon: "error"
            });
            return;
        }

        if (!alphaRegex.test(data.name)) {
            // alert("Only alphabets are allowed")

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter alphabets only",
                icon: "error"
            });
            return;
        }

        if (!numberRegex.test(data.phone)) {
            // alert("Only digits are allowed")

            // Sweetalert popup below
            Swal.fire({
                title: "Input Field Error",
                text: "Please enter digits only",
                icon: "error"
            });

            return;
        }

        //code for backend processing start below
        try {
            const serverResponse = await axios.post(APIURL, data) //sending data on APIURL.
            console.log("Send by SpringBoot: " + serverResponse);

            console.log(serverResponse.data); //this data is of axios

            //SweetAlert Success Popup
            Swal.fire({
                title: "Registration Successful",
                text: "Your account has been created successfully!",
                icon: "success",
                confirmButtonText: "OK"
            });

            // Clear form after success
            setData({ email: "", name: "", phone: "", password: "", city: "" });
            setValidate(false);


        } catch (error) { //returning error as an object from backend
            console.log(error);

            Swal.fire({
                title: "Registration Failed",
                text: "Something went wrong. Please try again.",
                icon: "error"
            });

        }

        // console.log(`Name is ${data.name}`);
        // console.log(`Email is ${data.email}`);
        // console.log(`Phone is ${data.phone}`);
        // console.log(`Question is ${data.question}`);

    }

    return (
        <>
            <Header />
            <div>
                <section
                    className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
                    style={{
                        minHeight: "100vh",
                        background: "linear-gradient(135deg, #97d9f8, #f0f9ff, #f7e8e8)",
                        fontFamily: "Poppins"
                    }}
                >

                    {/* Glowing Gradient Shapes */}

                    <div
                        style={{
                            position: "absolute",
                            width: "450px",
                            height: "450px",
                            background: "rgba(16, 140, 197, 0.35)",
                            borderRadius: "50%",
                            top: "-150px",
                            right: "-120px",
                            filter: "blur(120px)"
                        }}
                    ></div>

                    <div
                        style={{
                            position: "absolute",
                            width: "400px",
                            height: "400px",
                            background: "rgba(16, 19, 180, 0.35)",
                            borderRadius: "50%",
                            bottom: "-120px",
                            left: "-120px",
                            filter: "blur(120px)"
                        }}
                    ></div>



                    <div className="container position-relative">
                        <div className="row justify-content-center">

                            {/* Reducing width here */}
                            <div className="col-md-10 col-lg-8 col-xl-7">

                                <div className="card shadow" style={{
                                    borderRadius: "1.2rem",
                                    background: "rgba(255,255,255,0.85)",
                                    backdropFilter: "blur(10px)",
                                    position: "relative",
                                    zIndex: 2
                                }}
                                >
                                    <div className="row g-0">

                                        {/* Smaller Image Section */}
                                        <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center p-3">
                                            <img
                                                src="../images/userRegister.png"
                                                alt="login form"
                                                className="img-fluid"
                                                style={{ maxHeight: "320px" }}
                                            />
                                        </div>

                                        {/* Form Section */}
                                        <div className="col-md-7 d-flex align-items-center">
                                            <div className="card-body p-4 text-black">

                                                <form
                                                    onSubmit={submitForm}
                                                    className={`needs-validation ${validate ? 'was-validated' : ''}`}
                                                    noValidate
                                                >

                                                    <div className="text-center mb-2">
                                                        <span className="h4 fw-bold d-block">
                                                            MediGo User Registration
                                                        </span>
                                                    </div>

                                                    <p className="text-center text-muted mb-4">
                                                        Create your account
                                                    </p>


                                                    {/* Form Fields */}
                                                    <div className="form-floating mb-3">
                                                        <input type="email" className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            name="email"
                                                            value={data.email}
                                                            onChange={fetchData}
                                                            required />
                                                        <label htmlFor="floatingInput">Email</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control"
                                                            id="floatingName"
                                                            placeholder="Name"
                                                            name="name"
                                                            value={data.name}
                                                            onChange={fetchData}
                                                            required />
                                                        <label htmlFor="floatingName">Name</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control"
                                                            id="floatingPhone"
                                                            placeholder="Phone"
                                                            name="phone"
                                                            value={data.phone}
                                                            onChange={fetchData}
                                                            required />
                                                        <label htmlFor="floatingPhone">Phone</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input type="password" className="form-control"
                                                            id="floatingPassword"
                                                            placeholder="Password"
                                                            name="password"
                                                            value={data.password}
                                                            onChange={fetchData}
                                                            required />
                                                        <label htmlFor="floatingPassword">Password</label>
                                                    </div>

                                                    <div className="form-floating mb-4">
                                                        <select className="form-select"
                                                            name="city"
                                                            value={data.city}
                                                            onChange={fetchData}
                                                            required>
                                                            <option value="">Select City</option>
                                                            <option>Lucknow</option>
                                                            <option>Barabanki</option>
                                                            <option>Kanpur</option>
                                                        </select>
                                                    </div>

                                                    <button
                                                        className="btn w-100"
                                                        style={{
                                                            background: "linear-gradient(90deg,#0d6efd,#20c997)",
                                                            color: "white",
                                                            borderRadius: "8px",
                                                            padding: "10px",
                                                            transition: "0.3s ease"
                                                        }}
                                                        onMouseOver={(e) =>
                                                        (e.target.style.background =
                                                            "linear-gradient(90deg,#0b5ed7,#198754)")
                                                        }
                                                        onMouseOut={(e) =>
                                                        (e.target.style.background =
                                                            "linear-gradient(90deg,#0d6efd,#20c997)")
                                                        }
                                                    >
                                                        Create Account
                                                    </button>

                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default UserReg